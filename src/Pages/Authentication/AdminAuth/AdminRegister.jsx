import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import UserImg from "../../../assets/user.png";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/firebase.config";
import { createUser } from "@/redux/features/users/userSlice";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePostAdminUserMutation } from "@/redux/features/adminUser/adminUserApi";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [createAdminUser] = usePostAdminUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageURL, setImageURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleImageupload(image);
    }
  }, [image]);

  const handleImageupload = image => {
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
        // Handle any errors that occur during the upload.
        console.error(error);
      },
      () => {
        // When the upload is complete, get the image URL.
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async imageUrl => {
            setImageURL(imageUrl);
            console.log(imageUrl);
          })
          .catch(error => {
            // Handle any errors getting the download URL.
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const onSubmit = data => {
    const { name, email, password, phoneNumber, address } = data;

    // Handle form submission with the form data
    dispatch(createUser({ email, password, name, image: imageURL }));
    const newUser = {
      name,
      email,
      password,
      image: imageURL,
      address,
      number: phoneNumber,
    };
    const result = createAdminUser(newUser);
    console.log(result);
    setImageURL("");
    reset();
    toast.success("User created successfully!");

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white">
      <h2 className="text-2xl text-center font-bold mt-5">Admin Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center mt-5">
          <img
            onClick={() => fileRef.current.click()}
            src={imageURL ? imageURL : UserImg}
            alt="profile"
            className="h=20 w-20 self-center cursor-pointer rounded-full object-cover"
          />
          <input
            onChange={e => setImage(e.target.files[0])}
            type="file"
            hidden
            accept="image/*"
            ref={fileRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="block mb-2 font-semibold">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter your phone number"
            {...register("phoneNumber", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="block mb-2 font-semibold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            {...register("address", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-3 relative">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="border border-gray-300 px-3 py-2 w-full outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;