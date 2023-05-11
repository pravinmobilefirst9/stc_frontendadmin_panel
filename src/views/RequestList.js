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
  const admin = sessionStorage.getItem("admin");

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
              <div>
                <Heading title="Pending Requests" />
              </div>
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
                    <div className="flex items-end justify-end mr-2">
                      <p className="font-bold">Total tokens : {balance}</p>
                    </div>
                    <RequestTable
                      itemsPerPage={25}
                      requestData={requestData}
                      setState={setState}
                      state={state}
                      balance={balance}
                    />
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
