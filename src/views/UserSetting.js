import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userListing, userSearch, userSetting } from "../api/api";
import SettingButton from "../components/SettingButton";
import ResetPasswordModal from "../components/ResetPasswordModal";

const UserSetting = () => {
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpen] = useState(false);
  const admin = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const params = useParams();
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   console.log("handle search clicked ");
  //   if (searchtext.length > 0) {
  //     const res = await userSearch(searchtext);
  //     console.log("res data ", res.data);
  //     setUserData(res.data);
  //   }
  // };

  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // setLoader(true);
    // axios
    //   .get(baseURL + "/api/auth/get-all-users", {
    //     headers: {
    //       Authorization: `Bearer ${admin}`,
    //     },
    //   })
    //   .then((response) => {
    //     setUserData(response?.data?.data);
    //     setLoader(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //   });
    setLoader(true);
    const getData = async () => {
      const res = await userSetting(params.id);
      if (res?.data && res.data) {
        setLoader(false);
        setUserData(res.data);
      }
    };
    setLoader(false);
    getData();
  }, [params.id]);

  return (
    <div>
      <Sidebar
        layout={
          <>
            <div className="m-0 lg:m-5">
              {/* <div>
                <Heading title="User Data" />
              </div> */}
              <div className="m-0 lg:m-10">
                {loader ? (
                  <div className="flex items-center justify-center mt-10">
                    <TailSpin
                      height="80"
                      width="80"
                      color="blue"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <Link to={"/user-list"}>
                      <button
                        className=""
                        style={{
                          padding: "5px 20px",
                          background: "#FF6600",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Back
                      </button>
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Heading title="user setting" />
                    </div>

                    {userData && userData.length == undefined ? (
                      <div className=" items-center  mt-10 w-100">
                        {/*  */}
                        <div className="w-100">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                            className="px-4 sm:px-0"
                          >
                            <div>
                              <span className="font-bold uppercase">Email</span>
                              <h3 className="text-base font-semibold leading-7 text-gray-900">
                                {userData?.email}
                              </h3>
                            </div>
                            <div>
                              <span className="font-bold uppercase">
                                User id
                              </span>
                              <h3 className="text-base font-semibold leading-7 text-gray-900">
                                {userData?.user_id}
                              </h3>
                            </div>
                            <div className="">
                              <span className="font-bold uppercase">
                                Organization id
                              </span>
                              <h3 className="text-base font-semibold leading-7 text-gray-900">
                                {userData?.organization_id}
                              </h3>
                            </div>

                            {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and application.
                          </p> */}
                            <img
                              className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <div className="border-2 mt-5 mb-16 border-b-[#FF6600]"></div>
                          <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                              <SettingButton
                                title={"  Reset password"}
                                open={openModal}
                                setOpen={setOpen}
                              />

                              <SettingButton title={" Change User Status"} />
                              <SettingButton title={" Edit User Details"} />
                            </dl>
                          </div>
                        </div>

                        {/*  */}
                      </div>
                    ) : (
                      <h2>no record found</h2>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        }
      />
      <ResetPasswordModal
        open={openModal}
        setOpen={setOpen}
        userId={
          userData && userData.length == undefined ? userData.user_id : null
        }
      />
    </div>
  );
};

export default UserSetting;
