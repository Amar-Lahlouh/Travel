import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faLocation,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
function PlaceCard({ place: { CityID, CityImg, Name, CityDetails, maplink } }) {
  useEffect(() => {
    AOS.init({ duration: 1500 });
    AOS.refresh();
  }, []);
  return (
    <div
      data-aos="fade-right"
      className=" p-1 shadow-md bg-gray-200 rounded-md  flex flex-col items-center max-w-[300px]"
    >
      <Link
        to={`/places/${CityID}`}
        className=" place-card  rounded-sm p-2 cursor-pointer"
      >
        <div className="overflow-hidden [200px] flex justify-center items-center">
          <img
            src={`../../${CityImg}`}
            alt=""
            className="hover:scale-105 transition-all aspect-[16/9] h-[150px] w-[100%]"
          />
        </div>
        {/* place content */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 p-1 text-lg items-center justify-between">
            <div className="flex gap-2 text-lg items-center">
              <FontAwesomeIcon icon={faLocation} />
              <span>{Name}</span>
            </div>
            <FontAwesomeIcon icon={faArrowCircleRight} color="gray" />
          </div>
          <span className="text-sm text-gray-700 line-clamp-2">
            {CityDetails}
          </span>
        </div>
      </Link>
      <span className="w-[300px] px-1 py-2">
        <a
          href={maplink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          View on Google Maps
        </a>
      </span>
    </div>
  );
}

export default PlaceCard;
