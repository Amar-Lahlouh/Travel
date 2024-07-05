import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ParticipantsCard from "../Components/ParticipantsCard/ParticipantsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function UserPartipants() {
  const tripid = useParams().id;
  console.log("tripid is", tripid);
  const [UserParticipants, setUserParticipants] = useState([]);
  useEffect(() => {
    async function GetUsers() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/guide/getusers/${tripid}`,
          {
            withCredentials: true,
          }
        );
        setUserParticipants(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetUsers();
  }, []);
  console.log(UserParticipants, "Userpar");
  return (
    <div className="flex justify-center align-middle flex-col mx-auto w-[100%]">
      <h3 className="text-xl font-bold text-center  mb-[90px] mt-4 ">
        Trip Name: <span>Adventure</span>
      </h3>
      <div className="search-inputs flex justify-between align-middle w-[100%] mb-4 px-4 ">
        <Link to={"/guidelinedetails"}>
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>

        <input
          type="text"
          placeholder="Search by User Name..."
          className=" border-[1px]  rounded-lg px-4 py-1 w-[40%] mr-7"
        />
      </div>{" "}
      <div className="flex flex-col justify-center align-middle mx-10 mt-7">
        {UserParticipants.length > 0 ? (
          UserParticipants.map((UserParticipant, index) => (
            <ParticipantsCard key={index} UserParticipant={UserParticipant} />
          ))
        ) : (
          <p>No Users available</p>
        )}
      </div>
    </div>
  );
}

export default UserPartipants;
