import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainLayout from "../layouts/MainLayout";
import { getUserProfile, updateProfile } from "../services/index/users";
import ProfilePicture from "./ProfilePicture";
import { userActions } from "../store/reducers/userReducers";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
     <section className="container px-5 py-10 mx-auto">
       <div className="w-full max-w-sm mx-auto">

        <div className="items-center hidden gap-3 ml-auto mr-4 lg:flex">
          <ProfilePicture avatar={profileData?.avatar} />
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full mb-3">
              {/* <label htmlFor="name"
                className="text-[#5eeccc] text-sm tracking-[.6em] block"
              >
                Name
              </label>  */}
              <input
                type="text" id="name"
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
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] mt-3 rounded px-5 py-2 block outline-none bg-gray-800 border border-gray-700 ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full mb-3">
              <label
                htmlFor="email"
                className="text-[#5eeccc] text-sm tracking-[.4em] block"
              >
                Email
              </label>
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
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] mt-3 rounded px-5 py-2 bg-gray-800 block outline-none border border-gray-700 ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="password"
                className="text-[#5eeccc] text-sm tracking-[.4em] block"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter new password"
                className={`placeholder:text-[#959ead] mt-3 rounded px-5 py-2 bg-gray-800 block outline-none border border-gray-700 ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className="bg-[#5eeccc] hover:bg-[#1be415] text-black text-lg py-4 px-8 w-full rounded mb-4 disabled:opacity-70 disabled:cursor-not-allowed tracking-[.3em] cursor-pointer"
            >
              Update
            </button>

          </form>
        </div>
      </section> 
    </MainLayout>
  );
};

export default ProfilePage;
