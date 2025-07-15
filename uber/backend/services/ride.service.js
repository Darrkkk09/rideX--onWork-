const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {

   if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  console.log("DistanceTime:", distanceTime);

  if (
    !distanceTime ||
    !distanceTime.distance?.value ||
    !distanceTime.duration?.value
  ) {
    throw new Error("Distance or Duration data is missing or invalid");
  }

  const baseFare = { auto: 10, car: 15, moto: 5 };
  const perKmRate = { auto: 6, car: 8, moto: 4 };
  const perMinuteRate = { auto: 1, car: 1.5, moto: 0.8 };

  const distKm = distanceTime.distance.value / 1000;
  const durationMin = distanceTime.duration.value / 60;

  const fare = {
    auto: Math.round(
      baseFare.auto + distKm * perKmRate.auto + durationMin * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car + distKm * perKmRate.car + durationMin * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto + distKm * perKmRate.moto + durationMin * perMinuteRate.moto
    ),
  };

  return fare;

}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!pickup || !destination || !vehicleType) {
    throw new Error("All fields are required, including user");
  }

  const fareObj = await getFare(pickup, destination);
  const fare = fareObj[vehicleType];
  if (!fare) {
    throw new Error("Invalid vehicle type");
  }

  const ride = await rideModel.create({
    user, 
    pickup,
    destination,
    otp: getOtp(4),
    fare,
    status: "pending",
  });

  return ride;

};


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

