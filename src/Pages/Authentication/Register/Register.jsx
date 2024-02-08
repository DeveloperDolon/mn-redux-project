import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "@/redux/features/users/userSlice";
import { useDispatch } from "react-redux";
import { useCreateCustomerMutation } from "@/redux/features/customer/customer";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referralCode, setReferralCode] = useState(""); 
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [createCustomer, { data, isLoading: customerLoading, isSuccess }] =
    useCreateCustomerMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch('country.json')
      .then(res => res.json())
      .then(resData => setCountries(resData))
  }, []);

  useEffect(() => {
    const selectedCountryData = countries.find(country => country.name === selectedCountry);
    if (selectedCountryData) {
      setCountryCode(selectedCountryData?.code.toLowerCase());
    }
  }, [countries, selectedCountry]);

  useEffect(() => {
    // Check for a referral code in the URL when the component mounts
    const urlReferralCode = new URLSearchParams(location.search).get('ref');
    if (urlReferralCode) {
      setReferralCode(urlReferralCode);
    }
  }, [location.search]);


  // function generateRandomNumber() {
  //   let randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
  // }
  
  // console.log(generateRandomNumber());


  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const onSubmit = (data) => {
    const { name, email, password, username, country } = data;

    dispatch(createUser({ email, password, name }));

    const body = {
      name,
      email,
      password,
      userName: username,
      country,
      countryCode,
      referralCode,
    };

    createCustomer(body).then(() => {
      navigate(from, { replace: true });
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer created successfully");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-10 flex flex-col gap-5"
      >
        <div>
          <Label>Country</Label>
          <select
            id="country"
            {...register('country')}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border border-gray-300 h-10 px-3 rounded-md py-2 outline-none"
          >
            <option value="">Select Country</option>
            {countries?.map((country, index) => (
              <option key={index} value={country?.name}>
                {country?.name}
              </option>
            ))}
          </select>
          {errors.country && <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>}
        </div>

        <div>
          <Label>Full Name</Label>
          <Input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <Label>Username</Label>
          <Input type="text" {...register("username", { required: true })} />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: {
                    source: passwordRegex.source,
                    flags: passwordRegex.flags,
                  },
                  message:
                    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <Label>Confirm Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("confirmPass", {
                required: "Confirmation password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPass && (
            <span className="text-red-500">{errors.confirmPass.message}</span>
          )}
        </div>

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Sign Up
        </Button>
      </form>

      <h1 className="text-center">
        Already have an Account?
        <span className="text-blue-500 font-semibold">Sign In</span>
      </h1>
    </>
  );
};

export default Register;