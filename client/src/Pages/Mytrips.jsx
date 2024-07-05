import React, { useContext, useEffect } from "react";
import UserTripCard from "../Components/UserTripCard/UserTripCard";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { useState } from "react";
import TripCard from "../Components/TripCard/TripCard";
import TripCardGuideline from "../Components/TripCardGuideline/TripCardGuideline";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Mytrips() {
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
    <div>
      <h2 className="font-bold trips-title pt-5 text-gray-600 text-center text-4xl mb-8 font-serif">
        My Trips
      </h2>
      <Link to={"/"} className="px-5 absolute left-1">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <p className="mb-9 flex flex-start mt-5">
        {" "}
        <Link
          to={"/expiredtrips"}
          className="border-[1px]  bg-slate-200  absolute right-5 top-[40%] mb-9  rounded-lg p-4"
        >
          Expired Trip
        </Link>
      </p>
      <div className="mt-[60px] px-9">
        {" "}
        {MyTrips.length > 0 ? (
          MyTrips.map((trip, index) => <UserTripCard key={index} trip={trip} />)
        ) : (
          <p className="text-center text-2xl flex justify-center ">
            No trips available
          </p>
        )}
      </div>
    </div>
  );
}

export default Mytrips;
