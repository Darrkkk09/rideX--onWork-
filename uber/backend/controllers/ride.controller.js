const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const  captainModel  = require('../models/captain.model');


module.exports.createRide = async (req, res) => {
if (!req.user || !req.user._id) {
  return res.status(401).json({ message: "Unauthorized: User data missing" });
}

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    console.log("REQ.USER →", req.user);

    const ride = await rideService.createRide({
      user: req.user?._id,
      pickup,
      destination,
      vehicleType,
    });

    let pickupCoordinates;
    try {
      pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    } catch (err) {
      console.error("Error getting pickup coordinates:", err);
      return res.status(400).json({ message: "Failed to resolve pickup coordinates" });
    }

    if (!pickupCoordinates.lat || !pickupCoordinates.lon) {
      return res.status(400).json({ message: "Failed to resolve pickup coordinates" });
    }

    let captainsInRadius;
    try {
      captainsInRadius = await mapService.getCaptainsInTheRadius(
        pickupCoordinates.lon,
        pickupCoordinates.lat,
        2
      );
    } catch (err) {
      console.error("Error finding captains in radius:", err);
      return res.status(500).json({ message: "Error finding nearby drivers" });
    }

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    return res.status(201).json(rideWithUser);

  } catch(err){
    console.error("createRide error:", err.message, err.stack);
    return res.status(500).json({ message: err.message });
  }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId , captainId } = req.body;
    if(!rideId || !captainId) {
        return res.status(400).json({ message: "rideId and captainId are required" });
    }

    try {
        capid = await captainModel.findById(captainId);
        if (!capid) {
            return res.status(404).json({ message: "Captain not found" });
        }
        const ride = await rideService.confirmRide({ rideId, captain : capid });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}