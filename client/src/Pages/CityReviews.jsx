import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { AuthContext } from "../Context/authContext";

function CityReviews() {
  const [rating, setRating] = useState(0);
  const [AllReviews, setAllReviews] = useState([]);
  const [successMessage, setsuccessMessage] = useState("");
  const [reviewText, setReviewText] = useState("");
  const location1 = useLocation();
  const pathnameParts = location1.pathname.split("/");
  const p2 = pathnameParts.length >= 3 ? pathnameParts[2] : null; //city id
  console.log("review city id", p2);
  const { currentUser } = useContext(AuthContext);

  const handleStarClick = (index) => {
    setRating(index); //to get the number of stars
  };

  let data = {
    userid: currentUser?.user.UserID || null,
    cityid: p2,
    rating: rating + 1,
    details: reviewText,
  };

  async function GetAllReviews() {
    try {
      console.log("start");
      const res = await axios.get(
        `http://localhost:3000/api/reviews/getAll?cityid=${p2}`
      );

      setAllReviews(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitReview = async () => {
    try {
      console.log("Trying");
      const res = await axios.post(
        "http://localhost:3000/api/reviews/insertreview",
        data
      );

      setRating(0);
      setReviewText("");
      setsuccessMessage("Your Review is Submitted");
      GetAllReviews();

      setTimeout(() => {
        setsuccessMessage("");
      }, 2000); // Hide message after 2 seconds
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (p2) {
      GetAllReviews();
    }
  }, [p2]);

  return (
    <div className="flex-1">
      <div className="border-[1px] border-slate-50 p-10 ">
        <h3 className="text-center border-b-2 p-4 text-2xl font-bold">
          Reviews
        </h3>
        {successMessage && (
          <div className="checknoww mt-2">{successMessage}</div>
        )}
        {currentUser && (
          <div>
            <div className="stars flex gap-2 mt-7">
              {new Array(5).fill("_").map((c, i) => {
                let color = "lightgray";
                if (i <= rating) color = "gold";
                return (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={() => handleStarClick(i)}
                    className={`cursor-pointer hover:text-yellow-600`}
                    color={color}
                  />
                );
              })}
            </div>

            <div className="flex flex-col gap-5 justify-between border-[1px] border-green-600  p-2 mt-4 rounded-2xl review">
              <textarea
                onChange={(e) => setReviewText(e.target.value)}
                type="text"
                value={reviewText}
                placeholder="Share your Thoughts..."
                className="text-black outline-none flex-1 basis-[100px]"
                rows={5}
              />
              <button
                className="bg-slate-400 p-2 ml-auto rounded-xl text-white"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <div className=" align-middle  flex flex-col  justify-between mt-4 Reviews max-w-[700px]  overflow-hidden">
          {AllReviews.map((review) => {
            return (
              <ReviewCard
                key={review.ReviewId} // Add key prop to each ReviewCard
                id={review.ReviewId}
                stars={review.Nbr_of_Stars}
                details={review.ReviewDetails}
                date={review.Date}
                username={review.username}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CityReviews;
