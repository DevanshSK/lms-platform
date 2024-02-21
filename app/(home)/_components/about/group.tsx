import Image from "next/image";
import React from "react";
import Button from "../button";

const Group = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
      {/* LEFT */}
      
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        {/* <Image
          src="/"
          alt="addlearn"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="bold-32 lg:bold-88">
          Developed by Team<span className="text-blue-500">  Three Musketers </span>
        </h1>
        <p className="regular-18 mt-6 text-gray-30 xl:max-w-[520px]">
        Explore our collaborative effort where group of three friends 
        <a href="https://www.linkedin.com/in/devanshdixit27/" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Dixit</a>, 
        <a href="https://www.linkedin.com/in/devanshsk/" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Singh Kushwah</a> and 
        <a href="https://www.linkedin.com/in/abhay-gupta-227b65247/" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Abhay Gupta </a> 
        unite to create an innovative Learning Management System (LMS) project. 
        Join us as we blend our skills and passion to redefine digital learning and 
        embrace collaborative knowledge-sharing.
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
          <div className="flex flex-col w-full gap-3 sm:flex-row">
            <a href="/contact">
            <Button type="button" title="Contact us" variant="btn_blue" />
            </a>
            <Button
              type="button"
              title="Our Developers"
              // icon="/blue-play.svg"
              variant="btn_white_text"
            />
          </div>
        </div>
      </div>

      {/* <div className="hero-map" /> */}
      <div className="relative flex flex-1 items-start aspect-square rounded-sm">
        <Image src="/friends.jpg" fill alt="Hero image" className="object-cover w-full rounded-sm h-20 shadow-lg " />
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
    </section>
  );
};

export default Group;
