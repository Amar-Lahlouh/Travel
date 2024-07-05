import {
  faArrowLeft,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FriendsCard from "../Components/FriendsCard/FriendsCard";

function FriendsInTrip() {
  const tripid = useParams().id;
  console.log("friend trip id", tripid);
  const [Friends, setFriends] = useState([]);
  useEffect(() => {
    async function GetFriends() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/trips/friends/${tripid}`,
          {
            withCredentials: true,
          }
        );
        setFriends(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetFriends();
  }, []);
  console.log("frineds", Friends);
  return (
    <div>
      <h3 className=" pay text-center text-2xl pt-5 font-serif font-bold mb-[70px]">
        Your Friends
      </h3>
      <Link to={"/mytrips"} className="px-5 absolute left-1 top-[20%]">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className="mt-4">
        {Friends.length > 0 ? (
          Friends.map((t, index) => <FriendsCard key={index} t={t} />)
        ) : (
          <p>No Friends available</p>
        )}{" "}
      </div>
    </div>
  );
}

export default FriendsInTrip;
