import { useGetCustomerByIdQuery } from "@/redux/features/customer/customer";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutCard = ({ singleData }) => {
  console.log(singleData)
  const { email } = useSelector((state) => state.userSlice);
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(email);
  const customerId = customerData?.data?.id;
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [extraCharge, setExtraCharge] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [createOrder, { data, isSuccess }] = useCreateOrderMutation();
  const navigate = useNavigate();


  const handleSubcategoryChange = async (event) => {
    setSelectedSubcategory({});
    setExtraCharge(0);
    setIsCheckboxChecked(false);

    const subcategoryId = event.target.value;

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/subCategory/${subcategoryId}`
      );
      const data = await response.json();
      setSelectedSubcategory(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
    if (event.target.checked) {
      setExtraCharge(selectedSubcategory?.data?.FastDelivery[0]?.amount || 0);
    } else {
      setExtraCharge(0);
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleCreateOrder = () => {
    if (
      !selectedSubcategory ||
      !selectedSubcategory.data ||
      !selectedSubcategory.data.title
    ) {
      // If no subcategory is selected, do not proceed
      return;
    }

    const newOrder = {
      customerId: customerId,
      adminUserId: singleData?.gig?.adminUser?.id,
      countryCode: customerData?.data?.countryCode,
      category: singleData?.gig?.Category?.title,
      subCategory: selectedSubcategory?.data?.title,
      quantity: selectedQuantity,
      amount:
        (selectedSubcategory?.data?.amount || 0) * selectedQuantity +
        selectedQuantity * extraCharge,
      categoryImage: singleData?.gig?.Category?.image,
      fastDeliveryAmount:
        (selectedSubcategory?.data?.FastDelivery[0]?.amount || 0) *
        selectedQuantity,
      deliveryTime: selectedSubcategory?.data?.deleveryTime,
      isFastDelivery: isCheckboxChecked,
      categoryId: singleData?.gig?.Category?.id,
      gigId: singleData?.gigsId
    };

    createOrder(newOrder);
    localStorage.setItem("categoryId", JSON.stringify(singleData?.id));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/payment/${data?.data?.id}`);
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="border border-gray-300 mb-10">
      <div className="bg-webPrimary text-center py-3">
        <p className="text-white font-medium">You are starting a project</p>
      </div>

      <div className="bg-[#F2F9FF] p-5">
        <div className="bg-white flex gap-5 items-center mb-8 p-3">
          <img
            className="w-20 h-20 object-cover"
            src={singleData?.gig?.GigsImage[0]?.image}
            alt=""
          />
          <h3 className="text-xl font-bold">{singleData?.gig?.Category?.title}</h3>
        </div>

        <div className="mb-8">
          <p className="text-sm ml-2 mb-1">Choose the subcategory you need</p>
          <select
            className="border py-3 outline-none px-2 text-sm w-full bg-white"
            onChange={handleSubcategoryChange} // Use onChange to capture the selected option
          >
            <option value="">Select subcategory</option>
            {singleData?.gig?.Category?.SubCategory.map(
              (subCategory, index) => (
                <option key={index} value={subCategory.id}>
                  {subCategory.title}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex justify-between items-center my-5">
          {/* Quantity */}
          <div className="flex justify-between items-center gap-5">
            <p className="text-sm ml-2">Quantity</p>
            <select
              className="border py-1 px-5 outline-none text-sm w-full bg-white"
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              {[...Array(9)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={isCheckboxChecked}
            />
            <label htmlFor="checkbox">
              Extra-fast{" "}
              {selectedSubcategory?.data?.FastDelivery[0]?.deleveryTime} day
              delivery
              <span className="text-webPrimary font-semibold ml-2">
                ${selectedSubcategory?.data?.FastDelivery[0]?.amount || 0}
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 my-7">
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <span>
                <FaCheckCircle className="text-webPrimary" />
              </span>
              {singleData?.gig?.Category?.bulletPoint[0]?.itemOne}
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FaCheckCircle className="text-webPrimary" />
              </span>
              {singleData?.gig?.Category?.bulletPoint[0]?.itemTwo}
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FaCheckCircle className="text-webPrimary" />
              </span>
              {singleData?.gig?.Category?.bulletPoint[0]?.itemThree}
            </p>
          </div>
          <div className="bg-white border text-center py-3">
            <p className="font-medium">Total</p>
            <h4 className="font-bold text-webPrimary text-xl">
              $
              {(selectedSubcategory?.data?.amount || 0) * selectedQuantity +
                selectedQuantity * extraCharge}{" "}
              USD
            </h4>
          </div>
        </div>

        <div className="my-5 text-white">
          <button
            disabled={
              !selectedSubcategory ||
              !selectedSubcategory.data ||
              !selectedSubcategory.data.title
            }
            onClick={handleCreateOrder}
            className="w-full bg-webPrimary py-2 font-semibold text-lg"
          >
            Continue ($
            {(selectedSubcategory?.data?.amount || 0) * selectedQuantity +
              selectedQuantity * extraCharge}{" "}
            USD)
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Go to the payment option by clicking "Continue"
        </p>
      </div>
    </div>
  );
};

export default CheckoutCard;
