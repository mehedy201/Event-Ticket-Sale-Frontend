import { useContext, useEffect, useRef, useState } from "react";
import OrderSummaryComponents from "../OrderSummaryComponents/OrderSummaryComponents";
import { useNavigate } from "react-router-dom";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import axios from "axios";
import useAttendeesSpecificTicketTaxDiscountCalculate from "../../../hooks/useAttendeesSpecificTicketTaxDiscountCalculate";
import usePageTracking from "../../../hooks/usePageTracking";

const PaymentComponent = () => {
  usePageTracking();
  const {
    setSteps,
    // Quantity ________________________________________
    lowTicketsQuantity,
    setLowTicketsQuantity,
    fullTicketsQuantity,
    setFullTicketsQuantity,
    corporateTicketsQuantity,
    setCorporateTicketsQuantity,
    // Price ___________________________________________
    setLowTicketsPrice,
    setFullTicketsPrice,
    setCorporateTicketsPrice,
    setTotalParice,
    payAblePrice,
    setPayAblePrice,
    cuponCode,
    setCuponCode,
    // Purcher and Attendees Info Collect ______________
    purcherAttendeesInfo,
    setPurcherAttendeesInfo,
  } = useContext(TicketsDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity ==
      0
    )
      navigate("/");
    if (!purcherAttendeesInfo) {
      navigate("/");
      setSteps(1);
    }
  }, []);

  // const dropinInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [termsCondition, setTermsCondition] = useState(false);
  const handlePayment = async () => {
  console.log("🟡 [STEP A] handlePayment শুরু হয়েছে");

  console.log('purcherAttendeesInfo======',purcherAttendeesInfo)

  if (!termsCondition) {
    console.warn("⚠️ [STEP A] Terms accept করা হয়নি");
    setMessage("Terms and condition Required");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    /* ── STEP B: Moneris Script Check ── */
    console.log("🟡 [STEP B] window.monerisCheckout check করা হচ্ছে...");

    if (!window.monerisCheckout) {
      console.error("❌ [STEP B] window.monerisCheckout পাওয়া যাচ্ছে না");
      throw new Error("Moneris script load হয়নি");
    }

    console.log("✅ [STEP B] window.monerisCheckout পাওয়া গেছে");

    /* ── STEP C: BASE_URL ও MODE ── */
    const BASE_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://moneris-payment-backend-production.up.railway.app";

    const MONERIS_MODE =
      window.location.hostname === "localhost" ? "qa" : "prod";

    console.log("✅ [STEP C] BASE_URL:", BASE_URL || "relative (live)");
    console.log("✅ [STEP C] MONERIS_MODE:", MONERIS_MODE);

    /* ── STEP D: Preload Ticket ── */
    console.log("🟡 [STEP D] Preload ticket নেওয়া হচ্ছে...");

    const ticketResponse = await axios.get(
      `${BASE_URL}/api/v1/ThriveGlobalForum/preload-ticket`,
      {
        params: {
          lowTicketsQuantity,
          fullTicketsQuantity,
          corporateTicketsQuantity,
          cuponCode,
        },
      }
    );

    const { ticket, orderId, amount } = ticketResponse.data;

    if (!ticket) {
      console.error("❌ [STEP D] Ticket পাওয়া যায়নি");
      throw new Error("Ticket not received");
    }

    console.log("✅ [STEP D] Ticket:", ticket);
    console.log("✅ [STEP D] OrderId:", orderId);
    console.log("✅ [STEP D] Amount:", amount);

    /* ── STEP E: Checkout Div ── */
    let checkoutDiv = document.getElementById("monerisCheckout");
    if (!checkoutDiv) {
      checkoutDiv = document.createElement("div");
      checkoutDiv.id = "monerisCheckout";
      document.body.appendChild(checkoutDiv);
      console.log("✅ [STEP E] নতুন div তৈরি হয়েছে");
    } else {
      checkoutDiv.innerHTML = "";
      console.log("✅ [STEP E] পুরনো div clear হয়েছে");
    }

    /* ── STEP F: Moneris Initialize ── */
    console.log("🟡 [STEP F] Moneris initialize করা হচ্ছে...");

    const checkout = new window.monerisCheckout();
    checkout.setMode(MONERIS_MODE);
    checkout.setCheckoutDiv("monerisCheckout");

    console.log("✅ [STEP F] Mode:", MONERIS_MODE);

    /* ── STEP G: processVerification ──
    3DS on/off দুটোতেই এই function call হবে
    payment complete না হলে কিছুই হবে না
    ─────────────────────────────────── */
    const processVerification = async (parsedResponse) => {
      console.log("🟡 [PROCESS] processVerification শুরু হয়েছে");
      console.log("🟡 [PROCESS] parsedResponse:", parsedResponse);
      console.log("🟡 [PROCESS] ticket:", parsedResponse.ticket);
      console.log("🟡 [PROCESS] response_code:", parsedResponse.response_code);

      // ✅ Ticket নেই মানে payment হয়নি
      if (!parsedResponse.ticket) {
        console.error("❌ [PROCESS] Ticket নেই — payment হয়নি");
        setMessage("Payment failed — please try again");
        setLoading(false);
        return;
      }

      // ✅ Failed/Error response_code হলে বন্ধ করো
      if (
        parsedResponse.response_code === "failure" ||
        parsedResponse.response_code === "error"
      ) {
        console.error("❌ [PROCESS] Payment failed, code:", parsedResponse.response_code);
        setMessage("Payment declined — please try again");
        setLoading(false);
        return;
      }

      // ✅ Verify শুরু
      setLoading(true);
      setMessage("Verifying payment...");

      try {
        /* ── Attendees Data ── */
        console.log("🟡 [PROCESS] Attendees data তৈরি করা হচ্ছে...");

        const totalQuantity =
          Number(lowTicketsQuantity) +
          Number(fullTicketsQuantity) +
          Number(corporateTicketsQuantity);

        const updatedAttendees = purcherAttendeesInfo.attendees.map((att) => ({
          ...att,
          purcher: purcherAttendeesInfo.purcher,
          taxDiscountCupon: useAttendeesSpecificTicketTaxDiscountCalculate({
            data: {
              price: att.price,
              group: totalQuantity,
              cuponCode,
            },
          }),
        }));

        const purcherAttendeesData = {
          attendees: updatedAttendees,
          purcher: purcherAttendeesInfo.purcher,
        };

        console.log("✅ [PROCESS] Attendees data তৈরি হয়েছে");

        /* ── Verify API Call ── */
        console.log("🟡 [PROCESS] Verify API call করা হচ্ছে...");

        const verifyResponse = await axios.post(
          `${BASE_URL}/api/v1/ThriveGlobalForum/verify-payment`,
          {
            ticket: parsedResponse.ticket,
            orderId,
            lowTicketsQuantity,
            fullTicketsQuantity,
            corporateTicketsQuantity,
            cuponCode,
            purcherAttendeesData: purcherAttendeesInfo,
          }
        );

        console.log("✅ [PROCESS] Verify response:", verifyResponse.data);

        /* ── Verify success হলেই navigate ── */
        if (verifyResponse.data.success) {
          console.log("✅ [PROCESS] সফল! Resetting state and navigating...");
          // Reset ticket and purchaser state after successful payment
          setLowTicketsQuantity(0);
          setFullTicketsQuantity(0);
          setCorporateTicketsQuantity(0);
          setLowTicketsPrice(0);
          setFullTicketsPrice(0);
          setCorporateTicketsPrice(0);
          setTotalParice(0);
          setPayAblePrice(0);
          setCuponCode("");
          setPurcherAttendeesInfo("");
          setSteps(1);

          navigate(`/success/${verifyResponse.data.purcherID}`);
        } else {
          console.error("❌ [PROCESS] Verify failed:", verifyResponse.data);
          setMessage("Payment verification failed — please contact support");
          setLoading(false);
        }

      } catch (err) {
        console.error("❌ [PROCESS] Verify error:", err.response?.data || err.message);
        setMessage("Payment verification error — please contact support");
        setLoading(false);
      }
    };

    /* ── STEP H: Callbacks ── */
    console.log("🟡 [STEP H] Callbacks set করা হচ্ছে...");

    checkout.setCallback("page_loaded", (res) => {
      console.log("✅ [STEP H] Page load হয়েছে:", res);
      setLoading(false);
    });

    // ✅ 3DS OFF → payment_receipt এ verify
    checkout.setCallback("payment_receipt", async (response) => {
      console.log("✅ [STEP H] payment_receipt আসছে:", response);

      const parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;

      await processVerification(parsedResponse);
    });

    // ✅ 3DS ON → payment_complete এ verify
    checkout.setCallback("payment_complete", async (response) => {
      console.log("✅ [STEP H] payment_complete আসছে:", response);

      const parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;

      await processVerification(parsedResponse);
    });

    checkout.setCallback("cancel_transaction", () => {
      console.warn("⚠️ Payment cancel হয়েছে");
      setMessage("Payment cancelled");
      setLoading(false);
    });

    checkout.setCallback("error_event", (err) => {
      console.error("❌ Moneris error:", JSON.stringify(err, null, 2));
      setMessage("Payment error occurred");
      setLoading(false);
    });

    /* ── STEP I: startCheckout — সবার শেষে ── */
    console.log("🟡 [STEP I] startCheckout call হচ্ছে:", ticket);
    checkout.startCheckout(ticket);

  } catch (error) {
    console.error("❌ [ERROR] handlePayment error:", error.response?.data || error.message);
    setMessage("Failed to initialize payment");
    setLoading(false);
  }
};

  return (
    <>
      <div className="py-4 grid md:grid-cols-3 gap-4">
        <div className="cols md:col-span-2">
          {/* Payment____________________________________________________________ */}
          <OrderSummaryComponents />
          {/* <div id="monerisCheckout"></div> */}
        </div>
        {/* Tickets Order summary___________________________________________________ */}
        {/* ________________________________________________________________________ */}
        <div className="relative cols">
          <div className="bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]">
            {/* <OrderSummaryComponents /> */}
            <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow">
              <div id="monerisCheckout"></div>
              <h2 className="text-xl font-semibold mb-2">Secure Payment</h2>
              <div className="flex items-start gap-3">
                <input
                  style={{zoom: '1.3'}}
                  className="mt-[6px]"
                  onChange={(e) => {
                    setTermsCondition(e.target.checked);
                    if (e.target.checked === true) {
                      setMessage("");
                    }
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>
                  By registering, I agree to the terms and conditions.{" "}
                  <a
                    className="text-blue-700"
                    target="_blank"
                    href="https://thriveglobalforum.com/terms-and-conditions/"
                  >
                    Terms & conditions
                  </a>
                </p>
              </div>
              {message && (
                <p className="mt-4 text-sm text-red-700">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span
          onClick={() => {
            navigate("/attendees-info");
            setSteps(2);
          }}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          Previous
        </span>
        {/* <span
          onClick={handlePayment}
          disabled={loading || !dropinInstance.current || !termsCondition}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? `Processing...` : `Register`}
        </span> */}
        {
          termsCondition == true ? 
          <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button> 
        : 
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-blue-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        }
        {/* <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button> */}
      </div>
    </>
  );
};

export default PaymentComponent;
