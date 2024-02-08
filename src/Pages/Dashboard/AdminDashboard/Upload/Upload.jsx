import Container from "@/Pages/Shared/Container";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/firebase.config";
import { useCreateGigMutation } from "@/redux/features/gigs/gigsApi";
import { useGetCategoriesNameQuery } from "@/redux/features/categories/category";
import { useGetAdminUserByEmailQuery } from "@/redux/features/adminUser/adminUserApi";
import { useSelector } from "react-redux";
import SuccessModal from "@/components/Modal/SuccessModal";
import FolderModal from "@/components/Modal/FolderModal";
import SubFolderModal from "@/components/Modal/SubfolderModal";
import {
  useGetFolderByIdQuery,
  useGetUniqueFoldersQuery,
} from "@/redux/features/folder/folderApi";

const Upload = () => {
  const [folders, setFolders] = useState([]);
  const [subFolders, setSubFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedSubFolder, setSelectedSubFolder] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [createGigs] = useCreateGigMutation();
  const { data: uniqueCategories, isLoading: loading } =
    useGetCategoriesNameQuery();
  const { data: folderData, isLoading } = useGetUniqueFoldersQuery();

  useEffect(() => {
    // Check if folderData exists and is not empty
    if (folderData && folderData.data.length > 0) {
      // Transform folderData into the format expected by react-select
      const transformedFolders = transformFolders(folderData.data);
      setFolders(transformedFolders);
    }
  }, [folderData]);

  const transformFolders = (data) => {
    return data.map((folder) => ({
      value: folder.id,
      label: folder.name,
    }));
  };

  const { email } = useSelector((state) => state.userSlice);
  const { data: adminUser } = useGetAdminUserByEmailQuery({
    email,
  });

  useEffect(() => {
    if (uniqueCategories?.data) {
      const categories = uniqueCategories.data.map((category) => ({
        value: category.id,
        label: category.title,
      }));
      setCategoryOptions(categories);
    }
  }, [uniqueCategories]);

  console.log(selectedFolder);

  const { data: subFolderData, isLoading: subFolderLoading } =
    useGetFolderByIdQuery(selectedFolder?.value);

  useEffect(() => {
    // Check if folderData exists and is not empty
    if (subFolderData && subFolderData?.data?.SubFolder?.length > 0) {
      // Transform folderData into the format expected by react-select
      const transformedSubFolders = transformSubFolders(subFolderData?.data?.SubFolder);
      setSubFolders(transformedSubFolders);
    }
  }, [folderData, subFolderData]);

  const transformSubFolders = (data) => {
    return data.map((subFolder) => ({
      value: subFolder?.id,
      label: subFolder?.name,
    }));
  };

  useEffect(() => {
    localStorage.setItem("folder", JSON.stringify(selectedFolder?.value));
  }, [selectedFolder]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    const selectedCategoryId = category?.value;

    if (selectedCategoryId) {
      const subcategories = uniqueCategories?.data
        .find((cat) => cat.id === selectedCategoryId)
        ?.subCategories.map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.title,
          parent: selectedCategoryId,
        }));
      setSubcategoryOptions(subcategories || []);
    } else {
      setSubcategoryOptions([]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };
  const [files, setFiles] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [folderModel, setFolderModel] = useState(false);
  const [subFolderModel, setSubFolderModel] = useState(false);

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    const fileArray = Array.from(selectedFiles);

    const updatedFiles = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles([...files, ...updatedFiles]);
  };

  const handleCheckboxChange = (index) => {
    const isChecked = checkedItems.includes(index);
    if (isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const handleRemoveSelectedFiles = () => {
    const remainingFiles = files.filter(
      (_, index) => !checkedItems.includes(index)
    );
    setFiles(remainingFiles);
    setCheckedItems([]);
  };

  const onSubmit = (formData) => {
    // Check if files array is empty or undefined
    if (files && files.length > 0) {
      const uploadPromises = files.map((fileObject) => {
        const imageFile = fileObject.file;
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(getStorage(app), fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((imageUrl) => {
                  resolve({ image: imageUrl });
                })
                .catch((error) => {
                  console.error("Error getting download URL:", error);
                  reject(error);
                });
            }
          );
        });
      });

      Promise.all(uploadPromises)
        .then((uploadedFiles) => {
          const formattedImages = uploadedFiles.map((file) => ({
            image: file.image,
          }));

          const tagsString = formData?.tags;

          const tags = tagsString.split(",");

          const wordCount = formData?.description.split(" ").length;
          const gigsData = {
            title: formData?.title,
            description: formData?.description,
            size: formData?.size,
            fileFormat: formData?.fileFormat,
            imageData: formattedImages,
            subFolderId: selectedSubFolder?.value,
            industry: formData?.industries,
            design: formData?.designs,
            wordCount: wordCount,
            adminUserId: adminUser?.data?.id,
            categoryId: selectedCategory?.value,
            tagsData: tags.map((tag) => ({ name: tag })),
          };

          createGigs(gigsData).then(() => {
            setShowModal(true);
            reset();
          });
        })
        .catch((error) => {
          console.error("Error occurred during form submission:", error);
        });
    } else {
      console.error("No files selected or files array is empty.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-[#F2F9FF] w-full">
        <Container className="flex w-full">
          <div className="flex items-center justify-center">
            <h1 className="mt-6 font-montserrat font-semibold text-2xl text-webPrimary">
              UPLOAD DESIGN
            </h1>
          </div>
          <form className=" w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="px-6 block text-gray-700 font-medium"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="px-6 block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                {...register("description", { required: true })}
                className="my-1 resize-none w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                rows="4"
                cols="50"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <label
                    htmlFor="category"
                    className="px-6 block mb-2 text-gray-700 font-medium"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <Select
                      id="category"
                      onChange={handleCategorySelect}
                      options={categoryOptions}
                      value={selectedCategory}
                      placeholder="Select Category"
                    />
                  </div>
                  {errors.category && (
                    <span className="text-red-500 text-sm">
                      This field is required.
                    </span>
                  )}
                </div>

                {selectedCategory && (
                  <div className="flex-1 relative">
                    <label
                      htmlFor="subcategory"
                      className="px-6 block mb-2 text-gray-700 font-medium"
                    >
                      Subcategory
                    </label>
                    <div className="relative">
                      <Select
                        id="subcategory"
                        onChange={setSelectedSubcategory}
                        options={subcategoryOptions}
                        value={selectedSubcategory}
                        placeholder="Select Subcategory"
                        isDisabled={!selectedCategory}
                      />
                    </div>
                    {errors.subcategory && (
                      <span className="text-red-500 text-sm">
                        This field is required.
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="size"
                    className="px-6 block mb-2 text-gray-700 font-medium"
                  >
                    Size
                  </label>
                  <input
                    id="size"
                    type="text"
                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                    {...register("size", { required: true })}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="fileFormat"
                    className="px-6 block mb-2 text-gray-700 font-medium"
                  >
                    File Format
                  </label>
                  <input
                    id="fileFormat"
                    type="text"
                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                    {...register("fileFormat", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="fileUpload"
                className="px-6 block text-gray-700 font-medium"
              >
                Image
              </label>
              <input
                type="file"
                onChange={handleFileInputChange}
                multiple
                id="fileUpload"
                accept="image/*"
                className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200 text-center"
              />
              <div className="grid gap-4 grid-cols-2">
                {files.map((fileObject, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      className="mr-4"
                      checked={checkedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <img
                      src={fileObject.preview}
                      alt={`Preview-${index}`}
                      className="max-w-xs my-1 w-1/4 h-[75px]"
                    />
                    <p className="ml-4">{fileObject.file.name}</p>
                    <span
                      onClick={() => handleRemoveSelectedFiles(index)}
                      className="ml-4 bg-[#F2F9FF] text-gray-500  px-1.5 py-[.25] rounded-full  border-2 border-gray-500 cursor-pointer"
                    >
                      &#10005;
                    </span>
                  </div>
                ))}
              </div>
              {errors.file && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="tags"
                className="px-6 block text-gray-700 font-medium"
              >
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                {...register("tags", { required: true })}
              />
              {errors.tags && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="related"
                className="px-6 block text-gray-700 font-medium"
              >
                Related Design
              </label>
              <input
                id="related"
                name="related"
                type="text"
                className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                {...register("related", { required: true })}
              />
              {errors.related && (
                <span className="text-red-500 text-sm">
                  This field is required.
                </span>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-end">
                    <button onClick={() => setFolderModel(!folderModel)}>
                      Create
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="folder"
                      className="px-6 block mb-2 text-gray-700 font-medium"
                    >
                      Folder
                    </label>
                    {/* Update the Select component with the options */}
                    <Select
                      id="folder"
                      {...register("folder")}
                      options={folders}
                      value={selectedFolder}
                      onChange={(selectedOption) =>
                        setSelectedFolder(selectedOption)
                      }
                      placeholder="Select Folder"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-end">
                    <button onClick={() => setSubFolderModel(!subFolderModel)}>
                      Create
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="subfolder"
                      className="px-6 block mb-2 text-gray-700 font-medium"
                    >
                      Subfolder
                    </label>
                    <Select
                      id="subfolder"
                      {...register("subfolder")}
                      options={subFolders}
                      value={selectedSubFolder}
                      onChange={(selectedOption) =>
                        setSelectedSubFolder(selectedOption)
                      }
                      placeholder="Select Folder"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="industries"
                    className="px-6 block mb-2 text-gray-700 font-medium"
                  >
                    Industries
                  </label>
                  <input
                    id="industries"
                    type="text"
                    {...register("industries", { required: true })}
                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                  />
                  {errors.industries && (
                    <span className="text-red-500 text-sm">
                      This field is required.
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="designs"
                    className="px-6 block mb-2 text-gray-700 font-medium"
                  >
                    Designs
                  </label>
                  <input
                    id="designs"
                    type="text"
                    {...register("designs", { required: true })}
                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                  />
                  {errors.designs && (
                    <span className="text-red-500 text-sm">
                      This field is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
              >
                Upload
              </button>
            </div>

            {showModal && <SuccessModal onClose={handleCloseModal} />}
          </form>
        </Container>
      </div>
      {folderModel && (
        <FolderModal
          isOpen={folderModel}
          closeModal={() => setFolderModel(!folderModel)}
        />
      )}

      {subFolderModel && (
        <SubFolderModal
          isOpen={subFolderModel}
          closeModal={() => setSubFolderModel(!subFolderModel)}
        />
      )}
    </>
  );
};

export default Upload;
