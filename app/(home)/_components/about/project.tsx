import Image from "next/image";
import React from "react";
import Button from "../button";

const Project = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
          {/* <div className="hero-map" /> */}
      <div className="relative flex flex-1 items-start aspect-square rounded-sm">
        {/* <Image src="/friends.jpg" fill alt="Hero image" className="object-cover w-full rounded-sm h-20 shadow-lg " /> */}
        <img src="/Yoga Tab.png" alt="" />
        {/* <div className="relative z-20 flex w-[268px] -top-5 -left-5 flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8 ">
          <div className="flex flex-col"> */}
            {/* <div className="flexBetween">
              <p className="regular-16 text-gray-20">Courses from</p>
              <Image src="/close.svg" alt="close" width={24} height={24}  />
            </div>
            <p className="bold-20 text-white"> 100+ Experts</p>
          </div>
          <div className="flexBetween">
            <div className=" flex flex-col">
              <p className="regular-16 text-white">Skills</p>
              <p className="bold-20 text-white">40+ skills</p>
            </div>
            <div className=" flex flex-col">
              <p className="regular-16 text-white">Time</p>
              <p className="bold-20 text-white">70+ hours</p>
            </div> */}
          {/* </div>
        </div> */}
      </div>
      {/* RIGHT */}
      
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        {/* <Image
          src="/"
          alt="addlearn"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="bold-32 lg:bold-88">
          About our <span className="text-blue-500">  LMS Project </span>
        </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
        Your gateway to seamless and effective online education. 
        Our platform is designed to empower both learners and educators 
        by providing a comprehensive suite of tools and resources for 
        an enriched learning experience.
        </p>
        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {/* {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))} */}
          </div>
          {/* <p className="bold-16 lg:bold-20 text-blue-70">
            198K
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p> */}
          <div className="flex flex-col w-full gap-3 sm:flex-row drop-shadow-lg">
            <Button type="button" title="Learn More" variant="btn_blue"/>
            {/* <Button
              type="button"
              title="How we work"
              icon="/blue-play.svg"
              variant="btn_white_text"
            /> */}
          </div>
        </div>
      </div>

    
    </section>
  );
};

export default Project;
