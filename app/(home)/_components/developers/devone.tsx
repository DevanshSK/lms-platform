import React from 'react'
import Button from '../button'
import Image from 'next/image'

const DevOne = () => {
    
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
         <div className="relative flex flex-1 items-start aspect-square rounded-sm">
      <Image src="/Devansh Dixit.png" fill alt="Hero image" className="object-cover w-full rounded-sm h-20 shadow-lg " />
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
      <h1 className="bold-32 lg:bold-86">
        Member 1 <br /><span className="text-blue-500"> <a href="https://www.behance.net/devanshdixit4" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Dixit</a>  </span>
      </h1>
      <p className="regular-18 mt-6 text-gray-30 xl:max-w-[520px]">
      The contribution to the Learning Management System by 
      <a href="https://www.linkedin.com/in/devanshdixit27/" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Dixit </a>
       was a blend of meticulous design, technical expertise, and unwavering dedication. 
       As I crafted the frontend, I prioritized seamless user experience and interface. 
       Using Next.js and TypeScript, I ensured flawless performance across devices. 
       Figma became my canvas, where I designed every detail from layout to components.
      </p>
      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex items-center gap-2 p-5">
        </div>
        <div className="flex flex-col w-full gap-3 sm:flex-row">
         <a href="https://github.com/DevanshDixitDD" target="_blank"> 
         <Button type="button" title="Github" icon="icons8-linkedin.svg" variant="btn_blue"/>
         </a> 
         <a href="" target="_blank">
         <Button
            type="button"
            title="Github"
            icon="/Github.svg"
            variant=""
            className="p-5"
          />
         </a>
        </div>
      </div>
    </div>
   
  </section>
  )
}

export default DevOne