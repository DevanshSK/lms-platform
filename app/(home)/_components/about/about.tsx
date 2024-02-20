/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import Button from "../button";

const HeroAbout = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-0 py-10 pb-32 md:gap-0 lg:py-20 xl:flex-col ">
      {/* LEFT */}
      
      <div className="relative z-20 flex flex-1 flex-col xl:w-full justify-center items-center">
        {/* <Image
          src="/"
          alt="addlearn"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="bold-32 lg:bold-88 text-center">
          Learn more about <br/> ADD Learn
        </h1>
        <h2 className="py-5 font-semibold text-xl text-center">Empowering Learning, Unleashing Potential, <br /> Your Path to Success</h2>
        <p className="text-center regular-16 mt-[-2] text-gray-30 xl:max-w-[900px] ">
          Embark on a transformative learning experience like never before! At
          ADD Learn, we believe in the power of education to shape futures, and
          we&apos;re dedicated to providing a cutting-edge platform that seamlessly
          integrates innovation with the art of teaching and learning.
        </p>
        {/* <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>
          <p className="bold-16 lg:bold-20 text-blue-70">
            198K
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p>
          <div className="flex flex-col w-full gap-3 sm:flex-row">
            <Button type="button" title="Download App" variant="btn_blue" />
            <Button
              type="button"
              title="How we work"
              icon="/blue-play.svg"
              variant="btn_white_text"
            />
          </div>
        </div> */}
      </div>
        <div className="block drop-shadow-lg">
          <img src="/tab-grey.png" alt="" />
        {/* <Image src="/tab-grey.png" fill alt="Hero image" className="h-20" /> */}
        </div>
      {/* <div className="hero-map" /> */}
      {/* <div className="relative flex flex-1 items-start aspect-square"> */}
        {/* <div className="relative z-20 flex w-[268px] -top-5 -left-5 flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8 ">
          <div className="flex flex-col"> */}
            {/* <div className="flexBetween">
              <p className="regular-16 text-gray-20">Courses from</p>
              <Image src="/close.svg" alt="close" width={24} height={24}  />
            </div>
            <p className="bold-20 text-white"> 100+ Experts</p>
          </div>
          <div className="flexBetween"> */}
            {/* <div className=" flex flex-col">
              <p className="regular-16 text-white">Skills</p>
              <p className="bold-20 text-white">40+ skills</p>
            </div> */}
            {/* <div className=" flex flex-col">
              <p className="regular-16 text-white">Time</p>
              <p className="bold-20 text-white">70+ hours</p>
            </div> */}
          {/* </div>
        </div> */}
      {/* </div> */}
    </section>
  );
};

export default HeroAbout;
