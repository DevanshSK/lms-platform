import React from 'react'
import Button from '../button'
import Image from 'next/image'
import { FaLinkedin } from "react-icons/fa";

const DevTwo = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
    {/* LEFT */}
    
    <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
      <h1 className="bold-32 lg:bold-86">
      Member 2 <br /><span className="text-blue-500"> <a href="" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Singh Kushwah</a>  </span>
      </h1>
      <p className="regular-18 mt-6 text-gray-30 xl:max-w-[520px]">
      <a href="" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Singh Kushwah </a>
      made significant contributions to the development 
      of course pages, demonstrating his proficiency in frontend development. 
      His role extended beyond design as he added functionality to the frontend, 
      enhancing user experience and engagement.
      </p>
      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <a href="https://www.linkedin.com/in/abhay-gupta-227b65247/">
            <Button type="button" title="Github" icon="icons8-github.svg" variant="btn_blue" />
            </a>
          <a href="https://github.com/DevanshSK">
            <Button
            type="button"
            title="Github"
            icon="/github.svg"
            variant=""
            className="p-5"
          />
            </a>
        </div>
      </div>
    </div>

    <div className="relative flex flex-1 items-start aspect-square rounded-sm">
      <Image src="/Devansh Singh Kushwah.jpg" fill alt="Hero image" className="object-cover w-full rounded-sm h-20 shadow-lg " />
    </div>
  </section>
  )
}

export default DevTwo