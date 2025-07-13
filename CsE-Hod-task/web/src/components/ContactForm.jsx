import React from "react";
import { MdLocationOn, MdEmail } from "react-icons/md";

const ContactForm = () => {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
      {/* Top Heading */}
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-1">Contact</h2>
          <div className="h-0.5 w-20 sm:w-28 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-6 pl-2 sm:pl-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-800">CONTACT</h3>
        </div>
      </div>

      {/* New Flex Layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-[55%] space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <MdLocationOn className="text-yellow-300 hover:text-yellow-500 text-2xl" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Location:</p>
              <p className="text-gray-700 text-base">Visakhapatnam</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <MdEmail className="text-yellow-300 text-2xl hover:text-yellow-500" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Email:</p>
              <p className="text-gray-700 text-base break-all">principal@vignaniit.edu.in</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-[45%]">
          <form className="space-y-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-400 text-white font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
