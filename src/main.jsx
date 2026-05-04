import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import TicketSaleLandingPage from "./pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx";
import LoadingComponents from "./Components/LoadingComponents.jsx";
import TicketsComponents from "./pages/TicketSaleLandingPage/TicketsComponts/TicketsComponents.jsx";
import axios from "axios";
import Dashboard from "./pages/AdminDashboard/Dashboard.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import ProtectRoute from "./pages/ProtectRoute/ProtectRoute.jsx";
import AttendeesInfoComponent from "./pages/TicketSaleLandingPage/TicketsComponts/AttendeesInfoComponent.jsx";
import PaymentComponent from "./pages/TicketSaleLandingPage/TicketsComponts/PaymentComponent.jsx";
import TicketBuySuccessResultComponent from "./pages/TicketSaleLandingPage/TicketsComponts/TicketBuySuccessResultComponent.jsx";
import TagManager from "react-gtm-module";
// Admin Route Component _____
const Attendees = React.lazy(
  () => import("./pages/AdminDashboard/Attendees/Attendees.jsx"),
);
const Purcher = React.lazy(
  () => import("./pages/AdminDashboard/Purcher/Purcher.jsx"),
);

let router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSaleLandingPage />,
    children: [
      {
        index: true,
        element: <TicketsComponents />,
      },
      {
        path: "/attendees-info",
        element: <AttendeesInfoComponent />,
      },
      {
        path: "/payments",
        element: <PaymentComponent />,
      },
      {
        path: "/success/:id",
        loader: ({ params }) =>
          axios.get(
            `http://localhost:5000/api/v1/ThriveGlobalForum/purcher/${params.id}`,
          ),
        element: <TicketBuySuccessResultComponent />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: ":page/:limit",
        element: (
          <Suspense fallback={<LoadingComponents />}>
            {/* <ProtectRoute> */}
              <Attendees />
            {/* </ProtectRoute> */}
          </Suspense>
        ),
      },
      {
        path: "purcher/:page/:limit",
        element: (
          <Suspense fallback={<LoadingComponents />}>
            {/* <ProtectRoute> */}
              <Purcher />
            {/* </ProtectRoute> */}
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
]);

// ✅ Initialize GTM
const tagManagerArgs = {
  gtmId: import.meta.env.VITE_GTM_ID,
};

TagManager.initialize(tagManagerArgs); // Initialize once at the start

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
