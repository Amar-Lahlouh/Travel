import React, { useState, useEffect } from "react";
import CityCard from "../Components/CityCard/CityCard";
import { Link } from "react-router-dom";
import axios from "axios";
import LocationAdminCard from "../Components/LocationAdminCard/LocationAdminCard";
import PathCard from "../Components/PathCard/PathCard";

function PathAdmin() {
  const [AllPath, setAllPath] = useState([]);
  useEffect(() => {
    async function GetPath() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getpaths",
          {
            withCredentials: true,
          }
        );
        setAllPath(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetPath();
  }, []);
  // delete Link
  const onDeletePath = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deletepath/${id}`, {
        withCredentials: true,
      });
      const newpaths = AllPath.filter((c) => c.PathID != id);
      setAllPath(newpaths);
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Link END
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">Path</h3>
      <div>
        <Link to={"/pathadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new Path
          </button>
        </Link>
      </div>
      <div className="flex justify-center align-middle">
        <input
          type="text"
          placeholder="Search By Name..."
          className="border-[1px] p-2 mt-4 rounded-lg outline-none"
        />
      </div>
      <div className="border-t-[2px] p-4 m-4">
        {AllPath.length > 0 ? (
          AllPath.map((h, index) => (
            <PathCard key={index} h={h} onDelete={onDeletePath} />
          ))
        ) : (
          <p>No Paths available</p>
        )}
      </div>
    </div>
  );
}

export default PathAdmin;
