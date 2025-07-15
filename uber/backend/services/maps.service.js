const axios = require("axios");
const captainModel = require("../models/captain.model");
const dotenv = require("dotenv");
dotenv.config();

const ORS_BASE_URL = "https://api.openrouteservice.org";
const ORS_API_KEY = process.env.ORS_API_KEY;

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(`${ORS_BASE_URL}/geocode/search`, {
      params: {
        api_key: ORS_API_KEY,
        text: address,
        size: 1,
      },
      headers: {
        "User-Agent": "rideX/1.0 (ranjitmutchakarla123@gmail.com)",
      },
      timeout: 7000,
    });

    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const [lon, lat] = response.data.features[0].geometry.coordinates;
      return { lon,lat };
    } else {
      throw new Error("Location not found");
    }
  } catch (err) {
    if (err.response) {
      console.error("ORS API error:", err.response.status, err.response.data);
    }
    throw new Error("Failed to fetch suggestions");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  const getCoords = async (address) => {
    try {
      const trimmed = address.trim();
      const response = await axios.get(`${ORS_BASE_URL}/geocode/search`, {
        params: {
          api_key: ORS_API_KEY,
          text: trimmed,
          size: 1,
        },
        headers: {
          "User-Agent": "rideX/1.0 (ranjitmutchakarla123@gmail.com)",
        },
        timeout: 15000,
      });

      if (response.data?.features?.length > 0) {
        const [lon, lat] = response.data.features[0].geometry.coordinates;
        return { lon,lat };
      } else {
        throw new Error("Location not found");
      }
    } catch (err) {
      if (err.response) {
        console.error("ORS response error:", {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        });
      } else {
        console.error("ORS request error:", err.message);
      }
      throw new Error("Failed to fetch coordinates for address: " + address);
    }
  };

  try {
    const originCoords = await getCoords(origin);
    const destCoords = await getCoords(destination);

    const routeResponse = await axios.post(
      `${ORS_BASE_URL}/v2/directions/driving-car`,
      {
        coordinates: [
          [originCoords.lon, originCoords.lat],
          [destCoords.lon, destCoords.lat],
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${ORS_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const route = routeResponse.data?.routes?.[0];
    if (!route || !route.summary) {
      throw new Error("No route found");
    }

    return {
      distance: { value: route.summary.distance }, // meters
      duration: { value: route.summary.duration }, // seconds
      status: "OK",
    };
  } catch (err) {
    console.error("getDistanceTime error:", err.message);
    throw new Error("Failed to fetch distance and time");
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.ORS_API_KEY;
  const url = `https://api.openrouteservice.org/geocode/autocomplete`;

  try {
    const res = await axios.get(url, {
      params: {
        api_key: apiKey,
        text: input,
      },
      timeout: 15000,
      headers: {
        Accept: "application/json",
      },
    });

    return res.data.features || [];
  } catch (err) {
    if (err.response) {
      console.error("ORS error response:", {
        status: err.response.status,
        data: err.response.data,
        headers: err.response.headers,
      });
    } else if (err.request) {
      console.error(
        "ORS request was made but no response received:",
        err.request
      );
    } else {
      console.error("ORS unknown error:", err.message);
    }

    throw new Error("Failed to fetch suggestions");
  }
};

module.exports.getCaptainsInTheRadius = async (lon, lat, radius) => {
  if (!lat || !lon || !radius) {
    throw new Error("Latitude, longitude, and radius are required");
  }

  console.log("Debug getCaptaininRadius called with:", { lon,lat, radius });

  const captain = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lon, lat], radius / 6378.1],
      },
    },
  });

  console.log("Debug captains found:", captain);
  return captain;
};
