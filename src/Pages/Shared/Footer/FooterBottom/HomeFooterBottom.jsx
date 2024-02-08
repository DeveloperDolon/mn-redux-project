import React from "react";
import Logo from "@/components/Logo/Logo";
import { Link } from "react-router-dom";
import ContactFrom from "@/Pages/Contact/ContactFrom";
import FooterIcon from "@/components/Shared/Footer/FooterIcon";
import FooterBottom from "@/components/Shared/Footer/FooterBottom";
import PaymentImage from '../../../../assets/payement.png';

const HomeFooterBottom = () => {
  return (
    <>
      <div className="grid grid-cols-10 bg-black">
        <div className="col-span-5">
          <div className="grid grid-cols-2">
            <div className="w-full flex flex-col items-center p-4 py-12">
              <Link to={"/"}>
                <Logo />
              </Link>
              <div className="mt-2 py-2">
                <FooterIcon />
              </div>
            </div>
            <div>
              <div className="flex gap-4 py-10 text-white">

                <div className="flex flex-col gap-3">
                  <Link
                    to="/about"
                    className="text-base"
                  >
                    About
                  </Link>
                  <Link
                    to="/"
                    className="text-base"
                  >
                    Designs
                  </Link>
                  <Link
                    to="/"
                    className="text-base"
                  >
                    Industries
                  </Link>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/"
                    className="text-base"
                  >
                    Project
                  </Link>
                  <Link
                    to="/price"
                    className="text-base"
                  >
                    Price List
                  </Link>
                  <Link
                    to="/affiliate"
                    className="text-base"
                  >
                    Affiliate
                  </Link>
                </div>
              </div>

              <div className="text-white">
                <p>WE ACCEPT</p>
                <img className="mt-2" src={PaymentImage} alt="" />
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-white my-3 mx-20"></div>
          <div className="px-4 py-2 mt-2 mb-5 mx-14">
            <FooterBottom />
          </div>
        </div>
        <div className="relative col-span-5">
          <div className="absolute z-30 shadow-md bg-[#FFEFEF] right-20 -top-20 w-[550px] h-10 pb-2">
            <ContactFrom />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFooterBottom;
