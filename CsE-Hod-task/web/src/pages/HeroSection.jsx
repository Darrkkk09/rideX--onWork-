import React from "react";
import About from "../components/About";
import vignan from "../assets/vignannnn.jpg";

const HeroSection = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-3 sm:px-6 py-3 bg-white shadow-md">
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZX6-cyAgcMc3wQx0AdI_nUIdEa3RoLscXYQ&s"
              className="h-8 sm:h-15 rounded-full"
              alt="Vignan Logo"
            />
            <h1 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900">
              Vignan's IIT
            </h1>
          </div>

          <div className="text-gray-600 text-xs sm:text-base font-medium mt-1 sm:mt-0">
            Conference
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative h-[85vh] sm:h-[90vh] w-full bg-no-repeat bg-cover bg-center flex items-start justify-start pt-16 sm:pt-20 lg:pt-28"
        style={{
          backgroundImage: `url(${vignan})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 text-white max-w-3xl mx-3 sm:ml-10 p-3 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-3xl md:text-3xl font-medium leading-snug mb-3 sm:mb-6">
            International Conference on{" "}
            <br className="hidden sm:block" />
            <span className="whitespace-nowrap">
              Mathematical & Statistical Foundations
            </span>
            <br className="hidden sm:block" />
            and Applications of Generative AI (MSFA-GAI)
          </h2>

          <p className="text-sm sm:text-base md:text-lg font-light leading-normal mb-3">
            <span className="font-normal">Conference Dates:</span>{" "}
            <span className="font-medium text-amber-400">
              5<sup>th</sup> – 6<sup>th</sup> February 2026
            </span>
          </p>

          <h3 className="text-sm sm:text-xl md:text-2xl font-semibold mb-2">
            National Workshop on Medical Applications using GAI
          </h3>

          <p className="text-sm sm:text-lg md:text-xl font-light mb-5">
            <span className="font-normal">Workshop Dates:</span>{" "}
            <span className="font-medium text-amber-400">
              2<sup>nd</sup> – 6<sup>th</sup> February 2026
            </span>
          </p>
        </div>

        {/* Organizer Note */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 z-10 text-slate-200 text-[10px] sm:text-xs md:text-base font-light text-right">
          <span className="font-medium">Organized by:</span>
          <br />
          Department of Computer Science & Engineering
        </div>
      </div>

      {/* About Section */}
      <div>
        <About />
      </div>
    </div>
  );
};

export default HeroSection;
