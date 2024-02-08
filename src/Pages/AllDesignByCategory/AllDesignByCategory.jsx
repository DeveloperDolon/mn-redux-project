// import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../Shared/Container";
// import {
//   useGetCategoriesByIdQuery,
//   useGetRelatedDesignGigsByCategoryIdQuery,
// } from "@/redux/features/categories/category";
// import { useGetGigsByCategoryIdQuery } from "@/redux/features/gigs/gigsApi";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {  useGetRelatedSubCategoriesByCategoryIdQuery, useGetSubFolderByFolderIdWithPaginationQuery } from "@/redux/features/folder/folderApi";
import { useEffect, useState } from "react";

const AllDesignByCategory = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();
  const {data: allFolderData, isLoading: allFolderLoading} = useGetSubFolderByFolderIdWithPaginationQuery({id, page});
  const {data: relatedSubFolder, isLoading: relatedSubFolderLoading} = useGetRelatedSubCategoriesByCategoryIdQuery(id);

  useEffect(() => {
    const fetchData = async () => {
      setTotalPages(allFolderData?.totalPages || 1);
    };

    fetchData();
  }, [allFolderData, page]);

  const loadMore = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const loadPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <div className="py-20 flex justify-center items-center shadow-md bg-[#F2F9FF]">
        <h2 className="text-4xl text-webPrimary font-semibold">
          {allFolderData?.folder?.name}
        </h2>
      </div>

      <Container>
        <div className="flex justify-end mt-6 mb-5">
          <div className="w-3/4 flex items-center justify-between gap-10">
            <div>
              <h2 className="font-semibold text-2xl">
                Click on the design you need to see more designs.
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-10">
          {allFolderData?.data?.map((singleData, _idx) => (
            <Link key={_idx} to={`/design/${singleData.id}`}>
              <div className="border border-gray-300">
                <img
                  className="w-full h-52 object-cover"
                  src={singleData?.image}
                  alt=""
                />
                <p className="text-sm font-medium px-3 my-2">
                  {singleData?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mb-10 gap-3">
          <button
            onClick={loadPrevious}
            className={`border border-gray-400 text-2xl p-2 rounded-full ${
              page === 1 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            disabled={page === 1}
          >
            <IoIosArrowBack />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`text-2xl px-3 ${
                i + 1 === page ? "bg-blue-200 rounded-full w-10" : "hover:bg-blue-100  rounded-full w-10"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={loadMore}
            className={`border border-gray-400 text-2xl p-2 rounded-full ${
              page === totalPages ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            disabled={page === totalPages}
          >
            <IoIosArrowForward />
          </button>
        </div>

      </Container>
        <div className="py-10 bg-red-50">
          <h2 className="text-2xl font-semibold mb-10 text-center text-blue-500 ">
            Related Design
          </h2>
          <Container>
            <div className="grid grid-cols-4 gap-5 pb-10">
              {relatedSubFolder?.data?.map((singleData, _idx) => (
                <Link
                  to={`/design-description/${singleData?.id}`}
                  key={_idx}
                  className="border border-gray-300 bg-white"
                >
                  <img
                    className="w-full h-52 object-cover"
                    src={singleData?.image}
                    alt=""
                  />
                  <p className="text-sm font-medium px-3 my-2">
                    {singleData?.name}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </div>
    </div>
  );
};

export default AllDesignByCategory;
