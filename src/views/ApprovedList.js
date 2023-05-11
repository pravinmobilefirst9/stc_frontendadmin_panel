import React, { useState, useEffect } from "react";
import ApproveTable from "../components/ApproveTable";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const ApprovedList = () => {
  const [requestData, setRequestData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState(false);
  const admin = localStorage.getItem("auth-token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  });

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
              (x?.transcationType === "requestToAdmin" &&
                x?.transcationStatus === "SUCCESS") ||
              (x?.requestFromRole === "ADMIN" &&
                x?.transcationType === "creditToken")
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
                <Heading title="Approved Requests" />
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
                    <ApproveTable
                      itemsPerPage={25}
                      requestData={requestData}
                      setState={setState}
                      state={state}
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

export default ApprovedList;
