import React from "react";
import CityCard from "../Components/CityCard/CityCard";
import { Link } from "react-router-dom";
import TripsCard from "../Components/TripsCard/TripsCard";
import { useState, useEffect } from "react";
import axios from "axios";
function TripsAdmin() {
  const [AllTrips, setAllTrips] = useState([]);
  // delete Link
  const onDeleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deletetrip/${id}`, {
        withCredentials: true,
      });
      const newTrips = AllTrips.filter((c) => c.TripID != id);
      setAllTrips(newTrips);
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Link END
  useEffect(() => {
    async function GetTrips() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/gettrips",
          {
            withCredentials: true,
          }
        );

        setAllTrips(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetTrips();
  }, []);
  console.log(AllTrips, "ALLTRIPS");
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">Trips</h3>
      <div>
        <Link to={"/tripadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new Trip
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
        {AllTrips.length > 0 ? (
          AllTrips.map((q, index) => (
            <TripsCard key={index} q={q} onDelete={onDeleteTrip} />
          ))
        ) : (
          <p>No Trips available</p>
        )}
      </div>
    </div>
  );
}

export default TripsAdmin;
