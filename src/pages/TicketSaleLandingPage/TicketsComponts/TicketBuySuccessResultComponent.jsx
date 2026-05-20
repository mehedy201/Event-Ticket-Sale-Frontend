import { FaCircleCheck } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";
import usePageTracking from "../../../hooks/usePageTracking";
import { TAX_RATE, GROUP_DISCOUNT_RATE } from "../../../utils/pricingConstants";

const TicketBuySuccessResultComponent = () => {
  usePageTracking();
  const navigate = useNavigate();
  const { data } = useLoaderData();

  return (
    <div>
      {data ? (
        <div>
          <div className="flex flex-col justify-center items-center py-8 gap-2">
            <FaCircleCheck className="text-green-500" size={36} />
            <h2 className="text-center text-lg font-semibold">Success</h2>
            <p className="text-center">
              Transaction ID: {data?.data?.transactionID}
            </p>
          </div>
          <div className="p-4 max-w-[800px] mx-auto">
            <div className="flex justify-between items-center py-2 border-b-1 border-gray-300">
              <p className="font-semibold text-md pb-2">Ticket Details</p>
              <p className="font-semibold text-md pb-2">Price</p>
            </div>
            {data?.data?.lowTicketsQuantity > 0 && (
              <div className="flex justify-between py-2">
                <div>
                  <h5 className="font-bold text-[12px] sm:text-[14px]">
                    Low and Middle Income Countries
                  </h5>
                  <span className="font-bold text-[12px] sm:text-[14px]">
                    {data?.data?.lowTicketsQuantity} x US$440.00
                  </span>
                </div>
                <p className="font-bold text-[14px] sm:text-[16px]">
                  US$440.00
                </p>
              </div>
            )}
            {data?.data?.fullTicketsQuantity > 0 && (
              <div className="flex justify-between py-2">
                <div>
                  <h5 className="font-bold text-[12px] sm:text-[14px]">
                    Full Conference Registration
                  </h5>
                  <span className="font-bold text-[12px] sm:text-[14px]">
                    {data?.data?.fullTicketsQuantity} x US$500.00
                  </span>
                </div>
                <p className="font-bold text-[14px] sm:text-[16px]">
                  US$500.00
                </p>
              </div>
            )}
            {data?.data?.corporateTicketsQuantity > 0 && (
              <div className="flex justify-between py-2">
                <div>
                  <h5 className="font-bold text-[12px] sm:text-[14px]">
                    Corporate Attendees
                  </h5>
                  <span className="font-bold text-[12px] sm:text-[14px]">
                    {data?.data?.corporateTicketsQuantity} x US$550.00
                  </span>
                </div>
                <p className="font-bold text-[14px] sm:text-[16px]">
                  US$550.00
                </p>
              </div>
            )}

            <div className="pt-4 border-t-1 border-gray-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Actual Amount</p>
                  <p className="text-sm">
                    {data?.data?.lowTicketsQuantity +
                      data?.data?.fullTicketsQuantity +
                      data?.data?.corporateTicketsQuantity}{" "}
                    Tickets
                  </p>
                </div>
                <p className="font-bold ">US${data?.data?.totalPrice}</p>
              </div>
              <div className="flex flex-col gap-3 pt-3">
                <div className="flex items-center justify-between">
                  <p className="">
                    Harmonized Sales Tax (HST) ({TAX_RATE * 100}%)
                  </p>
                  <p className="">$ {data?.data?.taxAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">
                    Group Discount ({GROUP_DISCOUNT_RATE * 100}%)
                  </p>
                  <p className="">$ {data?.data?.groupDiscount}</p>
                </div>
                {data?.data?.couponDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="">Cupon Discount</p>
                    <p className="">$ {data?.data?.couponDiscount}</p>
                  </div>
                )}
                <div className="flex items-center justify-between border-t-1 border-gray-300 pt-2">
                  <p className="font-semibold">Sub Total</p>
                  <p className="font-semibold">US$ {data?.data?.finalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 max-w-[1000px] mx-auto">
            <h3 className="text-xl font-bold">Download Attendees Tickets</h3>
            {data &&
              data?.data?.attendees.map((att, index) => (
                <div
                  key={index}
                  className="py-3 shadow rounded-md flex justify-between border-b-1 border-gray-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {att?.firstName} {att?.lastName}
                    </h3>
                    <p>{att?.ticketsType}</p>
                  </div>
                  <a
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                    href={`https://moneris-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/download-attendees-tickets/${att._id}`}
                  >
                    Download Invoice
                  </a>
                </div>
              ))}
          </div>
          <div className="py-4">
            <p className="text-green-600">
              Thank you! Your registration was received. Your payment invoice
              has been emailed to you. If you require a visa letter of
              invitation, it will be emailed to you within three business days
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center py-8">
            <a
              className="bg-green-500 px-4 py-2 rounded-md text-white font-bold cursor-pointer hover:text-white"
              href="https://iccpc.ca/"
              target="_blank"
            >
              Back to Site
            </a>
            <button
              onClick={() => navigate("/")}
              className="bg-green-500 px-4 py-2 rounded-md text-white font-bold cursor-pointer"
            >
              Purches new Tickets
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-centr justify-center">
          <p>Data Not Found</p>
        </div>
      )}
    </div>
  );
};

export default TicketBuySuccessResultComponent;
