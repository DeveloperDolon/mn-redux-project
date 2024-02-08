import React from "react";
import image from "../../../assets/payement.png";
import FooterIcon from "./FooterIcon";

const FooterPayment = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div style={{ flex: "22%" }}>
          <FooterIcon />
        </div>
        <div style={{ flex: "70%" }} className="flex px-8 flex-col">
          <span className="mb-2 text-white font-montserrat text-xl">
            Email :- mahfujurrahm535@gmail.com
          </span>
          <div className="flex items-center justify-between">
            <label className="flex flex-col text-white font-montserrat text-xl">
              WE
              <br />
              ACCEPT
            </label>
            <img src={image} alt="Right Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPayment;
