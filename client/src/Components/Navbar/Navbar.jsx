import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo1 from "../../assets/logo1.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

function Navbar() {
  const navLinks = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "about",
      path: "#about",
    },
    {
      label: "services",
      path: "#services",
    },
    {
      label: "places",
      path: "/places",
    },
    {
      label: "gallery",
      path: "#gallery",
    },
    { label: "Payment Method", path: "#payment" },
    {
      label: "contact us",
      path: "#contact",
    },
  ];
  const [userList, setUserList] = useState(false);
  const [isResponsive, setisReponsive] = useState(false);
  function handleResponsive() {
    setisReponsive(!isResponsive);
  }
  function openUserList() {
    setUserList(true);
  }
  function closeUserList() {
    setUserList(false);
  }
  const { currentUser, logout } = useContext(AuthContext);

  const userid = currentUser?.user?.UserID;
  return (
    <div
      className="flex justify-between items-center pe-4 gap-4 relative"
      onMouseLeave={closeUserList}
    >
      <div>
        <img src={logo1} alt="" width="80px" height="80px" />
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="nav-content">
          {navLinks.map((item, i) => {
            let classes =
              "text-gray-600 font-semibold capitalize px-1 hover:text-black text-md tracking-wider hover:tracking-widest";
            if (!item.path.startsWith("#"))
              return (
                <Link
                  key={i}
                  onClick={() => setisReponsive(false)}
                  to={item.path}
                  className={classes}
                >
                  {" "}
                  {item.label}{" "}
                </Link>
              );
            return (
              <a
                key={i}
                onClick={() => setisReponsive(false)}
                href={item.path}
                className={classes}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <p className="icon">
          <FontAwesomeIcon
            onClick={handleResponsive}
            icon={faBars}
            className="text-2xl"
          />
        </p>
        {currentUser ? (
          <div
            onMouseEnter={openUserList}
            className="user-icon border-[1px] bg-gray-200   rounded-full flex gap-3 px-3 py-1 hover:bg-gray-50 cursor-pointer aspect-square p-2"
          >
            {currentUser ? currentUser.user.Fname.charAt(0) : ""}
          </div>
        ) : (
          <Link
            to={"/login"}
            className="border-[2px] border-gray-500  rounded-lg font-semibold hover:bg-slate-300  mr-1 px-4 py-2   "
          >
            Login
          </Link>
        )}
      </div>
      {userList && (
        <div className="user-list flex flex-col absolute   z-50 top-[100%] right-1 border-[2px] rounded-lg  bg-gray-50 shadow-lg">
          <Link
            to={"/profile"}
            className="px-5 py-2    hover:bg-gray-200 border-b-[1px]"
          >
            profile
          </Link>
          <Link
            to={`/payment`}
            className="px-5 py-2 hover:bg-gray-200 border-b-[1px]"
          >
            Payment
          </Link>
          <Link
            to={"/mytrips"}
            className="px-5 py-2 hover:bg-gray-200 border-b-[1px]"
          >
            Trips
          </Link>

          <button
            className="px-5 py-2 bg-red-100 text-red-500 hover:bg-red-50 font-semibold"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {isResponsive && (
        <div className="flex flex-col responsive bg-gray-200 z-10">
          {navLinks.map((item, i) => {
            let classes =
              "text-gray-500 font-semibold capitalize p-3 hover:text-black hover:bg-gray-300";
            if (!item.path.startsWith("#"))
              return (
                <Link
                  key={i}
                  onClick={() => setisReponsive(false)}
                  to={item.path}
                  className={classes}
                >
                  {" "}
                  {item.label}{" "}
                </Link>
              );
            return (
              <a
                key={i}
                onClick={() => setisReponsive(false)}
                href={item.path}
                className={classes}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Navbar;
