import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
function CityActivityCard({ id, img, name, details }) {
  return (
    <div
      key={id}
      className="flex z-1 flex-col mb-5 transition-transform transform hover:scale-105 gap-2 shadow-xl rounded-lg p-3 sm:w-[300px] w-[250px]"
    >
      <div className="activity-card-img flex h-[200px]">
        <img
          src={`../${img}`}
          alt=""
          className="object-cover aspect-square w-full h-full rounded-lg"
        />
      </div>
      <div className="activity-card-content">
        {" "}
        <h3 className="text-xl font-bold px-2 py-1">
          {" "}
          <span className="pr-1">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          {name}
        </h3>
        <p className="text-gray-500">{details}</p>
      </div>
    </div>
  );
}

export default CityActivityCard;
