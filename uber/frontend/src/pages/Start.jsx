import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

const Start = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(containerRef.current, { opacity: 0, duration: 0.4 });
    tl.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2');
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-black text-white flex flex-col"
    >
      <div className="pt-6 pl-4 sm:pt-10 sm:pl-8">
        <img
          className="h-16 sm:h-24"
          src="https://www.48hourslogo.com/48hourslogo_data/2019/01/26/81246_1548462370.png"
          alt="RideX Logo"
        />
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div
          ref={cardRef}
          className="bg-white text-black w-full max-w-xl px-6 sm:px-10 py-10 sm:py-12 rounded-2xl shadow-lg text-center space-y-6"
        >
          <img
            src="https://i.pinimg.com/736x/ff/65/fd/ff65fd0f4cf782639a478043216cdee2.jpg"
            alt="Ride Sharing Illustration"
            className="w-full max-h-52 object-cover rounded-xl"
          />
          <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
            Scalable Ride-Request Platform for Urban Mobility 🚀
          </h2>
          <Link
            to="/signup"
            className="flex justify-center w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Start;
