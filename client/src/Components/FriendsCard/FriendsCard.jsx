import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import f1 from "../../../public/profile.jpeg";
function FriendsCard({ t: { fullName, Phonee, Nationality } }) {
  return (
    <div className="flex flex-col justify-center rounded-md   shadow-lg align-middle mt-2 mx-7 max-h-[120px]">
      <div className="border-2 px-8 py-2 rounded-lg shadow-lg ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={f1}
              alt="Friend's Avatar"
              className="rounded-full w-[60px] shadow-sm"
            />
            <p className="font-bold text-lg pb-1 text-gray-700 border-b-[2px] border-black">
              {fullName}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <h3 className="text-md text-gray-600">
              <span className="font-bold text-gray-700">Nationality:</span>
              <span className="px-1 italic text-gray-500">{Nationality}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsCard;
