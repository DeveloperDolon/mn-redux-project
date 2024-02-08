import React from "react";
import { ImInstagram } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoTwitter } from "react-icons/io";
import { FaPinterestP } from "react-icons/fa";
const FooterIcon = () => {
  return (
    <div>
      <div className="text-white">
        <div className="flex gap-3">
          <Link to="https://www.facebook.com/">
            <div className="bg-white p-2 rounded-full">
              <TiSocialFacebook className="text-xl text-webPrimary" />
            </div>
          </Link>
          <Link to="https://www.instagram.com/">
            <div className="bg-white p-2 rounded-full">
              <ImInstagram className="text-xl text-webPrimary" />
            </div>
          </Link>
          <Link to="https://twitter.com/">
            <div className="bg-white p-2 rounded-full">
              <IoLogoTwitter className="text-xl text-webPrimary" />
            </div>
          </Link>
          <Link to="https://www.pinterest.com/">
            <div className="bg-white p-2 rounded-full">
              <FaPinterestP className="text-xl text-webPrimary" />
            </div>
          </Link>
          <Link to="https://www.linkedin.com/">
            <div className="bg-white p-2 rounded-full">
              <FaLinkedinIn className="text-xl text-webPrimary" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterIcon;
