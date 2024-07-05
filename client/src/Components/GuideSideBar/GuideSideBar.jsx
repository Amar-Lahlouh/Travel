import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  faAnglesLeft,
  faAnglesRight,
  faBars,
  faClose,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function GuideSideBar() {
  const [sideBarClosed, setSideBarClosed] = React.useState(false);
  const [mobileView, setMobileView] = React.useState(window.innerWidth >= 768);

  const handleSideBar = () => {
    setSideBarClosed(!sideBarClosed);
  };
  React.useEffect(() => {
    function autoClose() {
      if (window.innerWidth >= 768) setMobileView(false);
      else setMobileView(true);
    }
    autoClose();
    window.addEventListener("resize", autoClose);
    return () => window.removeEventListener("resize", autoClose);
  }, []);

  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  const sidebardata = [
    {
      path: "/guidelineprofile",
      name: "Profile",
      icon: () => <FontAwesomeIcon icon={faUser} fontSize={18} />,
    },
    {
      path: "/guidelinedetails",
      name: "You Trips",
      icon: () => <FontAwesomeIcon icon={faCalendarDays} fontSize={18} />,
    },
  ];
  return (
    <div>
      <div className="sidebar-buttons flex flex-col gap-1 md:px-4 md:py-3 sticky top-0 md:h-[100vh] bg-white md:border-r-2 z-20">
        <div className="flex w-[100%] gap-3 items-center justify-center text-lg border-b-2 px-4 md:px-2 py-4 mb-1 bg-white">
          <h3 className="italic text-xl">Welcome!</h3>
          {(!mobileView && !sideBarClosed) || mobileView}
          {mobileView && (
            <FontAwesomeIcon
              onClick={handleSideBar}
              className="ml-auto text-center px-4 py-2"
              icon={sideBarClosed ? faBars : faClose}
            />
          )}
        </div>

        {((mobileView && !sideBarClosed) || !mobileView) && (
          <div className="flex w-[100%] top-[100%] flex-col absolute md:static gap-2 px-2 py-2 shadow-md md:shadow-none bg-white">
            {sidebardata.map((i) => (
              <Link
                onClick={mobileView ? handleSideBar : undefined}
                to={i.path}
                className={`flex gap-4 items-center text-center px-6 py-3 rounded-md bg-white ${
                  i.path.includes(pathname) ? "bg-gray-300" : "hover:bg-[#eee]"
                }`}
              >
                <i.icon />
                {((!mobileView && !sideBarClosed) || mobileView) && i.name}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-auto hidden md:block border-t-2 pt-2">
          <div
            onClick={handleSideBar}
            className="text-center px-4 py-2 rounded-md hover:bg-[#eee]"
          >
            <FontAwesomeIcon
              icon={sideBarClosed ? faAnglesRight : faAnglesLeft}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideSideBar;
