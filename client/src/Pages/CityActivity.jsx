import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CityActivityCard } from "../Components";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterMenu from "../Components/FilterMenu/FilterMenu";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

function CityActivity() {
  const location1 = useLocation();
  const pathnameParts = location1.pathname.split("/");
  const p1 = pathnameParts.length >= 3 ? pathnameParts[2] : null; //city id
  // console.log("review city id", p2);
  const { currentUser } = useContext(AuthContext);

  const [AllActivity, setAllActivity] = useState([]);
  useEffect(() => {
    const GetActivity = async () => {
      try {
        console.log("coo");
        const res = await axios.get(
          `http://localhost:3000/api/places/cityactivity/${p1}`
        );

        setAllActivity(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    GetActivity();
  }, []);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { label: "Safe", value: "Safe" },
    { label: "Adventural", value: "Adventural" },
  ];
  useEffect(() => {
    // Filter places when selectedOption changes
    if (selectedOption) {
      const filtered = AllActivity.filter((place) => {
        // Check if City_type exists and matches the selected option
        const cityTypeMatches =
          place.Safety_Level &&
          place.Safety_Level.toLowerCase().includes(
            selectedOption.toLowerCase()
          );
        // // Check if Historical_Status exists and includes the selected option
        // const historicalStatusIncludes =
        //   place.Historical_Status &&
        //   place.Historical_Status.toLowerCase().includes(
        //     selectedOption.toLowerCase()
        //   );

        return cityTypeMatches;
      });
      setFilteredPlaces(filtered);
    } else {
      // If no option is selected, show all places
      setFilteredPlaces(AllActivity);
    }
  }, [selectedOption, AllActivity]);

  useEffect(() => {
    // Filter places based on searchQuery
    if (searchQuery) {
      const filtered = AllActivity.filter((p) =>
        p.ActivityName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      // If no search query, show all places
      setFilteredPlaces(AllActivity);
    }
  }, [searchQuery, AllActivity]);
  React.useEffect(() => {
    if (selectedOption) console.log("New filter selected => ", selectedOption);
    else console.log("filter reseted.");
  }, [selectedOption]);

  return (
    <div className="flex-1  m-0">
      <h2 className="font-bold activity   pt-4 pb-[40px] px-6 text-3xl italic font-serif text-center  text-gray-700 ">
        Activities
      </h2>{" "}
      <div className=" mb-[120px] mt-9">
        {/* <h3 className="m-3 text-md pb-2 font-bold absolute right-2 utalic">
          Did you Like the City? Check Trips Here!{" "}
          <Link
            to={`/trips/${p1}`}
            className="   mt-3 rounded-lg border-[1px] checknow text-white shadow-sm p-2 font-bold"
          >
            Check Now
          </Link>
        </h3> */}
      </div>
      <div className="search-buttons flex  flex-wrap gap-4  p-5 justify-center items-center">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search by Location Name..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border-[1px]  w-[300px] rounded-lg mx-4 mt-8"
          />
        </div>

        {/* filterMenu component */}
        <FilterMenu
          options={options} // all the filters (options)
          selected={selectedOption} // current selected filter (option)
          onSelect={setSelectedOption} // shu bisir iza 3emel select la new filter (option)
        />
      </div>
      <div className="activity-content grid align-middle justify-center p-2  px-4">
        {filteredPlaces.map((ac) => {
          return (
            <CityActivityCard
              id={ac.ActivityID}
              img={ac.Activity_Img}
              name={ac.ActivityName}
              details={ac.ActivityDetails}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CityActivity;
