import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
function SingleCity() {
  const { CityId } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const getCityDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/places/${CityId}`,
          {
            withCredentials: true,
          }
        );
        console.log("res.data", res.data);
        setCity(res.data[0]); // Assuming 'city' is the key for the city data in the response
      } catch (err) {
        console.log(err);
      }
    };
    getCityDetails();
  }, [CityId]);
  if (!city) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-[100%]">
      <div
        className="city-home flex justify-center"
        style={{
          backgroundImage: `url("../../${city.CityImg}")`,
        }}
      >
        {city && (
          <h2 className="mt-[150px] font-serif text-4xl font-bold text-gray-200 italic mb-3 flex justify-center align-middle my-auto z-[2]">
            {city.Name}
          </h2>
        )}
      </div>
      <div className="city-home-content ">
        <p className="flex  text-2xl mb-6  m-2 justify-end px-4 font-bold pt-2 gap-2">
          Number of Available Trips:{" "}
          <span className="text-red-500">{city.nbr_of_trips || "0"}</span>
        </p>
        <h3 className="italic text-2xl  mx-5 checknoww font-bold ">
          <span className="text-gray-400">
            {" "}
            <FontAwesomeIcon icon={faRectangleList} />
          </span>{" "}
          Description:{" "}
        </h3>
        <p className="pt-5 bg-slate-100 rounded-lg p-4 tracking-wide m-5">
          {city.CityDetails}
        </p>

        <h2 className="text-xl font-bold  checknoww  mx-5">
          Best Time to Visit {city.Name}
        </h2>
        <p className="bg-slate-100 m-4 rounded-lg p-4 tracking-wide">
          {city.Time_To_Visit}
        </p>
      </div>
      <div>
        {city.nbr_of_trips > 0 ? (
          <h3 className="m-3 text-xl text-gray-700 font-bold">
            Did you Like the City? Check Trips Here!{" "}
            <Link to={`/trips/${city.CityID}`}>
              <button className="checknowww text-white rounded-lg border-[1px] p-3 font-bold">
                Check Now
              </button>
            </Link>
          </h3>
        ) : (
          <p className="text-2xl font-bold px-2 text-red-700 py-2">
            Sorry! No trip Are Available right now
          </p>
        )}
      </div>
    </div>
  );
}

export default SingleCity;
