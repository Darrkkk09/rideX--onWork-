import React from "react";

const AllActiveRides = ({ rides = [], onClose, onSelect }) => {
  return (
    <div className="w-full bg-white rounded-t-3xl p-6 shadow-xl h-[65vh]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">🚗 Available Rides</h3>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Close ✕
        </button>
      </div>
      <div className="space-y-4 max-h-[50vh] overflow-y-auto">
        {rides.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-700 text-lg font-semibold">
              No active rides available
            </p>
          </div>
        ) : (
          rides.map((ride) => (
            <div
              key={ride._id}
              className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => {
                onSelect(ride);
                setRidePopupPanel(true);
              }}
            >
              <p>
                <span className="font-medium">Passenger:</span>{" "}
                {ride.passenger || "User"}
              </p>
              <p>
                <span className="font-medium">From:</span> {ride.pickup}
              </p>
              <p>
                <span className="font-medium">To:</span> {ride.destination}
              </p>
              <p>
                <span className="font-medium">Fare:</span> ₹{ride.fare}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllActiveRides;
