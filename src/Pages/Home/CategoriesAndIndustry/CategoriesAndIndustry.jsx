import Container from "@/Pages/Shared/Container";
import { useGetCategoriesNameQuery } from "@/redux/features/categories/category";
import { useGetIndustryUniqueQuery } from "@/redux/features/gigs/gigsApi";
import React from "react";
import { Link } from "react-router-dom";

const CategoriesAndIndustry = () => {
  const { data: allCategories, isLoading: isCategoryLoading } =
    useGetCategoriesNameQuery();

  const { data: industries, isLoading: industryLoading } =
    useGetIndustryUniqueQuery();

  console.log(industries);

  return (
    <div className="py-10">
      <Container>
        <div className="flex items-center gap-5">
          {isCategoryLoading ? (
            <h1>Loading...</h1>
          ) : (
            allCategories?.data?.slice(0, 6).map((category, idx) => (
              <Link
                className="bg-[#DCEEFA] px-3 rounded-full font-medium"
                key={category.id}
                to={`/all-design-by-category/${category.id}`}
              >
                {category.title}
              </Link>
            ))
          )}

          <Link
            to={"/search-result/hello"}
            className="bg-[#DCEEFA] px-3 rounded-full font-medium"
          >
            See More
          </Link>
        </div>
      </Container>

      <div className="w-full h-[2px] bg-blue-500 my-5"></div>

      <Container>
        <div className="flex items-center gap-5">
          {industryLoading ? (
            <h1>Loading...</h1>
          ) : (
            industries?.data?.slice(0, 6).map((industry) => (
              <Link
                className="bg-[#FFEFEF] px-3 rounded-full font-medium"
                key={industry.id}
                to={`/all-design-by-industry/${industry.industry}`}
              >
                {industry.industry}
              </Link>
            ))
          )}

          <Link
            to={"/search-result/hello"}
            className="bg-[#FFEFEF] px-3 rounded-full font-medium"
          >
            See More
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CategoriesAndIndustry;
