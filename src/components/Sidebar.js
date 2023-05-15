import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ layout }) => {
  const [mSidebar, setMSidebar] = useState(false);
  const [clickUser, setClickUser] = useState(false);
  const [clickRequest, setClickRequest] = useState(false);
  const [clickApproveRequest, setClickApproveRequest] = useState(false);
  const [tokenTranfer, setTokenTransfer] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (window.location.pathname === "/user-list") {
      setClickUser(true);
    }
    if (window.location.pathname === "/dashboard") {
      setClickRequest(true);
    }
    if (window.location.pathname === `/user/setting/${params.id}`) {
      setClickUser(true);
    }
  }, []);

  const sidebar = () => {
    setMSidebar(!mSidebar);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={sidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          !mSidebar
            ? "-translate-x-full lg:translate-x-0"
            : "translate-x-0 lg:-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div
          className="relative h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
          style={{ background: "#f7f7f7" }}
        >
          <div
            onClick={sidebar}
            className="absolute right-4 top-6 inline-flex lg:hidden items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            <span className="-mt-[7px] text-2xl">x</span>
          </div>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                <div className="flex items-center justify-between w-64">
                  {/* <h1 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      STC
                    </span>
                  </h1> */}
                  <h1 style={{ fontSize: "30px", color: "black" }}>STC</h1>
                </div>
              </div>
              <div className="border-2 -mt-0 mb-8 border-b-[#7E0CD6]"></div>
            </li>

            <li>
              <Link
                //  style={{"color:red"}}
                to="/dashboard"
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black  hover:bg-gray-100 ${
                  clickRequest && "bg-[#FF6600]"
                }  dark:hover:bg-[#FF6600] dark:hover:text-white`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-list"
                className={`flex items-center p-2 text-base font-normal  
                 text-gray-900
                 rounded-lg dark:text-black hover:bg-gray-100 ${
                   clickUser && "bg-[#FF6600]"
                 } dark:hover:bg-gray-500 dark:hover:text-white`}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  User Management
                </span>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/approved-list"
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                  clickApproveRequest && "bg-red-500"
                } dark:hover:bg-gray-700`}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Approved Requests
                </span>
              </Link>
            </li> */}
            <li>
              {/* <Link
                to="/token-transfer"
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                  tokenTranfer && "bg-gray-100"
                } dark:hover:bg-gray-700`}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="gem"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                  ></path>
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Token Transfer
                </span>
              </Link> */}
              <div className="border-2 mt-5 mb-16 border-b-[#7E0CD6]"></div>
            </li>
            <li>
              <div
                onClick={() => logout()}
                className="cursor-pointer flex -mt-6 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 text-[red] font-bold ml-3 whitespace-nowrap">
                  LOGOUT
                </span>
              </div>
              <div className="border-2 mt-2 mb-16 border-b-[#7E0CD6]"></div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 lg:ml-64">
        <div className="p-4 border-0 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {layout}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
