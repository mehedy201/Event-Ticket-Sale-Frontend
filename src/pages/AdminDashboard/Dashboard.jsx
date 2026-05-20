import { CiCalendarDate } from "react-icons/ci";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { tailwindContainerClasses } from "../../utils/tailwindClasses";
import logo from "../../assets/logo.jpg";
import usePageTracking from "../../hooks/usePageTracking";
import auth from '../../../firebase.config';
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";


const Dashboard = () => {
  usePageTracking();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isAttendees =
    path.startsWith("/dashboard/") && !path.includes("/purcher");
  const isPurcher = path.includes("/dashboard/purcher");

  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) navigate("/log-in");
  };

  if(loading){
    return <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>  
  }

  return (
    <div>
      {/* Events Tittle_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div className="bg-[#1bb798] pt-20 pb-20">
        <div className={tailwindContainerClasses}>
          <div className="flex gap-4 items-center">
            <img
              className="rounded-lg"
              style={{ height: "100px", width: "auto" }}
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
              <p className="text-white text-sm">
                Apr 19 – 21, 2027 || 09:00 AM
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LiaMapMarkerAltSolid size={18} color="white" />
              <p className="text-white text-sm">Laval, Québec - Canada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets buy Steps_______________________________________________________ */}
      {/* ________________________________________________________________________ */}
      <div style={{ marginTop: "-48px" }} className={tailwindContainerClasses}>
        <div className="bg-white mb-4 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl pb-3">Dashboard</h2>
            {
              user &&
              <button className="border p-2 rounded-lg cursor-pointer" onClick={handleSignOut}>Log Out</button>
            }
          </div>
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
