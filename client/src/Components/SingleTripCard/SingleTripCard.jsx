import React, { useEffect } from "react";
import f1 from "../../assets/f1.jpg";
import "aos/dist/aos.css";

import AOS from "aos";
function SingleTripCard({ location }) {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <div
      className="flex justify-center align-middle gap-2 mx-auto"
      data-aos="fade-right"
    >
      <div>
        <h3 className="checknow text-white p-1 mt-4 px-2 rounded-lg ">
          {" "}
          {location.order_of_location}
        </h3>
      </div>
      <div className="border-[1px] shadow-lg bg-gray-200 mb-3 p-2 m-2 flex-wrap md:flex-nowrap w-[60%] flex gap-4">
        {" "}
        <div className="md:border-r-[3px] border-gray-400 pr-3">
          <img
            src={`../../${location.LocationImage}`}
            alt=""
            className="object-cover min-w-[120px] max-w-[120px] h-full"
          />
        </div>
        <div className="">
          <h3 className="font-bold text-lg p-2"> {location.LocationName}</h3>
          <p>{location.Details_of_location}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleTripCard;
