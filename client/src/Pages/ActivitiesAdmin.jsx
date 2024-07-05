import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import HighlightAdminCard from "../Components/HighlightAdminCard/HighlightAdminCard";
import ActivityAdminCard from "../Components/ActivityAdminCard/ActivityAdminCard";
import axios from "axios";
function ActivitiesAdmin() {
  const [AllActivities, setAllActivites] = useState([]);
  useEffect(() => {
    async function GetActivities() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getactivities",
          {
            withCredentials: true,
          }
        );
        console.log("res.data.data", res.data.data);
      setAllActivites(res.data.data)
      } catch (err) {
        console.log(err);
      }
    }
  GetActivities();
  }, []);
  // delete Link
  const onDeleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deleteactivity/${id}`, {
        withCredentials: true,
      });
      const newActivities = AllActivities.filter((c) => c.ActivityID != id);
      setAllActivites(newActivities)
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Link END
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">
        Activities
      </h3>
      <div>
        <Link to={"/activityadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new Activity
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
      <div className="border-t-[2px] mt-4 p-5">
      {AllActivities.length > 0 ? (
          AllActivities.map((h, index) => (
            <ActivityAdminCard key={index} h={h}    onDelete={onDeleteActivity}/>
          ))
        ) : (
          <p>No Cities available</p>
        )}
      </div>
    </div>
  );
}

export default ActivitiesAdmin;
