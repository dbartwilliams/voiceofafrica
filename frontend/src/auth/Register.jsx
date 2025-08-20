import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout.jsx";
import { signup } from "../services/index/users.js";
import { userActions } from "../store/reducers/userReducers.js";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container px-5 py-10 mx-auto">
        <div className="w-full max-w-sm mx-auto">
        <h1 className="text-2xl text-center tracking-[.4em] uppercase text-[#5eeccc]">
          Signup
        </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full mb-2">
              {/* <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label> */}
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Name"
                className={`placeholder:text-gray-300 bg-gray-800 mt-3 rounded px-5 py-2 font-semibold block outline-none border border-gray-700 ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full mb-2">
              {/* <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label> */}
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Email"
                className={`placeholder:text-gray-300 bg-gray-800 mt-3 rounded px-5 py-2 block outline-none border  border-gray-700 ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full mb-2">
              {/* <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label> */}
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className={`placeholder:text-gray-300 bg-gray-800 mt-3 rounded px-5 py-2 block outline-none border border-gray-700 ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full mb-4">
              {/* <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label> */}
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match";
                    }
                  },
                })}
                placeholder="Confirm password"
                className={`placeholder:text-gray-300 bg-gray-800 mt-3 rounded px-5 py-2 block outline-none border border-gray-700 ${
                  errors.confirmPassword ? "border-red-800" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full px-8 py-2 mb-6 text-lg text-white bg-blue-800 rounded disabled:opacity-70 disabled:cursor-not-allowed tracking-[.3em]"
            >
              Register
            </button>
            <p className="text-sm text-[#5eeccc] tracking-[.3em]">
              Already Registered?{" "}
              <Link to="/login" className="">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;