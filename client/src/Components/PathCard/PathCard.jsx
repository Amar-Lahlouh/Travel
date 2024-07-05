import React from "react";
import pro from "../../../public/profile.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function PathCard({ h: { PathID, PathName }, onDelete }) {
  const handleDelete = () => {
    onDelete(PathID);
  };
  return (
    <div className="guideline-card flex flex-wrap  mb-2  pb-2 lg:flex-nowrap mt-2 px-7 justify-between align-middle shadow-lg rounded-md my-4">
      <div className="guide_details flex gap-4 p-3">
        <div>
          <h3 className="border-b-2 border-black p-2 text-xl font-bold">
            {PathName}
          </h3>
        </div>
      </div>
      <div className="guide-buttons mt-5">
        {" "}
        <button
          onClick={handleDelete}
          className="bg-red-100 border-gray-600 p-2 mx-1 rounded-lg  hover:bg-red-200"
        >
          Delete
        </button>
        <Link>
          <button className="border-[1px] border-gray-600 p-2 mx-1 rounded-lg  hover:bg-gray-300">
            Update
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PathCard;
