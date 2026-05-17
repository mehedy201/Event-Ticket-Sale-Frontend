import { useContext, useEffect } from "react";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import { FiMinus, FiPlus } from "react-icons/fi";
import OrderSummaryComponents from "../OrderSummaryComponents/OrderSummaryComponents";
import { useNavigate } from "react-router-dom";
import usePageTracking from "../../../hooks/usePageTracking";
import { TICKET_PRICES, TICKET_TYPES } from "../../../utils/pricingConstants";

const TicketsComponents = () => {
  usePageTracking();
  const {
    steps,
    setSteps,
    lowTicketsQuantity,
    setLowTicketsQuantity,
    fullTicketsQuantity,
    setFullTicketsQuantity,
    corporateTicketsQuantity,
    setCorporateTicketsQuantity,
    studentTicketsQuantity,
    setStudentTicketsQuantity,
    lowTicketsPrice,
    setLowTicketsPrice,
    fullTicketsPrice,
    setFullTicketsPrice,
    corporateTicketsPrice,
    setCorporateTicketsPrice,
    studentTicketsPrice,
    setStudentTicketsPrice,
    totalPrice,
    setTotalParice,
    cuponCode,
    setCuponCode,
  } = useContext(TicketsDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (cuponCode) setCuponCode("");
    setSteps(1);
  }, []);

  return (
    <>
      <div className="py-4 grid md:grid-cols-3 gap-4">
        {/* Tickets ________________________________________________________________ */}
        {/* ________________________________________________________________________ */}
        <div className="cols md:col-span-2">
          {/* Low and Middle Income Countries____________________________________________ */}
          <div className="sm:flex gap-2 justify-between pb-5 border-b-1 border-gray-300">
            <div>
              <h2 className="text-[18px] md:text-[22px] font-bold pb-1">
                Low and Middle Income Countries{" "}
                <span className="bg-pink-300 text-xs font-light px-2 py-1 rounded">
                  Venue and Online
                </span>
              </h2>
              <h5 className="text-[14px] md:text-[16px] font-semibold pb-2">
                Attendees from Low and Middle-Income Countries As designated by
                the World Bank / Participants des pays à revenu faible et
                intermédiaire, tel que désigné par la Banque mondiale
              </h5>
              <p className="text-gray-500">
                Sales end on{" "}
                <span className="font-bold text-black">March 31, 2026</span>
              </p>
            </div>
            <div>
              <h2 className="font-bold pb-1">
                US ${TICKET_PRICES[TICKET_TYPES.LOW_INCOME]}.00
              </h2>
              <div className="flex items-center justify-between border border-gray-300 rounded-md">
                <span
                  onClick={() => {
                    if (lowTicketsQuantity > 0) {
                      setLowTicketsQuantity(lowTicketsQuantity - 1);
                      setLowTicketsPrice(
                        lowTicketsPrice -
                          TICKET_PRICES[TICKET_TYPES.LOW_INCOME],
                      );
                      setTotalParice(
                        totalPrice - TICKET_PRICES[TICKET_TYPES.LOW_INCOME],
                      );
                    } else {
                      return;
                    }
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiMinus />
                </span>
                <input
                  className="text-center"
                  style={{ width: "40px", display: "flex" }}
                  value={lowTicketsQuantity}
                  type="text"
                  readOnly
                />
                <span
                  onClick={() => {
                    setLowTicketsQuantity(lowTicketsQuantity + 1);
                    setLowTicketsPrice(
                      lowTicketsPrice + TICKET_PRICES[TICKET_TYPES.LOW_INCOME],
                    );
                    setTotalParice(
                      totalPrice + TICKET_PRICES[TICKET_TYPES.LOW_INCOME],
                    );
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiPlus />
                </span>
              </div>
            </div>
          </div>
          {/* Full Conference Registration____________________________________________ */}
          <div className="sm:flex gap-2 justify-between py-5 border-b-1 border-gray-300">
            <div>
              <h2 className="text-[18px] md:text-[22px] font-bold pb-1 ">
                Full Conference Registration{" "}
                <span className="bg-pink-300 text-xs font-light px-2 py-1 rounded">
                  Venue and Online
                </span>
              </h2>
              <h5 className="text-[14px] md:text-[16px] font-semibold pb-2">
                Full Conference Registration/Inscription Complète{" "}
              </h5>
              <p className="text-gray-500">
                Sales end on{" "}
                <span className="font-bold text-black">March 31, 2026</span>
              </p>
            </div>
            <div>
              <h2 className="font-bold pb-1">
                US ${TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE]}.00
              </h2>
              <div className="flex items-center justify-between border border-gray-300 rounded-md">
                <span
                  onClick={() => {
                    if (fullTicketsQuantity > 0) {
                      setFullTicketsQuantity(fullTicketsQuantity - 1);
                      setFullTicketsPrice(
                        fullTicketsPrice -
                          TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE],
                      );
                      setTotalParice(
                        totalPrice -
                          TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE],
                      );
                    } else {
                      return;
                    }
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiMinus />
                </span>
                <input
                  className="text-center"
                  style={{ width: "40px", display: "flex" }}
                  value={fullTicketsQuantity}
                  type="text"
                  readOnly
                />
                <span
                  onClick={() => {
                    setFullTicketsQuantity(fullTicketsQuantity + 1);
                    setFullTicketsPrice(
                      fullTicketsPrice +
                        TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE],
                    );
                    setTotalParice(
                      totalPrice + TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE],
                    );
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiPlus />
                </span>
              </div>
            </div>
          </div>
          {/* Corporate Attendees____________________________________________ */}
          <div className="sm:flex gap-2 justify-between py-5 border-b-1 border-gray-300">
            <div>
              <h2 className="text-[18px] md:text-[22px] font-bold pb-1">
                Corporate Attendees{" "}
                <span className="bg-pink-300 text-xs font-light px-2 py-1 rounded">
                  Venue and Online
                </span>
              </h2>
              <h5 className="text-[14px] md:text-[16px] font-semibold pb-2">
                Representatives from Corporations, Organizations, and Businesses
                /Représentants d'entreprises, d'organisations et de sociétés
              </h5>
              <p className="text-gray-500">
                Sales end on{" "}
                <span className="font-bold text-black">March 31, 2026</span>
              </p>
            </div>
            <div>
              <h2 className="font-bold pb-1">
                US ${TICKET_PRICES[TICKET_TYPES.CORPORATE]}.00
              </h2>
              <div className="flex items-center justify-between border border-gray-300 rounded-md">
                <span
                  onClick={() => {
                    if (corporateTicketsQuantity > 0) {
                      setCorporateTicketsQuantity(corporateTicketsQuantity - 1);
                      setCorporateTicketsPrice(
                        corporateTicketsPrice -
                          TICKET_PRICES[TICKET_TYPES.CORPORATE],
                      );
                      setTotalParice(
                        totalPrice - TICKET_PRICES[TICKET_TYPES.CORPORATE],
                      );
                    } else {
                      return;
                    }
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiMinus />
                </span>
                <input
                  className="text-center"
                  style={{ width: "40px", display: "flex" }}
                  value={corporateTicketsQuantity}
                  type="text"
                  readOnly
                />
                <span
                  onClick={() => {
                    setCorporateTicketsQuantity(corporateTicketsQuantity + 1);
                    setCorporateTicketsPrice(
                      corporateTicketsPrice +
                        TICKET_PRICES[TICKET_TYPES.CORPORATE],
                    );
                    setTotalParice(
                      totalPrice + TICKET_PRICES[TICKET_TYPES.CORPORATE],
                    );
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiPlus />
                </span>
              </div>
            </div>
          </div>
          {/* Student Registration____________________________________________ */}
          <div className="sm:flex gap-2 justify-between py-5 border-b-1 border-gray-300">
            <div>
              <h2 className="text-[18px] md:text-[22px] font-bold pb-1">
                Student Registration{" "}
                <span className="bg-pink-300 text-xs font-light px-2 py-1 rounded">
                  Venue and Online
                </span>
              </h2>
              <h5 className="text-[14px] md:text-[16px] font-semibold pb-2">
                Students currently enrolled in an academic institution.
              </h5>
              <p className="text-gray-500">
                Sales end on{" "}
                <span className="font-bold text-black">March 31, 2026</span>
              </p>
            </div>
            <div>
              <h2 className="font-bold pb-1">
                US ${TICKET_PRICES[TICKET_TYPES.STUDENT]}.00
              </h2>
              <div className="flex items-center justify-between border border-gray-300 rounded-md">
                <span
                  onClick={() => {
                    if (studentTicketsQuantity > 0) {
                      setStudentTicketsQuantity(studentTicketsQuantity - 1);
                      setStudentTicketsPrice(
                        studentTicketsPrice -
                          TICKET_PRICES[TICKET_TYPES.STUDENT],
                      );
                      setTotalParice(
                        totalPrice - TICKET_PRICES[TICKET_TYPES.STUDENT],
                      );
                    } else {
                      return;
                    }
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiMinus />
                </span>
                <input
                  className="text-center"
                  style={{ width: "40px", display: "flex" }}
                  value={studentTicketsQuantity}
                  type="text"
                  readOnly
                />
                <span
                  onClick={() => {
                    setStudentTicketsQuantity(studentTicketsQuantity + 1);
                    setStudentTicketsPrice(
                      studentTicketsPrice + TICKET_PRICES[TICKET_TYPES.STUDENT],
                    );
                    setTotalParice(
                      totalPrice + TICKET_PRICES[TICKET_TYPES.STUDENT],
                    );
                  }}
                  className="px-3 py-2 cursor-pointer"
                >
                  <FiPlus />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Tickets Order summary___________________________________________________ */}
        {/* ________________________________________________________________________ */}
        <div className="relative cols">
          {" "}
          {/* Add this wrapper */}
          <div className="bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]">
            <OrderSummaryComponents />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {lowTicketsQuantity +
          fullTicketsQuantity +
          corporateTicketsQuantity +
          studentTicketsQuantity >
        0 ? (
          <span
            onClick={() => {
              navigate("/attendees-info");
              setSteps(steps + 1);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            Continue
          </span>
        ) : (
          <button className="bg-blue-300 text-white font-bold py-2 px-4 rounded-lg">
            Continue
          </button>
        )}
      </div>
    </>
  );
};

export default TicketsComponents;
