import React from "react";
import Container from "../Shared/Container";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/features/categories/category";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import HomeSidebar from "../Home/HomeSidebar/HomeSidebar";
import { useSelector } from "react-redux";
import { useGetRoleByEmailQuery } from "@/redux/features/adminUser/adminUserApi";
const Price = () => {

  const { email } = useSelector((state) => state.userSlice);
  const { data: role, isLoading: roleLoading } = useGetRoleByEmailQuery({ email });
  const navigate = useNavigate();
  const { data: allCategories, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <div className="grid grid-cols-9 gap-5 my-5">
          <div className="mt-6 col-span-7">
            <div>
              <h4 className="font-montserrat font-medium">
                We have priced many designs below. The design you need, You can
                start a project for that design. We will create your design.
              </h4>
              <h4>
                Please contact us first if you need any designs other than those
                below. (Also, if you need more than one design, you can start a
                separate project for each design. Or you can contact us to start
                a custom project for all your designs.)
              </h4>
            </div>
            <div className="col-span-2 my-5">
              <div>
                <div className="flex justify-between font-montserrat">
                  <div className="w-1/3 text-left p-4">
                    <button className="rounded-full border-2 border-webPrimary bg-[#EDF7FC] text-gray-700 font-medium py-1 px-4">
                      CUSTOMISE
                    </button>
                  </div>
                  <div className="w-1/3 text-center p-4 text-webPrimary font-semibold text-4xl">
                    PRICE LIST
                  </div>
                  <div className="w-1/3  text-right p-4">
                    {
                      role === "admin" && <button
                        onClick={() => navigate("/categories")}
                        className="rounded-full border-2 border-webPrimary bg-[#EDF7FC] text-gray-700 font-medium py-1 px-4"
                      >
                        CREATE
                      </button>
                    }
                  </div>
                </div>
              </div>
              {isLoading ? (
                <div>Loading ....</div>
              ) : (
                allCategories?.data.map((category, index) => (
                  <CategoryCard key={index} category={category} />
                ))
              )}
            </div>
          </div>
          <div className="col-span-2 p-2">
            <HomeSidebar />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
          <div className="col-span-2 my-5">
            <h4 className="text-webPrimary font-montserrat">
              If you would like to take a template/source file of any design we
              have created, please contact us, and show us the design you like.
              We will give you the template/source file.
            </h4>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Price;
