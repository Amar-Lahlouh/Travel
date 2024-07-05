import React, { useContext, useEffect, useState } from "react";
import TripCardGuideline from "../Components/TripCardGuideline/TripCardGuideline";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

function GuideLineDetails() {
  const { currentUser } = useContext(AuthContext);
  const idd = currentUser?.user?.UserID;
  console.log("rola id", idd);
  const [GuideTrips, setGuideTrips] = useState([]);
  useEffect(() => {
    async function GuideLineTrips() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/guide/gettrips/${idd}`,
          {
            withCredentials: true,
          }
        );
        setGuideTrips(res.data);
      } catch (err) {}
    }
    GuideLineTrips();
  }, []);
  console.log(GuideTrips, "Alltrip");
  return (
    <div>
      <h2 className="text-center justify-center  my-4 font-bold text-2xl ">
        Your Trips
      </h2>
      <div className="mt-7">
        {GuideTrips.length > 0 ? (
          GuideTrips.map((trip, index) => (
            <TripCardGuideline key={index} trip={trip} />
          ))
        ) : (
          <p>No trips available</p>
        )}
      </div>
    </div>
  );
}

export default GuideLineDetails;
