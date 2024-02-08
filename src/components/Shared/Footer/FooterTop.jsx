import Logo from "@/components/Logo/Logo";
import React from "react";
import { NavLink } from "react-router-dom";

const FooterTop = () => {
  return (
    <>
      <div className="flex gap-8">
        <div>
          <Logo />
        </div>
        <div className="text-white flex justify-center gap-4 flex-1">
          <div className="p-1">
            <div className="p-1">
              <NavLink
                to="/"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Home
              </NavLink>
            </div>
            <div className="p-1">
              <NavLink
                to="/about"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center gap-4 flex-1">
          <div className="p-1">
            <div className="p-1">
              <NavLink
                to="/designs"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Designs
              </NavLink>
            </div>
            <div className="p-1">
              <NavLink
                to="/companies"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Companies
              </NavLink>
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center gap-4 flex-1">
          <div className="p-1">
            <div className="p-1">
              <NavLink
                to="/price"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Price List
              </NavLink>
            </div>
            <div className="p-1">
              <NavLink
                to="/project"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Project
              </NavLink>
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center gap-4 flex-1">
          <div className="p-1">
            <div className="p-1">
              <NavLink
                to="/contact"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Contact
              </NavLink>
            </div>
            <div className="p-1">
              <NavLink
                to="/affiliate"
                className="hover:border-b hover:border-gray-300 transition duration-300"
              >
                Affiliate
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTop;
