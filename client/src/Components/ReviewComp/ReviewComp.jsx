import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import l2 from "../../assets/gallery4.jpg";
import axios from "axios";
function ReviewComp() {
  const [rating, setRating] = React.useState(0);
  const [reviewText, setReviewText] = useState("");
  //const [number, setNumber] = useState(0);

  const handleStarClick = (index) => {
    setRating(index); //to get the number of stars
  };
  const handleSubmitReview = () => {
    setRating(0);
    setReviewText("");
    //to initialize numbers
  };
  const submitReview = async () => {
    const res = await axios.post("http://localhost:3000/api/");
  };
  return (
    <>
      {" "}
      <div className="border-[1px] border-slate-50 p-10 ">
        <h3>
          Reviews ( <span>2 </span>Reviews)
        </h3>
        <div className="stars flex gap-2 mt-7">
          {new Array(5).fill("_").map((c, i) => {
            let color = "gray-400";
            if (i <= rating) color = "yellow-600";
            return (
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => handleStarClick(i)}
                className={`text-${color} cursor-pointer hover:text-yellow-600`}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-5 justify-between border-[1px] border-yellow-500  p-2 mt-4 rounded-2xl review">
          <textarea
            type="text"
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your Thoughts..."
            className="text-black outline-none flex-1 basis-[100px]"
            rows={5}
          />
          <button
            className="bg-yellow-500 p-2 ml-auto rounded-xl text-white"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </div>

        <div className=" align-middle Reviews">
          <div className=" flex gap-4 mx-8 m-4 user-review">
            {" "}
            <div className=" user-image">
              <img
                src={l2}
                alt=""
                className="rounded-full w-[50px] aspect-square"
              />
            </div>
            <div className=" flex justify-between align-middle user-review">
              <div>
                {" "}
                <h3 className="font-bold">Amar</h3>
                <p className="text-slate-500">March 14,2023</p>
                <p>
                  Amazing place Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Beatae, facere?
                </p>
              </div>
              <div>
                <p className="flex gap-1 align-middle justify-center ">
                  {" "}
                  {new Array(5).fill("_").map((c, i) => {
                    let color = "yellow-600";
                    if (i >= 3) color = "gray-400";
                    return (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`text-${color}`}
                      />
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex gap-4 mx-8 m-4 user-review">
            {" "}
            <div className=" user-image">
              <img
                src={l2}
                alt=""
                className="rounded-full w-[50px] aspect-square"
              />
            </div>
            <div className=" flex justify-between align-middle user-review">
              <div>
                {" "}
                <h3 className="font-bold">Amar</h3>
                <p className="text-slate-500">March 14,2023</p>
                <p>
                  Amazing place Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Beatae, facere?
                </p>
              </div>
              <div>
                <p className="flex gap-1 align-middle justify-center ">
                  {" "}
                  {new Array(5).fill("_").map((c, i) => {
                    let color = "yellow-600";
                    if (i >= 3) color = "gray-400";
                    return (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`text-${color}`}
                      />
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex gap-4 mx-8 m-4 user-review">
            {" "}
            <div className=" user-image">
              <img
                src={l2}
                alt=""
                className="rounded-full w-[50px] aspect-square"
              />
            </div>
            <div className=" flex justify-between align-middle user-review">
              <div>
                {" "}
                <h3 className="font-bold">Amar</h3>
                <p className="text-slate-500">March 14,2023</p>
                <p>
                  Amazing place Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Beatae, facere?
                </p>
              </div>
              <div>
                <p className="flex gap-1 align-middle justify-center ">
                  {" "}
                  {new Array(5).fill("_").map((c, i) => {
                    let color = "yellow-600";
                    if (i >= 3) color = "gray-400";
                    return (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`text-${color}`}
                      />
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="m-3 text-lg">
          Did you Like the City? Check Trips Here!{" "}
          <button className="bg-slate-200  rounded-lg border-[1px] p-3 font-bold">
            Check Now
          </button>
        </h3>
      </div>
    </>
  );
}

export default ReviewComp;
