import Image from "next/image";
import React from "react";
import Button from "../button";

const HeroDev = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
    {/* LEFT */}
    
    <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
      {/* <Image
        src="/"
        alt="addlearn"
        width={50}
        height={50}
        className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
      /> */}
      <h1 className="bold-32 lg:bold-76">
        Learn About Our Developers
      </h1>
      <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
        Embark on a transformative learning experience like never before! At
        ADD Learn, we believe in the power of education to shape futures, and
        we&apos;re dedicated to providing a cutting-edge platform that seamlessly
        integrates innovation with the art of teaching and learning.
      </p>
      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button type="button" title="Know more" variant="btn_blue" />
          <Button
            type="button"
            title="How we work"
            icon="/blue-play.svg"
            variant="btn_white_text"
          />
        </div>
      </div>
    </div>

    {/* <div className="hero-map" /> */}
    <div className="relative flex flex-1 items-start aspect-square">
      {/* <Image src="/developers.jpg" fill alt="Hero image" className="object-contain inset-[-65]"/> */}
      <img src="/developers.jpg" alt="" />
    </div>
  </section>
  )
}

export default HeroDev