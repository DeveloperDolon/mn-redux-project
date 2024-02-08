import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "@/redux/features/users/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { email, name, isLoading } = useSelector((state) => state.userSlice);
  console.log(email);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    dispatch(loginUser({ email, password })).then(() => {
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="py-10 flex flex-col gap-5"
      >
        <div>
          <Label>Email</Label>
          <Input {...register("email", { required: true })} type="email" />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="remember" id="remember" />
            <p>Remember me</p>
          </div>
          <span className="text-blue-500">Forgot password?</span>
        </div>

        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Sign In
        </Button>
      </form>

      <h1 className="flex justify-center gap-1">
        Don't have an Account?
        <Link to={`/`} className="text-blue-500 font-semibold">
          Sign Up
        </Link>
      </h1>
    </>
  );
};

export default Login;
