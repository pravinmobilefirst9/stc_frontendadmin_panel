import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { userListing, userSearch } from "../api/api";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const admin = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("handle search clicked ");
    if (searchtext.length > 0) {
      const res = await userSearch(searchtext);
      console.log("res data ", res.data);
      setUserData(res.data);
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  });

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
      const res = await userListing();
      if (res?.data && res.data) {
        setUserData(res.data);
        console.log("res.data", res?.data);
        setLoader(false);
      }
      setLoader(false);
    };
    getData();
  }, []);

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
                    <form
                      class="mb-5"
                      //  onSubmit={(e) => handleSearch(e)}
                    >
                      <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="default-search"
                          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search by userId, organizationId & email"
                          required
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                          onClick={(e) => handleSearch(e)}
                          type="button"
                          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    <Table itemsPerPage={5} userData={userData} />
                  </>
                )}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default UserList;
