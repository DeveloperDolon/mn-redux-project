import React, { useState } from "react";
import Container from "../Shared/Container";
import HomeSidebar from "../Home/HomeSidebar/HomeSidebar";
import { useGetSelectedCartGigsQuery } from "@/redux/features/cart/cartApi";
import CheckoutCard from "@/components/CheckoutCard/CheckoutCard";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: selectedData } = useGetSelectedCartGigsQuery(email);

  return (
    <div>
    <Container>
        <div className="grid grid-cols-9 gap-5 my-5">
          <div className="col-span-7">
            <div className="w-2/3 mx-auto">
              <h2 className="text-2xl font-bold mb-8 mt-5 text-center">
                Please select each step below carefully
              </h2>

              {selectedData?.data?.map((singleData, _idx) => (
                <CheckoutCard key={_idx} singleData={singleData} />
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <HomeSidebar />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
