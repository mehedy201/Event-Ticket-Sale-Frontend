import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";
import axios from "axios";
import Pagination from "../../../Components/Pagination";
import LoadingComponents from "../../../Components/LoadingComponents";
import usePageTracking from "../../../hooks/usePageTracking";

const Purcher = () => {
  usePageTracking();
  // URL params
  const { page } = useParams();

  // Queryparams Hooks.
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";

  // For Pagination
  const [totalPage, setTotalPage] = useState();
  const [totalDataCount, setTotalDataCount] = useState();

  // Fetch Attendees Data________________________________
  const [loading, setLoading] = useState(false);
  const [purcherData, setPurcherData] = useState();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://moneris-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/purcher-data?page=${page}&search=${search}`,
      )
      .then((res) => {
        if (res.status === 200) {
          setPurcherData(res.data.data);
          setTotalPage(res.data.totalPages);
          setTotalDataCount(res.data.totalCount);
          setLoading(false);
        }
      });
    // setLoading(false);
  }, [search, page]);

  // Handle Page Change________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/dashboard/purcher/${page}/10`, { search: searchText });
  };

  // Handle Search_____________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/dashboard/purcher/1/10`, { search: searchText });
    }
  };

  const handleDownloadExcel = () => {
    window.open(
      "https://moneris-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/download-Full-Purcher-Excel",
      "_blank",
    );
  };
  return (
    <div>
      <input
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-1 border-gray-300 w-full h-8 p-2 rounded my-3"
        type="text"
        placeholder="Transection ID: type and search"
      />

      <div className="flex justify-between items-center py-3">
        <p>Purcher Details {totalDataCount}</p>
        <button
          className="cursor-pointer border px-3 py-1 rounded-md"
          onClick={handleDownloadExcel}
        >
          Export All Data
        </button>
      </div>
      {loading && <LoadingComponents />}
      {purcherData &&
        purcherData.map((purcher, index) => (
          <div
            key={index}
            className="py-3 shadow rounded-md flex justify-between items-center border-b-1 border-gray-300"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {purcher?.purcher?.firstName} {purcher?.purcher?.lastName}
              </h3>
              <p>{purcher?.purcher?.email}</p>
            </div>
            <a
              style={{ textDecoration: "none" }}
              href={`https://moneris-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/download-single-purcher-details/${purcher._id}`}
            >
              Download Purcher Details
            </a>
          </div>
        ))}
      {!purcherData && <p>Data Not Found</p>}

      <Pagination
        totalPages={totalPage}
        currentPage={Number(page)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Purcher;
