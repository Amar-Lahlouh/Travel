import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import l2 from "../../assets/l2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faHeart,
  faL,
  faLocationPin,
  faMoneyBill,
  faMoneyCheckDollar,
  faPerson,
  faUser,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { act } from "react";

function TripCard({
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
    guides,
    City_fk,
    spoken_languages,
    Last_Payment_Date,
  },
}) {
  const [full1, setFull1] = useState(Nbr_of_Seats === NumPeople_In_it);
  const [LastPay, setLastPay] = useState(false);
  const [Fav, setFav] = useState(false);
  const [Red, setRed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    // console.log("Nbr_of_Seats:", Nbr_of_Seats);
    // console.log("NumPeople_In_it:", NumPeople_In_it);
    setFull1(Nbr_of_Seats === NumPeople_In_it);
  }, [Nbr_of_Seats, NumPeople_In_it]);

  useEffect(() => {
    const currentDate = new Date();
    const tripDate = new Date(Date_of_Trip);
    // setIsExpired(currentDate > tripDate);
    if (currentDate > tripDate && !isExpired) {
      console.log("Expired", TripID);
      setIsExpired(true);
    }
  }, [Date_of_Trip, isExpired]);

  useEffect(() => {
    const currentDate = new Date();
    const paymentDate = new Date(Last_Payment_Date);
    const endpay = currentDate > paymentDate;
    setLastPay(endpay);
  }, []);

  async function WRITEEXPIRE() {
    try {
      console.log("start expire");
      const res = await axios.put(
        `http://localhost:3000/api/trips/upexpire/${TripID}`,
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
  }, [isExpired, Date_of_Trip]);

  return (
    !isExpired && (
      <div className="flex flex-col md:flex-row mx-9 mb-3 border rounded-lg shadow-md p-2 bg-gray-100">
        <div className="  pt-2 px-5">
          <img
            src={`../../${Trip_Image}`}
            alt={`${TripName}`}
            className=" object-cover rounded-lg h-[180px] w-[250px]"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full md:w-2/3 p-4">
          <div className="trip-details-first flex flex-col gap-4">
            <h2 className="text-3xl   font-serif font-bold">{TripName}</h2>
            <p className="text-gray-700 max-w-[200px]">{Details}</p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span className="font-semibold px-1">Date: </span>
              {new Date(Date_of_Trip).toLocaleDateString()}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faMoneyBill} />
              <span className="font-semibold px-1">Last Payment Date: </span>
              {new Date(Last_Payment_Date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faPerson} />
              <span className="font-semibold px-1">Guided By: </span>
              {guides.length > 0 ? guides.join(", ") : "No guides yet"}
            </p>
          </div>
          <div className="trip-details-second flex flex-col gap-4 mt-4 md:mt-0">
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faClock} />
              <span className="font-semibold px-1">Exact Time: </span>
              {Start_Hour} till {End_Hour}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faLocationPin} />
              <span className="font-semibold px-1">Location: </span>
              {Location}
            </p>
            <p className="text-gray-700 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              <span className="font-semibold">Number of Seats: </span>
              {Nbr_of_Seats}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              <span className="font-semibold px-1">Price per person: </span>
              {Total_Price}$
            </p>
            {/* check if it is full and last payment didnot go */}
            {full1 ? (
              <p className="text-red-600 font-bold text-lg">TRIP FULL</p>
            ) : !LastPay ? (
              <Link to={`/singletrip/${TripID}/${TripName}`}>
                <button className="checknowww text-white p-2 rounded-lg mt-2">
                  More Details
                </button>
              </Link>
            ) : (
              <p className="text-red-500 text-md">
                Cannot Accept Reservations After Now Sorry!
              </p>
            )}
          </div>
          {/* <span className="mb-4 pb-7  cursor-pointer ">
            {" "}
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              className={
                Red
                  ? "text-red-600 hover:text-red-600"
                  : "text-slate-200 hover:text-red-600"
              }
              // onClick={setFavorite}
            />
          </span> */}
          {isExpired ? <p className="text-red-500 text-lg">Expired</p> : ""}
        </div>
      </div>
    )
  );
}
export default TripCard;
