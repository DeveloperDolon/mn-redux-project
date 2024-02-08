import React from "react";
import Container from "../Shared/Container";
import Banner from "../../assets/Source/Web Banner 2.svg";
import AffiliateCard from "@/components/Affilate/AffiliateCard/AffiliateCard";
const Affiliate = () => {
  return (
    <>
      <div className="relative isolate font-montserrat">
        <div className="mx-auto relative">
          <img src={Banner} alt="Your Alt Text" className="w-full rounded-lg" />
          <div className="absolute inset-0 gap-4 flex items-center justify-center flex-col text-white">
            <div className="w-1/2">
              <h1 className="text-4xl flex text-webPrimary items-center justify-center font-medium">
                Affiliate Program
              </h1>
              <p className="text-gray-700 py-1  items-center justify-center text-center text-2xl font-normal">
                Join the Mahfujurrahm535 Affiliate Program and earn up $5 per
                new customer purchase
              </p>
            </div>
          </div>
        </div>
        <div>
          <Container>
            <AffiliateCard />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Affiliate;
