import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { useGetCustomerByIdQuery } from "@/redux/features/customer/customer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Top = () => {
  const { email } = useSelector((state) => state.userSlice)
  const { data: customerData } = useGetCustomerByIdQuery(email)
  return (
    <>
      <div className="flex gap-4  text-center items-center w-full">
        <div className="bg-red-100 w-1/3">
          <div className="flex flex-col p-4 justify-center items-center">
            <FaMoneyCheckDollar />
            <h2 className="font-normal">Balance</h2>
            <p className="font-bold">${customerData?.data?.balance}</p>
          </div>
        </div>

          <Link to={`/save-payment-method/${customerData?.data?.id}`} className="bg-gray-200  w-1/3">
            <div className="flex flex-col p-4 justify-center items-center">
              <MdPayment />
              <h2 className="font-normal">Payment</h2>
              <p className="font-bold">Method</p>
            </div>
          </Link>

        <Link to={`/withdraw-request/${customerData?.data?.id}`} className="bg-blue-100  w-1/3">
          <div className="flex flex-col p-4 justify-center items-center">
            <BiMoneyWithdraw />
            <h2 className="font-normal">Withdraw</h2>
            <p className="font-bold">Request</p>
          </div>
        </Link>

      </div>
    </>
  );
};

export default Top;
