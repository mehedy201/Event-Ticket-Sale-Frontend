import { CiCalendarDate } from "react-icons/ci";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { tailwindContainerClasses } from "../../utils/tailwindClasses";
import logo from "../../assets/logo.jpg";
import usePageTracking from "../../hooks/usePageTracking";

const Dashboard = () => {
  usePageTracking();
  const location = useLocation();
  const path = location.pathname;
  const isAttendees =
    path.startsWith("/dashboard/") && !path.includes("/purcher");
  const isPurcher = path.includes("/dashboard/purcher");

  return (
    <div>
      {/* Events Tittle_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div className="bg-blue-500 pt-20 pb-20">
        <div className={tailwindContainerClasses}>
          <div className="flex gap-4 items-center">
            <img
              className="rounded-lg"
              style={{ height: "100px", width: "auto" }}
              src={logo}
              alt="Mehedi"
            />
            <h1 className="text-[20px] md:text-[30px] font-bold text-white">
              Innovate, Empower, Thrive: Pioneering Solutions for Business,
              Health, and Climate Resilience at #InnovateEmpowerThrive2027
            </h1>
          </div>
          <div className="flex items-center gap-6 pt-3">
            <div className="flex items-center gap-1">
              <CiCalendarDate size={18} color="white" />
              <p className="text-white text-sm">April 19 to 21, 2027</p>
            </div>
            <div className="flex items-center gap-1">
              <LiaMapMarkerAltSolid size={18} color="white" />
              <p className="text-white text-sm">
                Palace Convention Centre - Centre de congrès Palace, Montreal,
                Canada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets buy Steps_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div style={{ marginTop: "-48px" }} className={tailwindContainerClasses}>
        <div className="bg-white mb-4 rounded-lg p-4">
          <h2 className="font-bold text-xl pb-3">Dashboard</h2>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/dashboard/1/10"
              className={isAttendees ? "active" : ""}
            >
              Attendees
            </NavLink>
            <NavLink
              to="/dashboard/purcher/1/10"
              className={isPurcher ? "active" : ""}
            >
              Purcher
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
