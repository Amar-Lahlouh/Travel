import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function TripStatus() {
  return (
    <div className="w-[100%]">
      <h3 className="text-xl text-center p-3 font-bold">Trip Name: Name</h3>
      <Link to={"/guidelinedetails"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" className="px-4" />
      </Link>

      <fieldset className="border-[1px] flex flex-wrap gap-4 max-w-[600px] mx-auto mt-5 p-9">
        <legend>Details</legend>
        <div className="flex gap-1">
          {" "}
          <label htmlFor="">We have Started</label>
          <input type="checkbox" />
        </div>
        <div className="flex gap-1">
          {" "}
          <label htmlFor="">Arrived to 1st Location</label>
          <input type="checkbox" />
        </div>
        <div className="flex gap-1">
          {" "}
          <label htmlFor=""> Arrived to 2nd Location</label>
          <input type="checkbox" />
        </div>
        <div className="flex gap-1">
          {" "}
          <label htmlFor=""> Arrived to 3rd Location</label>
          <input type="checkbox" />
        </div>
        <div className="flex gap-1">
          {" "}
          <label htmlFor=""> Going Home</label>
          <input type="checkbox" />
        </div>
        <div className="flex gap-1">
          {" "}
          <label htmlFor="">There is a Problem Talk to me.</label>
          <input type="checkbox" />
        </div>
      </fieldset>
    </div>
  );
}

export default TripStatus;
