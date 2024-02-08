import React, { useState } from "react";
import Hero from "./Hero/Hero";
import Container from "../Shared/Container";
import TopDesign from "./TopDesign/TopDesign";
import HomeSidebar from "./HomeSidebar/HomeSidebar";
import CategoriesAndIndustry from "./CategoriesAndIndustry/CategoriesAndIndustry";
import Service from "@/components/Service/Service";
import HomeTestimonials from "@/components/HomeTestimonials/HomeTestimonials";
const Home = () => {

  return (
    <>
      <Hero />
      <p className="text-center py-5 bg-red-50 font-semibold text-lg">
        We do not own the images used in our designs. We used those images from
        Google/Stock Marketplace. <br /> You must give us the images to use in
        your design.
      </p>
      <CategoriesAndIndustry />
      <Container>
        <div className="my-10">
          <div className="grid grid-cols-9 gap-5">
            <div className="col-span-7">
              <TopDesign />
            </div>
            <div className="col-span-2">
              <HomeSidebar isTrue={true} />
            </div>
          </div>

          <div className="mt-10 mb-20">
            <Service />
          </div>

          <div className="mt-10 mb-20">
            <HomeTestimonials />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
