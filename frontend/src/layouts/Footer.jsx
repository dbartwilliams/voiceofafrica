import React from "react";
import { images } from "../constants";
// import SocialShareButtons from "./SocialShareButtons";

// You'll need to import the icons - you can use react-icons or your own image files
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

const Footer = () => {
  return (
    <section className="hidden bg-gray-800 sm:block">
      <footer className="container grid grid-cols-10 px-5 py-10 mx-auto gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="md:text-lg text-[#5eeccc] tracking-[.4em]">MENU</h3>
          
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base tracking-[.1em]">
            <li><a href="/" className="p-2 rounded hover:bg-gray-700">Home</a></li>
            <li><a href="/blog" className="p-2 rounded hover:bg-gray-700">Blog</a></li>
            <li><a href="/contact" className="p-2 rounded hover:bg-gray-700">Contact</a></li>
          </ul>
        </div>
      
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img
            src={images.FooterLogo}
            alt="logo"
            className="mx-auto rounded md:mx-0"
          />
          <p className="mt-4 text-sm tracking-[.1em] text-[#5eeccc] md:text-left md:text-base lg:text-sm">
            Sign-In to commenets
          </p>

          {/* <SocialShareButtons
            url={encodeURI(window.location.href)}
            title="Visit voiceofafrice.co.uk"
          /> */}
        </div>

        {/* New section for technology icons */}
        <div className="col-span-5 md:col-span-4 lg:col-span-2 md:ml-auto">
          <h3 className="md:text-lg text-[#5eeccc] tracking-[.4em]">BUILT WITH</h3>
          <div className="flex mt-5 space-x-4 text-[#959EAD] text-2xl">
            <FaReact className="text-blue-500 w-6 h-6 hover:text-[#61DAFB] cursor-pointer" title="React" />
            <FaNodeJs className="w-6 h-6 text-white cursor-pointer hover:text-yellow-300" title="Node.js" />
            <SiExpress className="w-6 h-6 text-yellow-500 cursor-pointer hover:text-yellow-400" title="Express" />
            <SiMongodb className="text-green-500 w-6 h-6 hover:text-[#47A248] cursor-pointer" title="MongoDB" />
          </div>
        </div>

        <div className="flex-col items-center hidden space-y-4 border-t border-gray-500 md:flex md:col-span-12 lg:col-span-10">
          <p className="pt-4 italic text-[#5eeccc] tracking-[.1em]">
            © 2025-26. voiceofafrica.co.uk | support@voiceofafrica.co.uk
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;