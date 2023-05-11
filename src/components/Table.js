import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { headerData } from "../data/header";

function Items({ currentItems, itemOffset }) {
  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {headerData?.map((title, idx) => {
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
                        <th scope="col" className="px-6 py-3" key={idx}>
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
                  <>
                    {console.log("data", data)}

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {itemOffset + idx + 1}
                      </th>
                      <td className="px-6 py-4">{data?.email}</td>
                      <td className="px-6 py-4">
                        {data?.user_id ? data?.user_id : "none"}
                      </td>
                      <td className="px-6 py-4">
                        {data?.organization_admin === true ? "TRUE" : "False"}
                      </td>
                      <td className="px-6 py-4">
                        {data?.user_verified === true ? "TRUE" : "False"}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <>
                  <tr className="bg-white border-b px-6 py-4 flex items-start font-bold justify-start dark:bg-gray-800 dark:border-gray-700">
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

function Table({ itemsPerPage, userData }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = userData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userData.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userData.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} itemOffset={itemOffset} />
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

export default Table;
