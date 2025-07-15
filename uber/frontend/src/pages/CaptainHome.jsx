import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import AllActiveRides from "../components/AllActiveRides"; // ✅
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [allrides, setAllRides] = useState([
    {
      _id: "1",
      passenger: "John Doe",
      pickup: "123 Main St",
      destination: "456 Elm St",
      fare: 150,
    },
    {
      _id: "2",
      passenger: "Jane Smith",
      pickup: "789 Oak St",
      destination: "101 Pine St",
      fare: 200,
    },
  ]);
  const [showAllRide, setShowAllRide] = useState(false);

  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const allridesref = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  console.log("captain", captain);

  useEffect(() => {
    socket.emit("join", {
      userId: captain?._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lng: position.coords.longitude,
              ltd: position.coords.latitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data);
      setAllRides((prev) => [...prev, data]);
      setRidePopupPanel(true);
    });
  }, [socket]);

  const confirmRide = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (err) {
      console.error(
        "Ride confirmation failed:",
        err.response?.data || err.message
      );
    }
  };

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanel]);

  useGSAP(() => {
    gsap.to(allridesref.current, {
      transform: showAllRide ? "translateY(0)" : "translateY(100%)",
    });
  }, [showAllRide]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow z-20">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Main */}
      <div className="pt-[72px] flex flex-col h-full">
        <div className="flex-grow basis-[75%] overflow-hidden">
          <LiveTracking />
        </div>
        <div className="basis-[25%] bg-white p-4 shadow-inner overflow-hidden">
          <CaptainDetails
            setShowAllRide={setShowAllRide}
            showAllRide={showAllRide}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>

      {/* RidePopup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 w-full translate-y-full bg-white px-4 py-10 pt-12 z-30"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* AllActiveRides */}
      <div
        ref={allridesref}
        className="fixed bottom-0 w-full translate-y-full bg-white px-4 py-6 pt-12 z-40"
      >
        <AllActiveRides
          rides={allrides}
          onClose={() => setShowAllRide(false)}
          onSelect={(selectedRide) => {
            setRide(selectedRide);
            setShowAllRide(false);
            setRidePopupPanel(true);
          }}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 w-full h-screen translate-y-full bg-white px-4 py-10 pt-12 z-30"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
