import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import l2 from "../../assets/l2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function TripCardGuideline({
  trip: {
    TripID,
    TripName,
    Trip_Image,
    Details,
    Date_of_Trip,
    Start_Hour,
    End_Hour,

    Location,
    Total_Price,
    Nbr_of_Seats,
    NumPeople_In_it,
  },
}) {
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const currentDate = new Date();
    const tripDate = new Date(Date_of_Trip);
    // setIsExpired(currentDate > tripDate);
    if (currentDate > tripDate && !isExpired) {
      setIsExpired(true);
    }
  }, [Date_of_Trip, isExpired]);
  return (
    !isExpired && (
      <div className="flex  md:flex-row flex-col mx-9  mb-3 border-[1px] gap-6 pb-3  pt-4 sm:px-7 bg-slate-50 ">
        <div className="max-w-[350px]">
          <img src={`../../${Trip_Image}`} alt="" className=" p-2" />
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-7">
          {" "}
          <div className="trip-details-first flex flex-col px-4 gap-4">
            <h2>
              {" "}
              <span className="font-bold">Trip Name: {TripName} </span>
            </h2>
            <p className="max-w-[150px]">{Details}</p>
            <p>
              <span className="font-bold">Date: </span>
              {Date_of_Trip.split("T")[0]}
            </p>
            <div className="flex gap-3">
              {" "}
              <p>
                {" "}
                <Link to={`/singletrip/${TripID}/${TripName}`}>
                  <button className="bg-green-50 p-2 rounded-xl border-[1px]">
                    More Details
                  </button>
                </Link>
              </p>
              <p>
                {" "}
                <Link to={`/userparticipants/${TripID}`}>
                  <button className="bg-green-50 p-2 rounded-xl border-[1px]">
                    Check Users
                  </button>
                </Link>
              </p>
              <p> </p>
            </div>
          </div>
          <div className="trip-details-second flex px-4  flex-col gap-4">
            <p>
              {" "}
              <span className="font-bold">Exact Time: </span> {Start_Hour} to{" "}
              {End_Hour}
            </p>
            <p>
              {" "}
              <span className="font-bold">Location: </span> {Location}
            </p>

            <p className="flex">
              <FontAwesomeIcon icon={faUser} />
              <span className="font-bold">Number of Seats: </span>{" "}
              <span>{Nbr_of_Seats}</span>
            </p>
            <p>
              {" "}
              <span className="font-bold">Price per person: </span>
              {Total_Price}$
            </p>
            <p>
              Number of People in it <span>{NumPeople_In_it}</span>
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default TripCardGuideline;
