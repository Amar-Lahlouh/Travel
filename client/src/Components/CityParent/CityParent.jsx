import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet, useParams } from "react-router-dom";

function CityParent() {
  return (
    <div className="flex gap-3 flex-col md:flex-row ">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default CityParent;
