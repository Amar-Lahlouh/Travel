import React from "react";
import { Link } from "react-router-dom";
import HighlightAdminCard from "../Components/HighlightAdminCard/HighlightAdminCard";
import { useState,useEffect } from "react";
import axios from "axios"
function HighlightsAdmin() {
  const [AllHighlights, setAllHighlights] = useState([]);
  useEffect(() => {
    async function GetHighlights() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/gethighlights",
          {
            withCredentials: true,
          }
        );
        console.log("res.data.data", res.data.data);
        setAllHighlights(res.data.data)
      } catch (err) {
        console.log(err);
      }
    }
    GetHighlights();
  }, []);
  console.log(AllHighlights)
  // delete Link
  const onDeleteHighlight = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deletehighlight/${id}`, {
        withCredentials: true,
      });
      const newHighlights = AllHighlights.filter((c) => c.HighlightID != id);
      setAllHighlights(newHighlights)
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Link END
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">
        Highlights
      </h3>
      <div>
        <Link to={"/highlightadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new Highlight
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
      {AllHighlights.length > 0 ? (
          AllHighlights.map((h, index) => (
            <HighlightAdminCard key={index} h={h} onDelete={onDeleteHighlight}  />
          ))
        ) : (
          <p>No Cities available</p>
        )}
      </div>
    </div>
  );
}

export default HighlightsAdmin;
