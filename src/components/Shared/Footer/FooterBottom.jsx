import React from "react";

import { Link } from "react-router-dom";
const FooterBottom = () => {
  return (
    <div>
      <div className="flex mt-2  h-5 items-center space-x-4 text-sm text-white">
        <div className="px-2 border-r-2 border-gray-300">
          <Link className="text-xl " to="/terms-conditions">
            Terms and Conditions
          </Link>
        </div>
        <div>
          <Link className="text-xl" to="/privacy-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
