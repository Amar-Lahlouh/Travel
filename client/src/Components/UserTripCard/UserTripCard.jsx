import l2 from "../../assets/gallery2.jpg";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
function UserTripCard({
  trip: {
    nb_of_People_with,
    Point_of_meeting,
    tripDetails,
    TripID,
    guidelines,
    Total_Payment,
  },
}) {
  const d = tripDetails.Date_of_Trip;
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const currentDate = new Date();
    const tripDate = new Date(tripDetails.Date_of_Trip);
    console.log("tripdate", tripDate);
    console.log("currentdate", currentDate);
    // setIsExpired(currentDate > tripDate);
    if (currentDate > tripDate && !isExpired) {
      setIsExpired(true);
    }
  }, [tripDetails.Date_of_Trip, isExpired]);
  console.log(isExpired);

  async function WRITEEXPIRE() {
    try {
      console.log("start expire");
      const res = await axios.put(
        `http://localhost:3000/api/trips/upexpire/${tripDetails.TripID}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("end");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (isExpired) {
      console.log("goo");
      WRITEEXPIRE();
    }
  }, [isExpired, tripDetails.Date_of_Trip]);
  console.log(tripDetails, "TRIP");
  return (
    !isExpired && (
      <div className="flex flex-col w-fit max-w-[900px]  mx-auto mb-4 border rounded-lg shadow-md p-2 bg-gray-100 ">
        {" "}
        <div className="flex  lg:flex-row flex-col gap-5">
          {" "}
          <div className="lg:block hidden">
            <img
              src={`../../${tripDetails.Trip_Image}`}
              alt=""
              className="p-2 w-full max-h-[200px] "
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <div className=" flex flex-col justify-between gap-7">
              <div className="trip-details-first flex lg:flex-row flex-col px-4 gap-4">
                {tripDetails && (
                  <h2>
                    <span className="font-bold">
                      Trip Name:{" "}
                      <input
                        type="text"
                        className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                        disabled
                        value={tripDetails.TripName}
                      />{" "}
                    </span>
                  </h2>
                )}

                <p>
                  <span className="font-bold">Date: </span>
                  <input
                    className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                    disabled
                    value={new Date(d).toLocaleDateString()}
                  />
                </p>
                {tripDetails && (
                  <>
                    <p>
                      <span className="font-bold">Exact Time: </span>
                      <input
                        className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                        disabled
                        value={`${tripDetails.Start_Hour} to ${tripDetails.End_Hour}`}
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="trip-details-second flex lg:flex-row flex-col  px-4  gap-4">
              {" "}
              <p>
                <span className="font-bold">Total Payment </span>

                <input
                  className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                  disabled
                  value={Total_Payment}
                />
              </p>
              <p className="flex">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                {/* <span className="font-bold">
                  Number of Peopl with you:{" "}
                </span>{" "}
                <input
                  className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                  disabled
                  value={nb_of_People_with}
                /> */}
              </p>{" "}
              {/* {tripDetails &&  */}{" "}
              {/* <p>
               Number of Seats <span>{tripDetails.Nbr_of_Seats}</span>
              
            </p> */}
              {/* } */}
              {tripDetails && (
                <p>
                  <span className="font-bold">Price per person: </span>
                  <input
                    className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                    disabled
                    value={tripDetails.Total_Price}
                  />
                </p>
              )}
              {tripDetails && (
                <p>
                  <span className="font-bold">Location: </span>{" "}
                  <input
                    className="border-[1px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md"
                    disabled
                    value={tripDetails.Point_of_meeting}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <fieldset className="border-[1px]">
            <legend> Join Our Website Group</legend>
            {tripDetails && (
              <p className="flex gap-5 align-middle py-2 px-1">
                {" "}
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="2x"
                  className="text-green-500"
                />
                <a
                  href={`${tripDetails.whatsapp}`}
                  className="text-blue-500 border-b-[2px] border-b-blue-500"
                >
                  Click Here
                </a>
              </p>
            )}
          </fieldset>
        </div>
        <fieldset className="border-[1px] mt-6 bg-slate-50 flex flex-col  align-middle justify-center gap-3">
          <legend className="font-bold text-xl">GuideLine Details</legend>
          {guidelines &&
            guidelines.map((g) => {
              return (
                <div className="bg-slate-50 flex lg:flex-row flex-col justify-center align-middle px-4 py-2 shadow-xl  mb-3  w-fit rounded-md border-[1px] mt-2 mx-2">
                  <p className=" px-2 pb-2 border-b-[1px] rounded-sm">
                    <span className="font-bold text-md  p-1   ">
                      Guided By:{" "}
                    </span>
                    <span className="px-2 py-1"> {g.guide_name}</span>
                  </p>
                  <p className="border-b-[1px] px-2 pb-2">
                    <span className="font-bold text-md">Guide Email: </span>
                    {g.guide_email}
                  </p>
                  <p className="border-b-[1px] px-2 pb-2">
                    {" "}
                    <span className="font-bold text-md">Guide Phone:</span>
                    {g.guide_phone}
                  </p>
                </div>
              );
            })}
        </fieldset>
        <div className="flex justify-centermt-5 align-middle mx-auto">
          <Link
            to={`/singletrip/${tripDetails.TripID}/${tripDetails.TripName}`}
          >
            <button className="bg-slate-200 shadow-md  mx-2 mt-5 p-2 rounded-xl border-[1px]">
              More Details
            </button>
          </Link>
          <Link
            to={`/friends/${tripDetails.TripID}`}
            className="bg-gray-100 hover:bg-gray-00 border-[1px] shadow-md  mx-2 mt-5 py-1  rounded-md font-bold  px-3"
          >
            Check Who is withYou !
          </Link>
        </div>
        {isExpired && (
          <p className="text-red-500 absolute right-[90px]">Expired</p>
        )}
      </div>
    )
  );
}

export default UserTripCard;
