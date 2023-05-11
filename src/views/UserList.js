import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const admin = sessionStorage.getItem("admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  });

  useEffect(() => {
    setLoader(true);
    axios
      .get(baseURL + "/api/auth/get-all-users", {
        headers: {
          Authorization: `Bearer ${admin}`,
        },
      })
      .then((response) => {
        setUserData(response?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  return (
    <div>
      <Sidebar
        layout={
          <>
            <div className="m-0 lg:m-5">
              <div>
                <Heading title="User Data" />
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
                    <Table itemsPerPage={25} userData={userData} />
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
