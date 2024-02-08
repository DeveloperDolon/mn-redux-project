import DesignCard from "@/components/TopDesign/DesignCard/DesignCard";
import { useGetFoldersQuery } from "@/redux/features/folder/folderApi";
import React, { useEffect, useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

const TopDesign = () => {

  const [portfolioData, setPortfolioData] = useState([]);
  const { data: allFolders } = useGetFoldersQuery();

  useEffect(() => {
    if (allFolders) {
      setPortfolioData(allFolders?.data?.slice(0, 4));
    }
  }, [allFolders]);

  const handleSeeAll = () => {
    setPortfolioData(allFolders?.data)
  }

  const handleSeeLess = () => {
    setPortfolioData(allFolders?.data?.slice(0, 4))
  }

  return (
    <div>
      {portfolioData?.map((singlePortfolioData, _idx) => (
        <DesignCard key={_idx} singlePortfolioData={singlePortfolioData} />
      ))}

      {
        portfolioData?.length > 4 && <div className="text-center">
          {
            portfolioData?.length === 4 ? <button><FiArrowDownCircle onClick={handleSeeAll} className="text-webPrimary" size={30} /></button> : <button><FiArrowUpCircle onClick={handleSeeLess} className="text-webPrimary" size={30} /></button>
          }
        </div>
      }
    </div>
  );
};

export default TopDesign;
