import React, { useEffect, useState } from "react";
import SingleTripCard from "../SingleTripCard/SingleTripCard";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import f1 from "../../../public/f1.jpg";
import "aos/dist/aos.css";

import AOS from "aos";
function SingleTripComp() {
  const tripid = useParams().id;
  const name = useParams().name;
  const [AllLocations, setAllLocations] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser?.user?.UserID;
  const [hasReservation, setHasReservation] = useState(false);
  const isGuide = currentUser?.user?.Role === 1;
  //console.log("isGuide:", isGuide);
  // console.log("hasReservation:", hasReservation);
  // console.log("currentUser.user.Role:", currentUser.user.Role);
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch locations for the trip
        const locationsResponse = await axios.get(
          `http://localhost:3000/api/trips/singletrip/${tripid}`,
          {
            withCredentials: true,
          }
        );
        setAllLocations(locationsResponse.data.data);

        const reservationsResponse = await axios.get(
          `http://localhost:3000/api/trips/checkreserve/${tripid}`,
          {
            withCredentials: true,
          }
        );
        setHasReservation(reservationsResponse.data.length > 0);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  console.log(hasReservation);
  return (
    <div className="bg-slate-50">
      <div>
        <h3 className="  checknoww pay text-center text-2xl pt-5 font-serif font-bold mb-[70px]">
          Our Program in {name}
        </h3>
      </div>
      {AllLocations.map((location) => (
        <SingleTripCard key={location.LocationID} location={location} />
      ))}
      {!hasReservation && !isGuide && currentUser && (
        <div className="flex justify-center align-middle my-4 mx-3">
          <h2 className="text-xl font-bold p-2">Did you Like it? </h2>
          <Link to={`/reservation/${tripid}`}>
            <button className="checknowww text-white rounded-lg font-bold border-[1px] p-2 mx-2">
              Book Now
            </button>
          </Link>
        </div>
      )}
      {!currentUser && (
        <span className="text-center font-bold flex justify-center align-middle">
          You Don't Have an Account Please Sign Up!
        </span>
      )}

      {hasReservation && (
        <p className="text-center font-bold py-3">
          {" "}
          You are Registered in this Trip!
        </p>
      )}
      <Footer />
    </div>
  );
}

export default SingleTripComp;
