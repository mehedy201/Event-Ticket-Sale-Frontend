import { tailwindContainerClasses } from "../../utils/tailwindClasses";
import { CiCalendarDate } from "react-icons/ci";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import {
  IoIosCheckmarkCircle,
  IoIosArrowForward,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import usePageTracking from "../../hooks/usePageTracking";

export const TicketsDataContext = createContext();

const TicketSaleLandingPage = () => {
  usePageTracking();
  const [steps, setSteps] = useState(1);
  // Quantity ________________________________________
  const [lowTicketsQuantity, setLowTicketsQuantity] = useState(0);
  const [fullTicketsQuantity, setFullTicketsQuantity] = useState(0);
  const [corporateTicketsQuantity, setCorporateTicketsQuantity] = useState(0);
  // Price ___________________________________________
  const [lowTicketsPrice, setLowTicketsPrice] = useState(0);
  const [fullTicketsPrice, setFullTicketsPrice] = useState(0);
  const [corporateTicketsPrice, setCorporateTicketsPrice] = useState(0);
  const [totalPrice, setTotalParice] = useState(0);
  const [cuponCode, setCuponCode] = useState("");
  // After Price Calculation__________________________
  const [payAblePrice, setPayAblePrice] = useState(0);
  // Purcher and Attendees Info Collect ______________
  const [purcherAttendeesInfo, setPurcherAttendeesInfo] = useState("");
  // Braintree Client Token___________________________
  const [clientToken, setClientToken] = useState(null);

  const contextValue = {
    steps,
    setSteps,
    // Quantity ________________________________________
    lowTicketsQuantity,
    setLowTicketsQuantity,
    fullTicketsQuantity,
    setFullTicketsQuantity,
    corporateTicketsQuantity,
    setCorporateTicketsQuantity,
    // Price ___________________________________________
    lowTicketsPrice,
    setLowTicketsPrice,
    fullTicketsPrice,
    setFullTicketsPrice,
    corporateTicketsPrice,
    setCorporateTicketsPrice,
    totalPrice,
    setTotalParice,
    payAblePrice,
    setPayAblePrice,
    cuponCode,
    setCuponCode,
    // Purcher and Attendees Info Collect ______________
    purcherAttendeesInfo,
    setPurcherAttendeesInfo,
    // Braintree Client Token___________________________
    // clientToken, setClientToken,
  };

  return (
    <div>
      {/* Events Tittle_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div className="bg-[#1bb798] pt-20 pb-20">
        <div className={tailwindContainerClasses}>
          <div className="flex gap-4 items-center">
            <img
              className="rounded-lg"
              style={{ height: "80px", width: "auto" }}
              src={logo}
              alt="Mehedi"
            />
            <h1 className="text-[20px] md:text-[30px] font-bold text-white">
              3rd International Conference on Business Health and Climate.
            </h1>
          </div>
          <div className="flex items-center gap-6 pt-3">
            <div className="flex items-center gap-1">
              <CiCalendarDate size={18} color="white" />
              <p className="text-white text-sm font-bold">
                Apr 19 – 21, 2027 || 09:00 AM
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LiaMapMarkerAltSolid size={18} color="white" />
              <p className="text-white text-sm font-bold">
                Laval, Québec - Canada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets buy Steps_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div style={{ marginTop: "-48px" }} className={tailwindContainerClasses}>
        <div className="px-2 sm:px-10 pt-4 pb-10 bg-white shadow-md border-1 border-gray-300 rounded-lg">
          <div className="flex items-center gap 1 sm:gap-3 md:gap-3 pb-3 border-b-1 border-gray-300">
            <div className="flex items-center gap-1">
              <IoIosCheckmarkCircle className="hidden sm:block" />
              <small className="text-xm sm:text-sm">Select Tickets</small>
              <IoIosArrowForward className="sm:ml-2" />
            </div>
            <div className="flex items-center gap-1">
              {steps > 1 ? (
                <IoIosCheckmarkCircle className="hidden sm:block" />
              ) : (
                <IoIosCheckmarkCircleOutline className="hidden sm:block" />
              )}
              <small>Share Details</small>
              <IoIosArrowForward className="sm:ml-2" />
            </div>
            <div className="flex items-center gap-1">
              {steps > 2 ? (
                <IoIosCheckmarkCircle className="hidden sm:block" />
              ) : (
                <IoIosCheckmarkCircleOutline className="hidden sm:block" />
              )}
              <small>Complete Payment</small>
            </div>
          </div>
          {/* Tickets / Attendees / Payment___________________________________________ */}
          {/* ________________________________________________________________________ */}
          <TicketsDataContext.Provider value={contextValue}>
            <Outlet />
          </TicketsDataContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default TicketSaleLandingPage;
