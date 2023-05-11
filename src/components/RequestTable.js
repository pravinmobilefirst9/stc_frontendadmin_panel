import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { headerData2 } from "../data/header";
import axios from "axios";
import { baseURL } from "../data/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

function Items({ currentItems, setState, state, balance }) {
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const admin = sessionStorage.getItem("admin");

  const rejectRequest = (data) => {
    setLoader(true);
    setId2(data?.id);
    axios
      .post(
        baseURL + "/api/transcation/reject-transfer",

        {
          transcationId: data?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${admin}`,
          },
        }
      )
      .then((response) => {
        toast.info(`Token request declined successfully...!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          setLoader(false);
          setId2("");
          setState(!state);
        }, 2000);
      })
      .catch((err) => {
        toast.error("Please try again..!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          setLoader(false);
          setId2("");
          setState(!state);
        }, 2000);
      });
  };

  const approveRequest = (data) => {
    setLoader(true);
    setId(data?.id);
    if (balance < data?.token_request_quantity) {
      toast.error("Admin token is less then requested token..!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoader(false);
      setId("");
    } else {
      axios
        .post(
          baseURL + "/api/transcation/approve-transfer",

          {
            token_quantity: data?.token_request_quantity,
            username: data?.user?.username,
            transcationId: data?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${admin}`,
            },
          }
        )
        .then((response) => {
          toast.success(`Token transfered successfully to user's wallet`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            setLoader(false);
            setId("");
            setState(!state);
          }, 2000);
        })
        .catch((err) => {
          toast.error("Please try again..!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            setLoader(false);
            setId("");
            setState(!state);
          }, 2000);
        });
    }
  };
  return (
    <>
      <div>
        <ToastContainer />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {headerData2?.map((title, idx) => {
                  return (
                    <>
                      {title?.title === "balance" ||
                      title?.title === "Total Amount" ? (
                        <th scope="col" className="px-6 py-3" key={idx}>
                          <div className="flex items-center">
                            {title?.title}
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 ml-1"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 320 512"
                              >
                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                              </svg>
                            </a>
                          </div>
                        </th>
                      ) : (
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            title?.title === "options" && "xl:text-center"
                          }`}
                          key={idx}
                        >
                          {title?.title}
                        </th>
                      )}
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((data, idx) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">{data?.user?.email}</td>

                    <td className="px-6 py-4">
                      {data?.token_request_quantity}
                    </td>
                    <td className="px-6 py-4">
                      <div className="xl:flex xl:items-center xl:justify-center">
                        <button
                          onClick={() => approveRequest(data)}
                          disabled={loader}
                          type="button"
                          className={`flex items-center justify-center min-w-[94.3px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                            loader && id === data?.id ? "opacity-60" : "none"
                          }`}
                        >
                          {id === data?.id ? (
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
                          onClick={() => rejectRequest(data)}
                          disabled={loader}
                          className={`${
                            loader && id2 === data?.id ? "opacity-60" : "none"
                          } flex items-center justify-center focus:outline-none min-w-[94.3px] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                        >
                          {id2 === data?.id ? (
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
                            "Reject"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="bg-white border-b px-6 py-4 flex items-start font-bold justify-start dark:bg-gray-800 dark:border-gray-700 ">
                    No Data Found ...!!
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function RequestTable({ itemsPerPage, requestData, setState, state, balance }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = requestData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(requestData.length / itemsPerPage);

  // Invoke when request click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % requestData.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <Items
        currentItems={currentItems}
        setState={setState}
        state={state}
        balance={balance}
      />
      <div className="mt-8 flex items-center justify-center">
        <ReactPaginate
          breakLabel="..."
          activeClassName="bg-black"
          containerClassName="inline-flex -space-x-px"
          pageLinkClassName="px-3 py-2 focus:outline-none leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          breakClassName="px-3 py-2 -mt-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          nextLabel={
            <div className="px-3 py-[9px] -mt-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </div>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLinkClassName="focus:outline-none"
          previousLabel={
            <div className="px-3 py-[9px] -mt-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </div>
          }
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default RequestTable;
