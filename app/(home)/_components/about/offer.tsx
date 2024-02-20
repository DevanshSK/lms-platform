import React from 'react'
import Image from "next/image";

const Offer = () => {
  return (
    <section className="flexCenter flex-col">
      

      <div className="flexCenter max-container relative w-full ">
        <Image 
        src="/banner-image-1.png"
        alt="student"
        width={1440}
        height={500}
        className="w-full object-cover object-center 2xl:rounded-5xl h-3/4 shadow-md"
        />
        {/* <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image
          src="/meter.svg"
          alt="meter"
          width={16}
          height={158}
          className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Biginner</p>
                <p className="bold-16 text-blue-500">7 weeks</p>
              </div>
              <p className="bold-20 mt-2">Web Developer</p>
            </div>

            <div className="flex w-full flex-col">
              <p className="regular-16 text-gray-20">Expert</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Web Developer</h4>
            </div>
          </div>
        </div> */}
      </div>
      <div className=" padding-container max-container w-full pb-24">
          <p className="uppercase regular-18 mt-10 mb-3 text-blue-500" >
          Learn in a dedicated enviornment
          </p>
          <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
            <h2 className="bold-40 lg:bold-64 xl:max-w-[600px]" >Distraction Free Study thrugh LMS</h2>
            <p className="regular-16 text-gray-30 xl:max-w-[520px]">In today's fast-paced world, staying focused on learning can be a challenge. That's why our Learning Management System (LMS) is committed to providing you with a distraction-free environment, allowing you to fully immerse yourself in your educational journey. Don't let distractions derail your learning goals. Join us in our distraction-free learning environment and unlock your full potential today!</p>
          </div>
      </div>
    </section>
  )
}

export default Offer