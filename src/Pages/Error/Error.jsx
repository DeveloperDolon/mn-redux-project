import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../../public/error.svg";

const Error = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <img src={errorImage} alt="" className="w-2/5" />
        <Link
          to="/"
          className="text-2xl font-bold text-white bg-blue-500 px-5 py-2 shadow-md rounded-md"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Error;
