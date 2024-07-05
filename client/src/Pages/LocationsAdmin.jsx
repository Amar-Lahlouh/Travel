import React, { useState, useEffect } from "react";
import CityCard from "../Components/CityCard/CityCard";
import { Link } from "react-router-dom";
import axios from "axios";
import LocationAdminCard from "../Components/LocationAdminCard/LocationAdminCard";

function LocationsAdmin() {
  const [AllLocations, setAllLocations] = useState([]);
  useEffect(() => {
    async function GetLocations() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getLocations",
          {
            withCredentials: true,
          }
        );
        console.log("res.data.data", res.data.data);
        setAllLocations(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetLocations();
  }, []);
  console.log(AllLocations);

  // delete Link
  const onDeleteActivity = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/deleteactivity/${id}`,
        {
          withCredentials: true,
        }
      );
      const newLocations = AllLocations.filter((c) => c.LocationID != id);
      setAllLocations(newLocations);
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Link END
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">
        Location
      </h3>
      <div>
        <Link to={"/locationadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new Location
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
        {AllLocations.length > 0 ? (
          AllLocations.map((h, index) => (
            <LocationAdminCard key={index} h={h} onDelete={onDeleteActivity} />
          ))
        ) : (
          <p>No Locations available</p>
        )}
      </div>
    </div>
  );
}

export default LocationsAdmin;
