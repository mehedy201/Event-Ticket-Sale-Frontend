import React, { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import useQueryParams from "../../../hooks/useQueryParams";
import LoadingComponents from "../../../Components/LoadingComponents";
import usePageTracking from "../../../hooks/usePageTracking";

const Attendees = () => {
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
  const [attendeesData, setAttendeesData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/ThriveGlobalForum/attendees-data?page=${page}&search=${search}`,
      )
      .then((res) => {
        if (res.status === 200) {
          setAttendeesData(res.data.data);
          setTotalPage(res.data.totalPages);
          setTotalDataCount(res.data.totalCount);
          setLoading(false);
          console.log(res.data.data);
        }
      });
  }, [search, page]);

  // Handle Page Change________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/dashboard/${page}/10`, { search: searchText });
  };

  // Handle Search_____________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/dashboard/1/10`, { search: searchText });
    }
  };

  const handleDownloadExcel = () => {
    window.open(
      "http://localhost:5000/api/v1/ThriveGlobalForum/download-Full-Attendees-Excel",
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
        <p>Attendees Details {totalDataCount}</p>
        <button
          className="cursor-pointer border px-3 py-1 rounded-md"
          onClick={handleDownloadExcel}
        >
          Export All Data
        </button>
      </div>
      {loading && <LoadingComponents />}
      {attendeesData &&
        attendeesData.map((att, index) => (
          <div
            key={index}
            className="py-3 shadow rounded-md flex justify-between items-center border-b-1 border-gray-300"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {att?.firstName} {att?.lastName}
              </h3>
              <p>{att?.ticketsType}</p>
            </div>
            <a
              style={{ textDecoration: "none" }}
              href={`http://localhost:5000/api/v1/ThriveGlobalForum/download-attendees-tickets/${att._id}`}
            >
              Download Ticket
            </a>
          </div>
        ))}
      {!attendeesData && <p>Data Not Found</p>}

      <Pagination
        totalPages={totalPage}
        currentPage={Number(page)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Attendees;
