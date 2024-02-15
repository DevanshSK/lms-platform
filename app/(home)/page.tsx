import UserNav from "@/components/navbar/user-nav";
import React from "react";
import Hero from "./_components/hero";
import Courses from "./_components/courses";
import Expert from "./_components/expert";
import Features from "./_components/features";
import Learn from "./_components/learn";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Courses />
      <Expert />
      <Features />
      <Learn />
    </>
  );
};

export default HomePage;
