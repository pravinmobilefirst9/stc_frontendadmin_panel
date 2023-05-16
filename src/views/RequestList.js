import React, { useState, useEffect } from "react";
import RequestTable from "../components/RequestTable";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [balance, setBalance] = useState(0);
  const [state, setState] = useState(false);
  const admin = localStorage.getItem("auth-token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  });

  useEffect(() => {
    axios
      .get(baseURL + "/api/transcation/info", {
        headers: {
          Authorization: `Bearer ${admin}`,
        },
      })
      .then((response) => {
        setBalance(response?.data?.data[0]?.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(baseURL + "/api/auth/get-all-transactions", {
        headers: {
          Authorization: `Bearer ${admin}`,
        },
      })
      .then((response) => {
        setRequestData(
          response?.data?.data.filter(
            (x) =>
              x?.transcationType === "requestToAdmin" &&
              x?.transcationStatus === "PENDING"
          )
        );
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [state]);

  return (
    <div>
      <Sidebar
        layout={
          <>
            <div className="m-0 lg:m-5">
              {/* <div>
                <Heading title="Pending Requests" />
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
                    {/* <div className="flex items-end justify-end mr-2">
                      <p className="font-bold">Total tokens : {balance}</p>
                    </div>
                    <RequestTable
                      itemsPerPage={25}
                      requestData={requestData}
                      setState={setState}
                      state={state}
                      balance={balance}
                    /> */}
                    {/* <h1>Dashboard</h1> */}
                    <div class="flex-grow p-6">
                      <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
                        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                          Create New
                        </button>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                          <h3 class="text-lg font-bold mb-4">Total Orders</h3>
                          <p class="text-3xl font-bold">1,234</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg p-6">
                          <h3 class="text-lg font-bold mb-4">
                            Total Customers
                          </h3>
                          <p class="text-3xl font-bold">567</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg p-6">
                          <h3 class="text-lg font-bold mb-4">Total Revenue</h3>
                          <p class="text-3xl font-bold">$123,456</p>
                        </div>
                      </div>
                    </div>
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

export default RequestList;
