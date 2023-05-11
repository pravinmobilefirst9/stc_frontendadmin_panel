import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Heading from "../components/Heading";
import Select from "react-select";
import { baseURL } from "../data/const";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

const AdminTokenTransfer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [token, setToken] = useState("");
  const admin = sessionStorage.getItem("admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  });

  const options = [];

  for (var i = 0; i < userData.length; i++) {
    if (userData[i]?.username?.toLowerCase() !== "admin") {
      options.push({
        value: userData[i]?.username,
        label:
          "user name : " +
          `${userData[i]?.username}` +
          ",   " +
          "email id : " +
          userData[i]?.email,
      });
    }
  }

  useEffect(() => {
    setLoader1(true);
    axios
      .get(baseURL + "/api/auth/get-all-users", {
        headers: {
          Authorization: `Bearer ${admin}`,
        },
      })
      .then((response) => {
        setUserData(response?.data?.data);
        setLoader1(false);
      })
      .catch((err) => {
        setLoader1(false);
      });
  }, []);

  const clearData = () => {
    window.location.reload(true);
  };

  const approveRequest = () => {
    setLoader(true);
    if (token > 0 && Number(token) % 1 === 0) {
      axios
        .post(
          baseURL + "/api/transcation/transfer-token",

          {
            token_quantity: Number(token),
            username: selectedOption?.value,
          },
          {
            headers: {
              Authorization: `Bearer ${admin}`,
            },
          }
        )
        .then((response) => {
          if (response?.data?.status === "failed") {
            toast.error(
              `${response?.data?.message}. Enter proper token quntity..!`,
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
          } else {
            toast.success(`Token transfered successfully to user's wallet`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }

          setTimeout(() => {
            setLoader(false);
          }, 2000);
        })
        .catch((err) => {
          toast.error("Transfer token failed. Please try again..!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            setLoader(false);
          }, 2000);
        });
    } else {
      toast.error("Enter proper token quntity..!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Sidebar
        layout={
          <>
            <div className="m-0 lg:m-5">
              <ToastContainer />
              <div>
                <Heading title="Token Transfer" />
              </div>
              <div className="flex items-center justify-center mt-4 lg:mt-16">
                <div className="block max-w-full min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
                  <div>
                    <span className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                      Select User's Details
                    </span>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder={`${
                        loader1 ? "loading data..." : "Search..."
                      }`}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: "#64748b",
                          padding: "4px"
                        }),
                        placeholder: (defaultStyles) => {
                          return {
                            ...defaultStyles,
                            color: "#64748b",
                            fontSize: "16px",
                          };
                        },
                      }}
                    />
                  </div>
                  <label className="block text-base mt-5">
                    <span className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                      Token
                    </span>
                    <input
                      className="border-[1px] placeholder:text-slate-500 placeholder:text-base border-slate-500 opacity-100 text-gray-900 text-base rounded-lg outline-[#3482F6] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Please Enter Token"
                      onChange={(e) => setToken(e.target.value)}
                      type="number"
                      min="1"
                      //   max="10"
                      //   step="1"
                    />
                  </label>
                  <div className="mt-5 flex items-start justify-start">
                    <button
                      onClick={selectedOption && approveRequest}
                      disabled={loader}
                      type="button"
                      className={`flex items-center justify-center min-w-[94.3px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        loader ? "opacity-60" : "none"
                      }`}
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
                        "Approve"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={clearData}
                      disabled={loader}
                      className={`${
                        loader ? "opacity-60" : "none"
                      } flex items-center justify-center focus:outline-none min-w-[94.3px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default AdminTokenTransfer;
