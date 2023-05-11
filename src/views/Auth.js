import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../data/const";
import { TailSpin } from "react-loader-spinner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const authLogin = () => {
    setLoader(true);
    if (process.env.REACT_APP_ADMINEMAIL === email.trim().toLowerCase()) {
      axios
        .post(baseURL + "/api/auth/register", {
          email: email.trim().toLowerCase(),
        })
        .then((response) => {
          toast.success(`OTP send sucessfully. Please check your email..!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            setLoader(false);
            navigate("/verify-otp", { state: email.trim().toLowerCase() });
          }, 5000);
        })
        .catch((err) => {
          toast.error("Email did not send. Please try again..!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoader(false);
        });
    } else {
      toast.error("Invalid admin credentials. Please check email id..!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-[80vh] flex items-center justify-center max-w-5xl mx-auto overflow-hidden bg-[#B8C9C8] rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/login.png"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center bg-[#B8C9C8]  p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex items-center justify-center">
                <div className="w-10 mr-1">
                  <img src="/transperent.svg" />
                </div>
                <h1 className="text-4xl text-center font-semibold text-gray-700 dark:text-gray-200">
                  5ire
                </h1>
              </div>
              <hr className="mt-2 mb-2 border-yellow-600" />
              <h2 className="text-lg mb-8 text-center font-semibold text-gray-700 dark:text-gray-200">
                Please Enter Your E-mail Address
              </h2>
              <label className="block text-sm">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {/* Email id */}
                </span>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@domain.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <div
                onClick={!loader && email.length > 2 && authLogin}
                className={`${
                  loader ? "opacity-60" : "none"
                } flex items-center justify-center cursor-pointer w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple`}
              >
                {loader ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Send OTP"
                )}
              </div>
              <hr className="my-8 border-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
