import React from "react";

import { images } from "../constants";
import Search from "../components/Search";

const Hero = () => {
  
  return (
    <section className="container flex flex-col px-5 py-5 mx-auto lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="text-3xl text-center font-bold md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px] textcol hover:text-[#1be415] ">
        African Voices of A New Generation
        </h1>
        <p className="mt-4 text-center lg:text-2xl md:text-xl xl:text-xl lg:text-left">
        Africa is a crime scene, bleeding from the wounds of colonization, imperialism, genocide, the theft of our resources, and the assassination of our leaders, including Lumumba, Gaddafi, Sankara, and Mandela. The soil needs time to heal, but not in the presence of colonizers or invaders claiming to be indigenous. The wounds of our ancestors demand justice, not silence.
        </p>
        <Search className="mt-10 lg:mt-6 xl:mt-10" />
        <div className="flex flex-col pb-1 mt-4 border-b border-gray-700 lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="mt-2 italic lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded px-3 py-1.5 hover:bg-gray-800 cursor-pointer uppercase">
              General
            </li>
            <li className="rounded px-3 py-1.5 hover:bg-gray-800 cursor-pointer uppercase">
              Africa
            </li>
            <li className="rounded px-3 py-1.5 hover:bg-gray-800 cursor-pointer uppercase">
              The West
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden ml-10 lg:block lg:1/2">
        <img
          className="object-cover w-full rounded-md"
          src={images.HeroImg}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;