import { useEffect, useContext } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import OrderSummaryComponents from "../OrderSummaryComponents/OrderSummaryComponents";
import { useNavigate } from "react-router-dom";
import { getNames } from "country-list";
import usePageTracking from "../../../hooks/usePageTracking";
import { TICKET_PRICES, TICKET_TYPES } from "../../../utils/pricingConstants";

const TicketAttendeeBlock = ({ type, attendeeIndex }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const visaWatch = watch(`attendees.${attendeeIndex}.requireVisa`);
  const countryNames = getNames();

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <h5 className="text-base font-semibold mb-3 capitalize">
          Ticket - Attendee #{attendeeIndex + 1}
        </h5>
        {type == "Low and Middle Income Countries" && (
          <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#fc5e5e]">
            {type}
          </span>
        )}
        {type == "Full Conference Registration" && (
          <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#fa6b92]">
            {type}
          </span>
        )}
        {type == "Corporate" && (
          <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#19ca78]">
            {type}
          </span>
        )}
        {/* <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-blue-500">{type}</span> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name/Prénom <span className="text-red-500">*</span>
          </label>
          <input
            {...register(`attendees.${attendeeIndex}.firstName`, {
              required: "Required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
          {errors.attendees?.[attendeeIndex]?.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendees[attendeeIndex].firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name/Nom <span className="text-red-500">*</span>
          </label>
          <input
            {...register(`attendees.${attendeeIndex}.lastName`, {
              required: "Required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
          {errors.attendees?.[attendeeIndex]?.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendees[attendeeIndex].lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register(`attendees.${attendeeIndex}.email`, {
              required: "Required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
          {errors.attendees?.[attendeeIndex]?.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendees[attendeeIndex].email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name/Nom de l'organisation
          </label>
          <input
            {...register(`attendees.${attendeeIndex}.organizationName`)}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <PhoneInput
          // country={"us"}
          value={watch(`attendees.${attendeeIndex}.phone`)}
          onChange={(value) =>
            setValue(`attendees.${attendeeIndex}.phone`, value)
          }
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you require a visa letter of invitation? / Avez-vous besoin d'une
          lettre d'invitation pour un visa?
          <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-6 py-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="NO"
              // defaultChecked
              {...register(`attendees.${attendeeIndex}.requireVisa`, {
                required: "Required",
              })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">No / Non</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              value="YES"
              {...register(`attendees.${attendeeIndex}.requireVisa`, {
                required: "Required",
              })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Yes / Oui</span>
          </label>
          {errors.attendees?.[attendeeIndex]?.requireVisa && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendees[attendeeIndex].requireVisa.message}
            </p>
          )}
        </div>
      </div>

      {visaWatch === "YES" && (
        <div className="grid grid-cols-1 gap-y-3 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Number/Numéro de passeport{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register(`attendees.${attendeeIndex}.passportNumber`, {
                required: "Required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            />
            {errors.attendees?.[attendeeIndex]?.passportNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendees[attendeeIndex].passportNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport expiry date/Date d'expiration du passeport{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register(`attendees.${attendeeIndex}.passportExpiry`, {
                required: "Required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            />
            {errors.attendees?.[attendeeIndex]?.passportExpiry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendees[attendeeIndex].passportExpiry.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country of passport/Pays du passeport{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              {...register(`attendees.${attendeeIndex}.countryOfPassport`, {
                required: "Required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            >
              <option value="">-- Select Country --</option>
              {countryNames.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.attendees?.[attendeeIndex]?.countryOfPassport && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendees[attendeeIndex].countryOfPassport.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Please indicate if you have any dietary restrictions/Veuillez indiquer
          si vous avez des restrictions alimentaires.{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          {...register(`attendees.${attendeeIndex}.restrictions`, {
            required: "Required",
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
        />
        {errors.attendees?.[attendeeIndex]?.restrictions && (
          <p className="text-red-500 text-xs mt-1">
            {errors.attendees[attendeeIndex].restrictions.message}
          </p>
        )}
      </div>
    </div>
  );
};

const AttendeesInfoComponent = () => {
  usePageTracking();
  const {
    steps,
    setSteps,
    lowTicketsQuantity,
    fullTicketsQuantity,
    corporateTicketsQuantity,
    purcherAttendeesInfo,
    setPurcherAttendeesInfo,
    cuponCode,
    setCuponCode,
  } = useContext(TicketsDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (cuponCode) setCuponCode("");
    if (
      lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity ===
      0
    ) {
      navigate("/");
      setSteps(1);
    }
  }, []);

  const methods = useForm({
    defaultValues: purcherAttendeesInfo || {
      purcher: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      attendees: [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("purcherAttendeesInfo=====", data);
    setPurcherAttendeesInfo(data);
    setSteps(3);
    navigate("/payments");
  };

  const ticketTypesAndCounts = [
    {
      type: TICKET_TYPES.LOW_INCOME,
      count: lowTicketsQuantity,
      price: TICKET_PRICES[TICKET_TYPES.LOW_INCOME],
    },
    {
      type: TICKET_TYPES.FULL_CONFERENCE,
      count: fullTicketsQuantity,
      price: TICKET_PRICES[TICKET_TYPES.FULL_CONFERENCE],
    },
    {
      type: TICKET_TYPES.CORPORATE,
      count: corporateTicketsQuantity,
      price: TICKET_PRICES[TICKET_TYPES.CORPORATE],
    },
  ];

  useEffect(() => {
    const totalTickets = ticketTypesAndCounts.reduce(
      (acc, t) => acc + t.count,
      0,
    );
    const currentAttendees = watch("attendees") || [];

    if (currentAttendees.length !== totalTickets) {
      let newAttendees = [];

      ticketTypesAndCounts.forEach(({ type, count }) => {
        const existingForType = currentAttendees.filter(
          (a) => a.ticketsType === type,
        );
        for (let i = 0; i < count; i++) {
          newAttendees.push(
            existingForType[i] || {
              ticketsType: type,
              price: ticketTypesAndCounts.find((t) => t.type === type).price,
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              organizationName: "",
              restrictions: "",
              requireVisa: "",
              passportNumber: "",
              passportExpiry: "",
              countryOfPassport: "",
            },
          );
        }
      });

      methods.setValue("attendees", newAttendees);
    }
  }, [lowTicketsQuantity, fullTicketsQuantity, corporateTicketsQuantity]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="max-w-4xl mx-auto p-4">
              {/* Purcher Info */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Purcher Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name/Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("purcher.firstName", {
                        required: "Required",
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    {errors.purcher?.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.purcher.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name/Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("purcher.lastName", {
                        required: "Required",
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    {errors.purcher?.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.purcher.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("purcher.email", { required: "Required" })}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    {errors.purcher?.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.purcher.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <PhoneInput
                      // country={"us"}
                      value={watch("purcher.phone")}
                      onChange={(value) => setValue("purcher.phone", value)}
                    />
                  </div>
                </div>
              </div>

              {/* Attendees */}
              <h2 className="text-xl font-semibold mb-4">Attendees</h2>
              {watch("attendees")?.map((_, index) => (
                <TicketAttendeeBlock
                  key={index}
                  attendeeIndex={index}
                  type={watch(`attendees.${index}.ticketsType`)}
                />
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="relative">
            <div className="bg-slate-100 p-4 rounded-md sticky top-4 h-fit">
              <OrderSummaryComponents />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              setSteps(steps - 1);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AttendeesInfoComponent;
