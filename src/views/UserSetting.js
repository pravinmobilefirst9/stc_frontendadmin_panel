import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Heading from "../components/Heading";
import { baseURL } from "../data/const";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userListing, userSearch } from "../api/api";

const UserSetting = () => {
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const admin = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const params = useParams();

  console.log("params", params);

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
                    <Link to={"/user-list"}>Back</Link>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1 style={{ fontSize: "20px" }}>user setting</h1>
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

export default UserSetting;
