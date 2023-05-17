import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../data/const";
import { TailSpin } from "react-loader-spinner";
import loginImage from "../asset/images/login.png";
import { login, setToken } from "../api/api";
const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const admin = localStorage.getItem("auth-token");

  useEffect(() => {
    if (!admin) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, []);

  const authLogin = async () => {
    const res = await login(username, password);
    if (res.data.access_token) {
      setToken(res?.data?.access_token);
      navigate("/dashboard");
    }
    // axios
    //   .post(baseURL + "/api/admin/login-admin", {
    //     username: username.trim().toLowerCase(),
    //     password: password.trim().toLowerCase(),
    //   })
    //   .then((response) => {
    //     toast.success(`Login Success`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setLoader(false);
    //     sessionStorage.setItem("admin", response?.data?.access_token);
    //     navigate("/user-list", { state: username.trim().toLowerCase() });
    //   })
    //   .catch((err) => {
    //     toast.error("Wrong Password..!", {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setLoader(false);
    //   });
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-[80vh] flex items-center justify-center max-w-5xl mx-auto overflow-hidden bg-[#B8C9C8] rounded-lg shadow-xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={loginImage}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center bg-[#B8C9C8]  p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex items-center justify-center">
                {/* <div className="w-10 mr-1">
                  <img src="/transperent.svg" />
                </div> */}
                <h1 className="text-4xl text-center font-semibold text-gray-700 dark:text-gray-200">
                  STC ADMIN
                </h1>
              </div>
              <hr className="mt-2 mb-2 border-yellow-600" />
              <h2 className="text-lg mb-8 text-center font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h2>
              <label className="block text-sm">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {/* Username */}
                </span>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              {/* <h2 className="text-lg mb-8 text-center font-semibold text-gray-700 dark:text-gray-200">
                Please Enter Your E-mail Address
              </h2> */}
              <label className="block text-sm">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {/* Password */}
                </span>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <div
                onClick={!loader && username.length > 2 && authLogin}
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
                  "Login"
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
