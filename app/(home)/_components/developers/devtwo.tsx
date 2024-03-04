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
      Member 2 <br /><span className="text-blue-500"> <a href="https://www.instagram.com/devanshsk/" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Singh Kushwah</a>  </span>
      </h1>
      <p className="regular-18 mt-6 text-gray-30 xl:max-w-[520px]">
      I, <a href="https://twitter.com/devansh_sk" target="_blank" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"> Devansh Singh Kushwah </a>
      , played a pivotal role in the creation of Add Learn, an online e-learning platform designed to enhance real-world skills. My technical expertise in React, NextJS, Redux, RTK-Query, React-hook-form, and Zod was instrumental in developing the frontend of the platform. I implemented APIs, managed file uploads, and built core functionalities and dashboards, all aimed at enhancing the user interface and experience.

My contributions also extended to managing the state and data fetching of the application using Redux and RTK query. I ensured proper form validation using React-hook-form and Zod, and created responsive UI components with the shadcn-ui library. To safeguard user data, I implemented persistent authentication with redux-toolkit and redux-persist, and added authorization protection.

Working collaboratively with my team members, we successfully designed a platform that minimizes distractions and maximizes learning, promoting a seamless and effective learning experience. Our combined efforts have resulted in a platform that stands as a testament to our technical prowess and innovative thinking.
      </p>
      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <a href="https://www.linkedin.com/in/devanshsk/">
            <Button type="button" title="Linkedin" icon="icons8-linkedin.svg" variant="btn_blue" />
            </a>
          <a href="https://github.com/DevanshSK" target="_blank">
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