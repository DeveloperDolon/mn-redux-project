// import React, { useState } from "react";
import Navbar from "../../Navabr/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../Container";
import { IoSearchOutline } from "react-icons/io5";
import NavbarLogo from '../../../../assets/MR.png';

const HeaderTop = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    navigate(`/search-result/${search}`);
  };

  return (
    <div className="py-[32px] font-montserrat bg-[#0C0C0C]">
      <Container className="text-white">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img className="w-[128px]" src={NavbarLogo} alt="website logo" />
          </Link>
          <form onSubmit={handleSearch} className="relative w-1/3">
            <input
              type="text"
              placeholder="What design are you looking today?"
              name="search"
              className="px-2 py-2 text-base rounded-md w-full outline-none"
            />

            <button
              type="submit"
              className="absolute rounded-md m-[3px] p-2 inset-y-0 right-0 text-white flex items-center justify-center  bg-[#1B8CDC]"
            >
              <IoSearchOutline size={20} />
            </button>
          </form>
          <Navbar />
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
