import { useUpdateCategoryMutation } from "@/redux/features/categories/category";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateModal = ({ update, setUpdate, data }) => {
  const [formData, setFormData] = useState(data);
  console.log(data);
  console.log(data.id);
  function closeModal() {
    setUpdate(false);
  }

  const [updateCategories] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = data => {
    const updatedData = {
      title: data.title,
      categoryId: formData?.id,
      SubCategory: (data.SubCategory || []).map(subCategory => ({
        title: subCategory.title,
        amount: subCategory.amount,
        deliveryTime: subCategory.deliveryTime, // Fixed typo here
        FastDelivery: (subCategory.FastDelivery || []).map(time => ({
          deliveryTime: time.deleveryTime, // Fixed typo here
          amount: time.amount,
        })),
      })),
      bulletPoint: data.bulletPoint,
    };

    console.log("Form data submitted:", updatedData);
    updateCategories(updatedData);
    closeModal();
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-25">
      <div className="m-auto text-left w-1/2 h-[600px] bg-white mx-auto shadow-sm relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full rounded-sm p-4"
        >
          <div className="flex font-montserrat w-full h-auto mb-4">
            <div className="flex justify-between bg-[#FFEFEF] w-full p-2 rounded-xl">
              <div className="flex text-left">
                <p>{formData.id}</p>
                <input
                  type="text"
                  name="title"
                  defaultValue={formData.title}
                  onChange={e => {
                    console.log("Input changed:", e.target.value);
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  {...register("title", { required: true })}
                  className="bg-[#FFEFEF] rounded-md px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>
          {/* body */}
          <div className="flex-1 flex ">
            {formData?.SubCategory?.map((subCategory, index) => (
              <div
                key={index}
                className={`flex flex-col font-montserrat bg-white ${
                  formData?.SubCategory.length === 1 ? "w-full" : "w-1/2"
                }`}
                style={{ height: "300px" }}
              >
                <div className="flex flex-col items-center justify-center border-2 border-gray-500">
                  <div className="flex flex-col font-normal font-montserrat  items-center justify-center p-4">
                    <div className="flex items-center">
                      <label className="mr-2 w-1/4">Title: </label>
                      <input
                        type="text"
                        name={`subCategoryTitle_${index}`}
                        defaultValue={subCategory.title}
                        {...register(`SubCategory[${index}].title`, {
                          required: true,
                        })}
                        className="font-normal border text-black border-gray-400 rounded-md px-2 w-full"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="mr-2 w-full">Amount: $ </label>
                      <input
                        className="font-bold text-webPrimary m-2 border border-gray-400 rounded-md px-2 py-1 w-1/3"
                        defaultValue={`${subCategory.amount}`}
                        name={`subCategoryTitle_${index}`}
                        {...register(`SubCategory[${index}].amount`, {
                          required: true,
                        })}
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="mr-2 w-full">Delivery Time:</label>
                      <input
                        className="font-normal text-black m-2 border border-gray-400 rounded-md px-2 py-1 w-1/3"
                        defaultValue={`${subCategory.deleveryTime} `}
                        name={`subCategoryTitle_${index}`}
                        {...register(`SubCategory[${index}].deleveryTime`, {
                          required: true,
                        })}
                      />
                    </div>
                    {subCategory?.FastDelivery?.map((time, idx) => (
                      <div key={idx}>
                        <div className="flex items-center">
                          <label className="mr-2 w-full">
                            Extra Deliver time:
                          </label>
                          <input
                            type="text"
                            name={`SubCategory[${index}].FastDelivery[${idx}].deleveryTime`}
                            defaultValue={time.deleveryTime}
                            {...register(
                              `SubCategory[${index}].FastDelivery[${idx}].deleveryTime`,
                              {
                                required: true,
                              }
                            )}
                            className="mt-2 font-normal border text-black border-gray-400 rounded-md px-2 py-1 w-1/3"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="mr-2 w-full">Extra Charge: $</label>
                          <input
                            type="text"
                            name={`SubCategory[${index}].FastDelivery[${idx}].amount`}
                            defaultValue={time.amount}
                            {...register(
                              `SubCategory[${index}].FastDelivery[${idx}].amount`,
                              {
                                required: true,
                              }
                            )}
                            className="mt-2 border text-black border-gray-400 rounded-md px-2 py-1 w-1/3"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* footer */}
          <div className="mt-4 flex items-center font-normal text-md font-montserrat bg-[#EDF7FC] text-gray-700 border-t-2 border-gray-400">
            {formData?.bulletPoint?.map((item, index) => (
              <div
                key={index}
                className="mt-4 flex items-center justify-around gap-2 mr-1"
              >
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
                <input
                  type="text"
                  name={`bulletPoint[${index}].itemOne`}
                  defaultValue={item.itemOne}
                  {...register(`bulletPoint[${index}].itemOne`, {
                    required: true,
                  })}
                  readOnly
                  className="w-36"
                />
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
                <input
                  type="text"
                  name={`bulletPoint[${index}].itemTwo`}
                  defaultValue={item.itemTwo}
                  {...register(`bulletPoint[${index}].itemTwo`, {
                    required: true,
                  })}
                  readOnly
                  className="w-36"
                />
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
                <input
                  type="text"
                  name={`bulletPoint[${index}].itemThree`}
                  defaultValue={item.itemThree}
                  {...register(`bulletPoint[${index}].itemThree`, {
                    required: true,
                  })}
                  readOnly
                  className="w-36"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
