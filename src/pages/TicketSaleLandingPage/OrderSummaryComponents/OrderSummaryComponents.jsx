import { useContext, useEffect, useState } from "react";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import { IoTicketOutline } from "react-icons/io5";
import {
  TAX_RATE,
  GROUP_DISCOUNT_RATE,
  COUPON_CODE,
  COUPON_DISCOUNT_AMOUNT,
  TICKET_PRICES,
  TICKET_TYPES,
} from "../../../utils/pricingConstants";

const OrderSummaryComponents = () => {
  const {
    steps,
    lowTicketsQuantity,
    fullTicketsQuantity,
    corporateTicketsQuantity,
    studentTicketsQuantity,
    lowTicketsPrice,
    fullTicketsPrice,
    corporateTicketsPrice,
    studentTicketsPrice,
    totalPrice,
    payAblePrice,
    setPayAblePrice,
    cuponCode,
    setCuponCode,
  } = useContext(TicketsDataContext);

  const [taxAmount, setTaxAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    let totalWithTaxForDiscountCondition;
    if (totalPrice > 0) {
      const withTax = totalPrice * TAX_RATE;
      setTaxAmount(withTax.toFixed(2));
      totalWithTaxForDiscountCondition = (withTax + totalPrice).toFixed(2);
      setPayAblePrice((totalPrice + withTax).toFixed(2));
      if (
        lowTicketsQuantity +
          fullTicketsQuantity +
          corporateTicketsQuantity +
          studentTicketsQuantity ===
        1
      ) {
        setDiscountAmount(0);
        setPayAblePrice((totalPrice + withTax).toFixed(2));
      }
    }
    if (
      lowTicketsQuantity +
        fullTicketsQuantity +
        corporateTicketsQuantity +
        studentTicketsQuantity >
      1
    ) {
      const discountPrice = (
        totalWithTaxForDiscountCondition * GROUP_DISCOUNT_RATE
      ).toFixed(2);
      setDiscountAmount(discountPrice);
      setPayAblePrice(
        (totalWithTaxForDiscountCondition - discountPrice).toFixed(2),
      );
    }
  }, [
    lowTicketsQuantity,
    fullTicketsQuantity,
    corporateTicketsQuantity,
    studentTicketsQuantity,
  ]);

  const [cuponErr, setCuponErr] = useState("");
  const [isCuponCodeTrue, setIsCuponCodeTrue] = useState(false);
  const [cuponDiscountAmount, setCuponDiscountAmount] = useState("");
  const cuponCodeHandle = () => {
    setCuponErr("");
    setIsCuponCodeTrue(false);
    if (payAblePrice > 0) {
      if (cuponCode) {
        if (cuponCode === COUPON_CODE) {
          setCuponDiscountAmount(COUPON_DISCOUNT_AMOUNT);
          const afterCupon = payAblePrice - COUPON_DISCOUNT_AMOUNT;
          setPayAblePrice(afterCupon);
          setIsCuponCodeTrue(true);
        } else {
          setCuponErr("Cupon code not match");
        }
      } else {
        setCuponErr("Please type cupon code");
      }
    } else {
      setCuponErr("Please select Ticket");
    }
  };

  return (
    <>
      <div className="pb-4">
        {steps === 3 && (
          <>
            <p className="text-xl pb-2">Promotional Code</p>
            <div className="flex justify-between items-center">
              <input
                type="text"
                onChange={(e) => setCuponCode(e.target.value)}
                className="focus:outline-none focus:ring-0 border border-gray-300 w-full h-9 rounded-tl-md rounded-bl-md px-2"
              />
              <span
                onClick={cuponCodeHandle}
                className="flex items-center font-bold text-white px-3 bg-[#1bb798] h-9 cursor-pointer rounded-tr-md rounded-br-md"
              >
                Apply
              </span>
            </div>
          </>
        )}
        {cuponErr && <p className="text-red-500">{cuponErr}</p>}
        {isCuponCodeTrue === true && (
          <p className="flex items-center gap-2 py-2">
            <span className="text-green-500 font-semibold">{cuponCode}</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md">
              Applied
            </span>
          </p>
        )}
      </div>
      {lowTicketsQuantity +
        fullTicketsQuantity +
        corporateTicketsQuantity +
        studentTicketsQuantity >
        0 && (
        <div className="flex justify-between items-center py-2 border-b-1 border-gray-300">
          <p className="font-semibold text-md pb-2">Ticket Details</p>
          <p className="font-semibold text-md pb-2">Price</p>
        </div>
      )}
      {lowTicketsQuantity +
        fullTicketsQuantity +
        corporateTicketsQuantity +
        studentTicketsQuantity ===
        0 && (
        <div className="flex flex-col justify-center items-center gap-5 py-10">
          <IoTicketOutline size={64} />
          <p>Please choose a ticket class to continue</p>
        </div>
      )}
      {lowTicketsQuantity > 0 && (
        <div className="flex justify-between py-2">
          <div>
            <h5 className="font-bold text-[12px] sm:text-[14px]">
              Low and Middle Income Countries
            </h5>
            <span className="font-bold text-[12px] sm:text-[14px]">
              {lowTicketsQuantity} x US${TICKET_PRICES[TICKET_TYPES.LOW_INCOME]}
              .00
            </span>
          </div>
          <p className="font-bold text-[14px] sm:text-[16px]">
            US${lowTicketsPrice}.00
          </p>
        </div>
      )}
      {fullTicketsQuantity > 0 && (
        <div className="flex justify-between py-2">
          <div>
            <h5 className="font-bold text-[12px] sm:text-[14px]">
              Full Conference Registration
            </h5>
            <span className="font-bold text-[12px] sm:text-[14px]">
              {fullTicketsQuantity} x US$
              {TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE]}.00
            </span>
          </div>
          <p className="font-bold text-[14px] sm:text-[16px]">
            US${fullTicketsPrice}.00
          </p>
        </div>
      )}
      {corporateTicketsQuantity > 0 && (
        <div className="flex justify-between py-2">
          <div>
            <h5 className="font-bold text-[12px] sm:text-[14px]">
              Corporate Attendees
            </h5>
            <span className="font-bold text-[12px] sm:text-[14px]">
              {corporateTicketsQuantity} x US$
              {TICKET_PRICES[TICKET_TYPES.CORPORATE]}.00
            </span>
          </div>
          <p className="font-bold text-[14px] sm:text-[16px]">
            US${corporateTicketsPrice}.00
          </p>
        </div>
      )}
      {studentTicketsQuantity > 0 && (
        <div className="flex justify-between py-2">
          <div>
            <h5 className="font-bold text-[12px] sm:text-[14px]">
              Student Registration
            </h5>
            <span className="font-bold text-[12px] sm:text-[14px]">
              {studentTicketsQuantity} x US$
              {TICKET_PRICES[TICKET_TYPES.STUDENT]}.00
            </span>
          </div>
          <p className="font-bold text-[14px] sm:text-[16px]">
            US${studentTicketsPrice}.00
          </p>
        </div>
      )}
      {totalPrice > 0 && (
        <div className="pt-4 border-t-1 border-gray-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">Actual Amount</p>
              <p className="text-sm">
                {lowTicketsQuantity +
                  fullTicketsQuantity +
                  corporateTicketsQuantity +
                  studentTicketsQuantity}{" "}
                Tickets
              </p>
            </div>
            <p className="font-bold ">US${totalPrice}.00</p>
          </div>
          <div className="flex flex-col gap-3 pt-3">
            <div className="flex items-center justify-between">
              <p className="">Harmonized Sales Tax (HST) ({TAX_RATE * 100}%)</p>
              <p className="">$ {taxAmount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Group Discount ({GROUP_DISCOUNT_RATE * 100}%)</p>
              <p className="">$ {discountAmount}</p>
            </div>
            {cuponDiscountAmount && (
              <div className="flex items-center justify-between">
                <p className="">Cupon Discount</p>
                <p className="">$ {cuponDiscountAmount}</p>
              </div>
            )}
            <div className="flex items-center justify-between border-t-1 border-gray-300 pt-2">
              <p className="font-semibold">Sub Total</p>
              <p className="font-semibold">US$ {payAblePrice}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummaryComponents;
