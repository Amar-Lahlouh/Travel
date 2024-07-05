import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ReviewCard({ stars, details, date, username }) {
  // Function to generate star icons
  const renderStars = () => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      const color = i < stars ? "gold" : "lightgray";
      starIcons.push(<FontAwesomeIcon key={i} icon={faStar} color={color} />);
    }
    return starIcons;
  };

  return (
    <div className="flex justify-between gap-4 mx-8 m-4">
      <div>
        <h3 className="font-bold">{username}</h3>
        <p className="text-slate-500">
          {new Date(date).toLocaleDateString()}{" "}
          {new Date(date).toLocaleTimeString()}
        </p>
        <p className="break-all">{details}</p>{" "}
        {/* Display the review details */}
      </div>
      <div className="flex gap-1">
        {renderStars()} {/* Render the star icons */}
      </div>
    </div>
  );
}

export default ReviewCard;
