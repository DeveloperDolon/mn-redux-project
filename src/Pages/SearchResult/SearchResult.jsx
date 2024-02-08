import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSearchQuery } from "@/redux/features/search/searchApi";
import {
  useGetCategoriesByIdQuery,
  useGetCategoriesNameQuery,
} from "@/redux/features/categories/category";
import {
  useGetGigsByIndustryQuery,
  useGetIndustryUniqueQuery,
} from "@/redux/features/gigs/gigsApi";
import GigCard from "@/components/GigCard/GigCard";
import Container from "../Shared/Container";
import { TbError404 } from "react-icons/tb";

const SearchResult = () => {
  const [categoryId, setCategoryId] = useState("");
  const [getIndustryName, setGetIndustryName] = useState("");

  const [activeData, setActiveData] = useState("search");
  const { search } = useParams();

  const { data: searchData, isLoading: searchLoading } =
    useGetSearchQuery(search);
  const { data: categoriesName, isLoading: categoryNameLoading } =
    useGetCategoriesNameQuery();
  const { data: industryName, isLoading: industryNameLoading } =
    useGetIndustryUniqueQuery();
  const { data: categoriesGigs, isLoading: categoriesGigsLoading } =
    useGetCategoriesByIdQuery(categoryId);

  const { data: industryGigs, isLoading: industryGigsLoading } =
    useGetGigsByIndustryQuery(getIndustryName);

  return (
    <div>
      <Container>
        <h1 className="text-3xl font-bold text-center py-10">
          You select the Industry and design of your need. <br /> And see your
          selected items below.
        </h1>

        <>
          {categoryNameLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="flex flex-wrap gap-3">
              {categoriesName?.data.map((category) => (
                <Link
                  onClick={() => {
                    setCategoryId(category?.id);
                    setActiveData("categories");
                  }}
                  className="bg-red-50 py-1 px-3 rounded-full"
                  key={category?.id}
                >
                  {category?.title}
                </Link>
              ))}
            </div>
          )}
        </>

        <div className="w-full h-[3px] bg-blue-300 rounded-md my-10"></div>

        <>
          {industryNameLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="flex flex-wrap gap-3 mb-16">
              {industryName?.data.map((industry) => (
                <Link
                  onClick={() => {
                    setGetIndustryName(industry?.industry);
                    setActiveData("industry");
                  }}
                  className="bg-blue-50 py-1 px-3 rounded-full"
                  key={industry?.id}
                >
                  {industry?.industry}
                </Link>
              ))}
            </div>
          )}
        </>

        {activeData === "search" && (
          <>
            {searchLoading ? (
              <h1>Loading...</h1>
            ) : searchData?.status === 404 ? (
              <div className="flex justify-center flex-col items-center py-24">
                <TbError404 className="text-7xl bg-red-500 text-white p-2 rounded-full" />
                <h1 className="text-2xl font-bold ">
                  {searchData.message}
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5 mb-20">
                {searchData?.data?.map((searchItem) => (
                  <GigCard key={searchItem?.id} data={searchItem} />
                ))}
              </div>
            )}
          </>
        )}

        {activeData === "categories" && (
          <>
            {categoriesGigsLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="grid grid-cols-4 gap-5 mb-20">
                {categoriesGigs?.data?.Gigs?.map((gig) => (
                  <GigCard key={gig?.id} data={gig} />
                ))}
              </div>
            )}
          </>
        )}

        {activeData === "industry" && (
          <>
            {industryGigsLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="grid grid-cols-4 gap-5 mb-20">
                {industryGigs?.data?.map((gig) => (
                  <GigCard key={gig?.id} data={gig} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default SearchResult;
