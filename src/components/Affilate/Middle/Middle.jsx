import { useGetReferralLinksQuery } from "@/redux/features/affiliate/affiliateApi";
import { useGetIdByEmailQuery } from "@/redux/features/roleManage/roleApi";
import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Middle = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: customerId } = useGetIdByEmailQuery(email);
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [referralLink, setReferralLink] = useState("");

  const { data: affiliateData, refetch } = useGetReferralLinksQuery(customerId);
  

  const generateReferralLink = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/affiliate/generate-referral-link/${customerId}`
      );
      const data = await response.json();

      if (response.status === 200) {
        setReferralLink(data.data.referralLink);
        setInput2Value(data.data.referralLink);
        // Redirect logic
        const referralCodeFromURL = new URL(
          window.location.href
        ).searchParams.get("ref");
        if (referralCodeFromURL) {
          // Redirect to the login page with the referral code
          window.location.href = `http://localhost:5173/customer-login?ref=${referralCodeFromURL}`;
        }

        refetch();
      } else {
        console.error("Error generating referral link:", data.message);
      }
    } catch (error) {
      console.error("Error generating referral link:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => {
        toast.success("Copied to clipboard")
      },
      (error) => {
        console.error("Error copying to clipboard:", error);
      }
    );
  };

  return (
    <>
      <div className="my-4 text-center items-center font-montserrat">
        <label className="flex text-left text-gray-700 font-semibold text-lg">
          Affiliate link generator
        </label>
        <div className="flex p-1">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter something"
              value={input1Value}
              onChange={(e) => setInput1Value(e.target.value)}
              className="w-full outline-none py-1 px-2 border-2 border-gray-200"
            />
            <button
              onClick={generateReferralLink}
              className="bg-[#7C7C7C] w-1/5 text-xl font-normal text-white  py-1"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Second input field */}
        <div className="flex p-1">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter something"
              value={input2Value}
              readOnly
              className="w-full outline-none py-1 px-2 border-2 border-gray-200"
            />
            <button
              onClick={copyToClipboard}
              className="bg-webPrimary w-1/5 text-xl font-normal text-white  py-1"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 items-center font-montserrat">
        <div className="flex justify-between border-b-2 p-1 border-gray-300">
          <label className="flex text-left font-semibold text-gray-700 text-lg">
            Created links
          </label>
          <div className="flex gap-4">
            <label className="flex text-left font-semibold text-gray-700 text-lg">
              Clicks
            </label>
            <label className="flex text-left font-semibold text-gray-700 text-lg">
              Sales
            </label>
          </div>
        </div>

        <div className="border-b-2 p-1 border-gray-300 flex flex-col gap-5 mt-5">
          {
            affiliateData?.data?.map((affiliate, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between ">
                  <label className="flex font-semibold text-gray-700 ">
                    {affiliate?.referralLink}
                  </label>
                  <label className="flex  font-semibold text-gray-700">
                    {format(new Date(affiliate?.createdAt), "dd/MM/yyyy, hh:mm a")}
                  </label>
                  <button onClick={() => {
                    navigator.clipboard.writeText(affiliate?.referralLink)
                    toast.success("Copied to clipboard")
                  }} className="bg-blue-500 px-2 text-white rounded-md">copy</button>
                </div>
                {/* <div className="flex gap-4">
                  <label className="flex text-left font-semibold text-gray-700 text-lg">
                    {affiliate?.clicks}
                  </label>
                  <label className="flex text-left font-semibold text-gray-700 text-lg">
                    {affiliate?.sales}
                  </label>
                </div> */}
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Middle;