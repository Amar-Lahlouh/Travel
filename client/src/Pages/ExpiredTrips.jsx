import React, { useContext, useEffect } from "react";
import UserTripCard from "../Components/UserTripCard/UserTripCard";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { useState } from "react";
import TripCard from "../Components/TripCard/TripCard";
import TripCardGuideline from "../Components/TripCardGuideline/TripCardGuideline";
import { Link } from "react-router-dom";
import UserTripExpiredCard from "../Components/UserTripExpiredCard/UserTripExpiredCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function ExpiredTrips() {
  const { currentUser } = useContext(AuthContext);
  const [MyTrips, setMyTrips] = useState([]);
  const userid = currentUser?.user?.UserID;

  useEffect(() => {
    async function GetMyTrips() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/trips/getmytrips`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setMyTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetMyTrips();
  }, []);

  return (
    <>
      <h3 className=" pay text-center text-red-900 text-2xl pt-5 font-serif font-bold mb-[70px]">
        Expired Trips
      </h3>
      <Link to={"/mytrips"} className="mb-9 flex flex-start mt-5 px-3">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div>
        {MyTrips.length > 0 ? (
          MyTrips.map((trip, index) => (
            <UserTripExpiredCard key={index} trip={trip} />
          ))
        ) : (
          <p className="text-center text-2xl font-bold">No trips available</p>
        )}
      </div>
    </>
  );
}

export default ExpiredTrips;
