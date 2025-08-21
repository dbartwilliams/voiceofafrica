import React from 'react'
import { images } from "../constants";
import { Link } from "react-router-dom";


const CTA = () => {
  return (
  <>
        <svg
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>

      <section className="relative px-5 bg-dark-hard">
      <div className="container grid grid-cols-12 py-10 mx-auto md:pb-20 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-2xl font-bold textcol md:text-4xl md:text-center md:leading-normal lg:text-left">
            The | New Generation. Brutally outspoken and loud
            </h2>
            <div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0">
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-800 rounded-lg placeholder:text-dark-light"
                placeholder="Your Email"
              />

              <Link to="/contact">
                <button
                  
                    className="w-full px-4 py-3 text-black bg-[#5eeccc] hover:bg-[#1be415] rounded-lg 
                    md:w-fit md:whitespace-nowrap cursor-pointer">
                    Submit
                </button>
              </Link>

            </div>
            <p className="mt-6 text-sm leading-7 text-dark-light md:text-center md:text-base lg:text-left">
              <span className="tracking-[.4em] italic text-[#B3BAC5] md:not-italic md:font-normal md:text-dark-light">
                Contributors Welcome |
              </span>{" "}
              We’re always on the lookout for top quality UK truth telling articles. Please contact us at contributors@voiceofafrica.co.uk @voiceofafrica
            </p>
          </div>
          <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
            <div className="relative w-3/4 mx-auto">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]" />
              <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]" />
              <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                <img
                  src={images.CtaImage}
                  alt="title"
                  className="object-cover object-center w-full h-auto md:h-52 lg:h-48 xl:h-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
  )
}

export default CTA;