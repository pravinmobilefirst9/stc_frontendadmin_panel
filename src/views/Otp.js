import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../data/const";
import { TailSpin } from "react-loader-spinner";
import OTPInput, { ResendOTP } from "otp-input-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state) {
      navigate("/");
    }
  }, []);

  const authVerify = () => {
    setLoader(true);

    axios
      .post(baseURL + "/api/auth/verify-email", {
        email: location?.state,
        otp: OTP,
      })
      .then((response) => {
        if (response?.data?.status === "success") {
          toast.success(`OTP verified sucessfully..!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (process.env.REACT_APP_ADMINEMAIL === location?.state) {
            sessionStorage.setItem("admin", response?.data?.access_token);
          } else {
            toast.error("Please try again with admin email id..!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          setTimeout(() => {
            setLoader(false);
            navigate("/user-list", { email: email });
          }, 2000);
        } else {
          toast.error("Please try again..!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("OTP did not match. Please try again..!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoader(false);
      });
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-[80vh] flex items-center justify-center max-w-5xl bg-[#B8C9C8] mx-auto overflow-hidden rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/login.png"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
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
                Please Enter OTP
                <p className="text-base">email id - {location?.state}</p>
              </h2>
              <div className="flex items-center justify-center">
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  secure
                  inputClassName="border-2 -m-3 lg:-m-0"
                  className="ml-8 lg:ml-4"
                />
              </div>
              <div
                onClick={!loader && OTP.length === 6 && authVerify}
                className={`${
                  loader || OTP.length < 6 ? "opacity-60" : "none"
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
                  "Verify OTP"
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
