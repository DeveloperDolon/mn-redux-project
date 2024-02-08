import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <>
      <input
        type="text"
        placeholder="What design are you looking today ? "
        className="px-3 p-1 font-montserrat text-sm border rounded-lg w-full border-gray-300 focus:outline-none focus:border-gray-300"
      />

      <div className="absolute rounded-lg m-[3px] px-2 p-2 inset-y-0 right-0 text-white flex items-center justify-center  bg-[#1B8CDC]">
        <IoSearchOutline />
      </div>
    </>
  );
};

export default Search;
