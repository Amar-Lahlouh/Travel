import React, { useEffect, useState } from "react";
import { GuideCard } from "../Components";
import { Link } from "react-router-dom";
import axios from "axios";

function GuidesAdmin() {
  const [allGuides, setAllGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getAllGuides() {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/Guides", {
          withCredentials: true,
        });
        setAllGuides(res.data);
        setFilteredGuides(res.data); // Initialize filteredGuides with all guides
      } catch (err) {
        console.log(err);
      }
    }
    getAllGuides();
  }, []);

  const onDeleteGuide = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deleteguide/${id}`, {
        withCredentials: true,
      });
      // Filter out the deleted guide from the state
      setAllGuides(allGuides.filter((guide) => guide.id !== id));
      setFilteredGuides(filteredGuides.filter((guide) => guide.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100%] mr-2">
      <h3 className="text-center text-xl border-b-[1px] mb-5 w-[100%] p-4 flex justify-center align-middle shadow-md">
        GuideLines
      </h3>
      <div>
        <Link to={"/guideadminadd"} className=" flex justify-end">
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new GudeLine
          </button>
        </Link>
      </div>
      <div className="flex justify-center align-middle">
        <input
          type="text"
          placeholder="Search By Name..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-[1px] p-2 mt-4 rounded-lg outline-none"
        />
      </div>

      <div className="mt-5 border-t-[2px] p-4">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide, index) => (
            <GuideCard key={index} guide={guide} onDelete={onDeleteGuide} />
          ))
        ) : (
          <p>No Guides available</p>
        )}
      </div>
    </div>
  );
}

export default GuidesAdmin;
