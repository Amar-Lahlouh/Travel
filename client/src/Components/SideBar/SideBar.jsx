import {
  faAnglesLeft,
  faAnglesRight,
  faBars,
  faCity,
  faClose,
  faCommentAlt,
  faHouse,
  faLandmark,
  faPersonSkiingNordic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
function SideBar() {
  const [sideBarClosed, setSideBarClosed] = React.useState(false);
  const [mobileView, setMobileView] = React.useState(window.innerWidth >= 768);
  console.log("sidebar");

  const location1 = useLocation();
  const pathnameParts = location1.pathname.split("/");
  const c = pathnameParts.length >= 3 ? pathnameParts[2] : null;
  console.log("C1", c);
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
      path: `/places/${c}`,
      name: "Home",
      icon: () => <FontAwesomeIcon icon={faHouse} fontSize={18} />,
    },
    {
      path: `/cityactivity/${c}`,
      name: "Activities",
      icon: () => <FontAwesomeIcon icon={faPersonSkiingNordic} fontSize={18} />,
    },
    {
      path: `/cityhighlights/${c}`,
      name: "Highlights",
      icon: () => <FontAwesomeIcon icon={faLandmark} fontSize={18} />,
    },
    {
      path: `/cityreviews/${c}`,
      name: "Reviews",
      icon: () => <FontAwesomeIcon icon={faCommentAlt} fontSize={18} />,
    },
  ];

  return (
    <div className="sidebar-buttons flex flex-col gap-1 md:px-4 md:py-3 sticky top-0 md:h-[100vh] bg-white md:border-r-2 z-20">
      <div className="flex w-[100%] gap-3 items-center justify-center text-lg border-b-2 px-4 md:px-2 py-4 mb-1 bg-white">
        <FontAwesomeIcon icon={faCity} />
        {((!mobileView && !sideBarClosed) || mobileView) && "City"}
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
  );
}

export default SideBar;
