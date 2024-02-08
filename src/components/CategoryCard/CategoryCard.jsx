import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ActionModal from "../Modal/ActionModal";
import { useSelector } from "react-redux";
import {
  useAddCartItemMutation,
  useUpdateIsSelectedCartMutation,
} from "@/redux/features/cart/cartApi";
const CategoryCard = ({ category }) => {
  const { email } = useSelector((state) => state.userSlice);
  const [addCartItem, { data: addedData, isSuccess }] =
    useAddCartItemMutation();
  const [updateCartItem] = useUpdateIsSelectedCartMutation();
  const { data: cartData, isloading } = useAddCartItemMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleProjectStart = () => {
    addCartItem({ customerEmail: email, gigsId: category?.Gigs[0]?.id });
    // const customerEmail = email;
    // const categoryId = category.id;

    // navigate("/project", {
    //   state: {
    //     customerEmail,
    //     categoryId,
    //     category,
    //   },
    // });
  };

  useEffect(() => {
    if (isSuccess) {
      updateCartItem({ id: addedData?.data?.id, email });
      navigate("/checkout")
    }
  }, [isSuccess]);
  return (
    <>
      <div className="flex flex-col h-72  border-2 border-gray-400 rounded-lg my-5">
        <div className="flex font-montserrat w-full">
          <div className="flex justify-between bg-[#FFEFEF] w-full ">
            <div className="flex text-left px-3 py-2 m-2 rounded-xl text-black gap-2 font-semibold text-xl font-montserrat">
              <BsThreeDotsVertical
                onClick={toggleModal}
                className="my-1 text-gray-500 cursor-pointer"
              />
              {isModalOpen && (
                <ActionModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  data={category}
                />
              )}
              <span>{category.title}</span>
            </div>
            {/* in here when click i have to take data to project page using navigation */}
            <button
              onClick={handleProjectStart}
              className="border-2 bg-webPrimary px-3 py-2 m-2 rounded-xl text-white font-semibold text-xl font-montserrat"
            >
              PROJECT START
            </button>
          </div>
        </div>
        {/* body */}
        <div className="flex-1 flex border-t-2 border-gray-400">
          {category?.SubCategory?.map((subCategory, index) => (
            <div
              key={index}
              className={`flex flex-col font-montserrat p-4  bg-white ${
                category.SubCategory.length === 1
                  ? "w-full"
                  : "w-1/2  border-r-2 border-gray-400"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col font-montserrat  items-center justify-center  p-4">
                  <h3 className="font-medium">{subCategory.title}</h3>
                  <h6 className="font-bold text-webPrimary">
                    ${subCategory.amount} USD
                  </h6>
                  <p>{subCategory.deleveryTime} Days Delivery</p>
                  {subCategory?.FastDelivery?.map((time, index) => (
                    <div key={index}>
                      <span>Extra- Fast {time.deleveryTime} Delivery</span>
                      <span> $ {time.amount} </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex justify-evenly items-center font-montserrat bg-[#EDF7FC] text-gray-700 border-t-2 border-gray-400 py-4">
          {category?.bulletPoint?.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-around gap-2 mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 border bg-blue-700 border-blue-500 rounded-full cursor-pointer text-white flex items-center justify-center"
                  viewBox="0 0 20 15"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 9l2 2 4-4"
                  />
                </svg>
                {item.itemOne}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 border bg-blue-700 border-blue-500 rounded-full cursor-pointer text-white flex items-center justify-center"
                  viewBox="0 0 20 15"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 9l2 2 4-4"
                  />
                </svg>
                {item.itemTwo}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 border bg-blue-700 border-blue-500 rounded-full cursor-pointer text-white flex items-center justify-center"
                  viewBox="0 0 20 15"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 9l2 2 4-4"
                  />
                </svg>
                {item.itemThree}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
