import React, { useState } from "react";
import { Label } from "@radix-ui/react-menubar";
import Creatable from "react-select/creatable";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/firebase.config";

import { useSelector } from "react-redux";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/categories/category";
import { useGetAdminUserByEmailQuery } from "@/redux/features/adminUser/adminUserApi";
import SuccessModal from "@/components/Modal/SuccessModal";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const { email } = useSelector(state => state.userSlice);
  const { data: AdminUserData, isLoading } = useGetAdminUserByEmailQuery({
    email,
  });
  const { data: allCategories, Loading } = useGetCategoriesQuery();
  const uniqueTitles = new Set();
  const options = allCategories?.data?.reduce((acc, category) => {
    if (!uniqueTitles.has(category.title)) {
      uniqueTitles.add(category.title);
      acc.push({ value: category.title, label: category.title });
    }
    return acc;
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const formData = {
      ...data,

      selectedOption,
      bulletPointItemOne,
      bulletPointItemTwo,
      bulletPointItemThree,
    };
    const image = data.image[0];
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      error => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async imageUrl => {
            const subCategoryData = data.subCategoryData.map(subcategory => ({
              title: subcategory.title,
              amount: parseFloat(subcategory.amount),
              deliveryTime: subcategory.deliveryTimes, // Fixed from subcategory?.deliveryTimes
              fastDelivery: [
                {
                  amount: parseFloat(subcategory.fdAmount),
                  deliveryTime: parseInt(subcategory.firstDeliveryDays), // Parse as integer or float as needed
                },
              ],
            }));

            const newCategories = {
              title: formData?.selectedOption?.label,
              adminUserId: AdminUserData?.data?.id,
              image: imageUrl,
              folder: formData?.folder,
              bulletPoints: [
                {
                  itemOne: formData?.bulletPointItemOne,
                  itemTwo: formData?.bulletPointItemTwo,
                  itemThree: formData?.bulletPointItemThree,
                },
              ],
              subCategoryData,
            };

            createCategory(newCategories).then(() => {
              setShowModal(true);
              reset();
            });
          })
          .catch(error => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const [showRevisions, setShowRevisions] = useState(true);
  const [showPSD, setShowPSD] = useState(true);
  const [showPrintPDF, setShowPrintPDF] = useState(true);

  const handleRevisionsClick = buttonName => {
    setShowRevisions(!showRevisions);
  };

  const handlePSDClick = buttonName => {
    setShowPSD(!showPSD);
  };

  const handlePrintPDFClick = buttonName => {
    if (buttonName === "Print Ready PDF" && !showRevisions && !showPSD) {
      setShowPrintPDF(true);
    } else {
      setShowPrintPDF(!showPrintPDF);
    }
  };

  const bulletPointItemOne = showPSD ? "show psd files" : "";
  const bulletPointItemTwo = showPrintPDF ? "show print pdf" : "";
  const bulletPointItemThree = showRevisions ? "show revisions files" : "";

  const handleCategoryChange = (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      setSelectedOption(newValue);
    } else {
      setSelectedOption(newValue);
    }
  };
  const [subCategoryData, setSubCategoryData] = useState([
    {
      title: "",
      amount: "",
      deliveryTimes: "",
      firstDeliveryDays: "",
      fdAmount: "",
    },
  ]);

  const handleAddDesignClick = () => {
    setSubCategoryData(prevData => [
      ...prevData,
      {
        title: "",
        amount: "",
        deliveryTimes: "",
        firstDeliveryDays: "",
        fdAmount: "",
      },
    ]);
  };

  if (isLoading || !AdminUserData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-10 px-4">
      <div>
        <div className="flex items-center justify-center my-6 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="font-montserrat font-bold py-2 flex flex-col gap-4 my-6 w-[900px]"
          >
            <div className="gap-4 m-2  border-2 border-gray-200  text-white bg-[#1C91E4]">
              <div className="p-1">
                <div className="px-2 py-4 ">
                  <Label className="rounded-none px-2" placeholder="Name">
                    Category
                  </Label>
                  <div className="bg-[#F2F9FF] text-black">
                    <Creatable
                      id="category"
                      isClearable
                      className="border-none outline-none"
                      placeholder="Select Design"
                      onChange={handleCategoryChange}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-4 m-2  border-2 text-white bg-[#1C91E4]">
              <div className="font-montserrat font-bold gap-4 text-white bg-[#1C91E4]">
                <div className="p-1">
                  <div className="px-2 py-4 ">
                    <Label className="rounded-none px-2" placeholder="Name">
                      Folder
                    </Label>
                    <div className="bg-[#F2F9FF] text-black">
                      <input
                        id="folder"
                        name="folder"
                        min="1"
                        type="number"
                        className="w-full bg-[#F2F9FF] text-gray-900 focus:border-transparent focus:outline-none"
                        {...register("folder", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                      {errors.folder && <span>This field is required.</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-4 m-2  border-2 text-white bg-[#1C91E4]">
              <div className="font-montserrat font-bold gap-4 text-white bg-[#1C91E4]">
                <div className="p-1">
                  <label
                    htmlFor="image"
                    className="px-6 font-montserrat font-bold  text-white mb-2"
                  >
                    Image
                  </label>
                </div>

                <div className="bg-[#F2F9FF] border-2 ">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="bg-[#F2F9FF] text-gray-900"
                    placeholder="Select image"
                    {...register("image", { required: true })}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="gap-4 m-2  border-2 mb-4">
                {subCategoryData.map((subCategory, index) => (
                  <Card key={index} className="w-full rounded-none mb-4 pb-4">
                    <div className="p-2 bg-[#1C91E4] flex justify-between">
                      <Label
                        className="rounded-none font-semibold px-2 text-white"
                        placeholder="Name"
                      >
                        Subcategory
                      </Label>
                      <span className="mr-2" onClick={handleAddDesignClick}>
                        <FaPlus className="text-white" />
                      </span>
                    </div>
                    <CardContent>
                      <div className="py-4 flex flex-col gap-4">
                        <div>
                          <Input
                            type="text"
                            id={`subcategory_${index}`}
                            className="rounded-none font-normal"
                            placeholder="Subcategory Title"
                            {...register(`subCategoryData[${index}].title`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            id={`amount_${index}`}
                            className="rounded-none font-normal focus:ring-2 focus:ring-blue ring-transparent"
                            placeholder="Subcategory Amount"
                            {...register(`subCategoryData[${index}].amount`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="flex items-center relative">
                          <Input
                            type="number"
                            id={`deliveryTimes_${index}`}
                            className="rounded-none font-normal"
                            placeholder="Regular Delivery Days"
                            {...register(
                              `subCategoryData[${index}].deliveryTimes`,
                              {
                                required: true,
                              }
                            )}
                          />
                        </div>
                        <div className="flex">
                          <Input
                            type="number"
                            id={`firstDeliveryDays_${index}`}
                            className="rounded-none font-normal  w-2/3"
                            placeholder="First Delivery days"
                            {...register(
                              `subCategoryData[${index}].firstDeliveryDays`,
                              {
                                required: true,
                              }
                            )}
                          />
                          <Input
                            type="number"
                            id={`fdAmount_${index}`}
                            className="rounded-none font-normal focus w-1/3"
                            placeholder="F.D. Amount"
                            {...register(`subCategoryData[${index}].fdAmount`, {
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="border-2 font-thin border-gray-400 w-[250px]"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="gap-4 m-2  border-2">
              <Card className="w-full rounded-none">
                <div className="p-2 bg-[#1C91E4] flex justify-between">
                  <Label
                    className="rounded-none font-semibold px-2 text-white"
                    placeholder="Name"
                  >
                    Bullet Point
                  </Label>
                </div>
                <CardContent className="flex justify-evenly font-montserrat font-medium items-center bg-[#F2F9FF]">
                  {showRevisions && (
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleRevisionsClick("Unlimited Revisions")
                        }
                        className="mt-5 px-2 py-1 text-gray-900 bg-white border-2 border-gray-200 flex items-center"
                      >
                        Unlimited Revisions
                        <span className="ml-2 text-red-600">
                          <RxCross1 />
                        </span>
                      </button>
                    </div>
                  )}
                  {showPSD && (
                    <div className="flex items-center">
                      <button
                        onClick={() => handlePSDClick("PSD Source File")}
                        className="mt-5 px-2 py-1 text-gray-900 bg-white border-2 border-gray-200 flex items-center"
                      >
                        PSD Source File
                        <span className="ml-2 text-red-600">
                          <RxCross1 />
                        </span>
                      </button>
                    </div>
                  )}
                  <div className="flex items-center">
                    <button
                      onClick={() => handlePrintPDFClick("Print Ready PDF")}
                      className="mt-5 px-2 py-1 text-gray-900  flex items-center"
                    >
                      Print Ready PDF
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center gap-4 m-2 ">
              <button
                type="submit"
                className="rounded-full bg-[#1C91E4] hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                CREATE
              </button>
            </div>
            {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
