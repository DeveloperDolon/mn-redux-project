import React from "react";
import DesignSlider from "../DesignSlider/DesignSlider";
import { Link } from "react-router-dom";

const DesignCard = ({ singlePortfolioData }) => {

  return (
    <div className="border border-gray-300 rounded-md p-3 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">
            {singlePortfolioData?.name}
          </h3>
        </div>
        <div>
          <Link to={`/all-design-by-category/${singlePortfolioData?.id}`}>
            <h3 className="text-webPrimary text-xl font-semibold cursor-pointer">
              All Design
            </h3>
          </Link>
        </div>
      </div>

      <div>
        <DesignSlider portfolio={singlePortfolioData?.SubFolder} />
      </div>
    </div>
  );
};

export default DesignCard;
