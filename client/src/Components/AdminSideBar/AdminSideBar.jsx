import {
  faAnglesLeft,
  faAnglesRight,
  faBars,
  faCity,
  faClose,
  faDiamond,
  faLandmark,
  faLocationCrosshairs,
  faMapLocationDot,
  faPersonSkiingNordic,
  faRoad,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSideBar() {
  const [sideBarClosed, setSideBarClosed] = React.useState(false);
  const [mobileView, setMobileView] = React.useState(window.innerWidth >= 768);
  const location1 = useLocation();
  const pathnameParts = location1.pathname.split("/");
  const c = pathnameParts.length >= 3 ? pathnameParts[2] : null;
  const handleSideBar = () => {
    setSideBarClosed(!sideBarClosed);
  };
  React.useEffect(() => {
    function autoClose() {
      if (window.innerWidth >= 768) setMobileView(false);
      else {
        setMobileView(true);
        setSideBarClosed(true);
      }
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
      path: `/admin`,
      name: "Profile",
      icon: () => <FontAwesomeIcon icon={faUser} fontSize={18} />,
    },
    {
      path: `/guides`,
      name: "GuideLines",
      icon: () => <FontAwesomeIcon icon={faUsers} fontSize={18} />,
    },

    {
      path: `/cities`,
      name: "Cities",
      icon: () => <FontAwesomeIcon icon={faCity} fontSize={18} />,
    },
    {
      path: `/highlights`,
      name: "Highlights",
      icon: () => <FontAwesomeIcon icon={faLandmark} fontSize={18} />,
    },
    {
      path: `/activities`,
      name: "Activities",
      icon: () => <FontAwesomeIcon icon={faPersonSkiingNordic} fontSize={18} />,
    },
    {
      path: `/trips`,
      name: "Trips",
      icon: () => <FontAwesomeIcon icon={faMapLocationDot} fontSize={18} />,
    },
    {
      path: `/locations`,
      name: "Locations",
      icon: () => <FontAwesomeIcon icon={faLocationCrosshairs} fontSize={18} />,
    },
    {
      path: `/path`,
      name: "Path of Trip",
      icon: () => <FontAwesomeIcon icon={faRoad} fontSize={18} />,
    },
  ];
  return (
    <div>
      <div className="sidebar-buttons flex flex-col gap-1 md:px-4 md:py-3 sticky top-0 md:h-[100vh] bg-white md:border-r-2 z-20">
        <div className="flex w-[100%] gap-3 items-center justify-center text-lg border-b-2 px-4 md:px-2 py-4 mb-1 bg-white">
          <FontAwesomeIcon icon={faDiamond} />
          {((!mobileView && !sideBarClosed) || mobileView) && "Dashboard"}
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
                key={i}
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

export default AdminSideBar;
