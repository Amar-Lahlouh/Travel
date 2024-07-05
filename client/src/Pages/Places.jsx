import {
  faArrowCircleRight,
  faArrowDown,
  faHeart,
  faLocation,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import saida from "../assets/saida.jpg";
import { FilterMenu } from "../Components";
import PlaceCard from "../Components/PlaceCard/PlaceCard";

function Places() {
  const [showList, setshowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const options = [
    { label: "Historical", value: "Historical" },
    { label: "Moderate", value: "Moderate" },
    { label: "Mountainous", value: "Mountainous" },
    { label: "SeaBoard", value: "SeaBoard" },
  ];

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hi");
        const res = await axios.get("http://localhost:3000/api/places/all", {
          withCredentials: true,
        });
        setPlaces(res.data.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter places when selectedOption changes
    if (selectedOption) {
      const filtered = places.filter((place) => {
        // Check if City_type exists and matches the selected option
        const cityTypeMatches =
          place.City_Type &&
          place.City_Type.toLowerCase().includes(selectedOption.toLowerCase());
        // Check if Historical_Status exists and includes the selected option
        const historicalStatusIncludes =
          place.Historical_Status &&
          place.Historical_Status.toLowerCase().includes(
            selectedOption.toLowerCase()
          );

        return cityTypeMatches || historicalStatusIncludes;
      });
      setFilteredPlaces(filtered);
    } else {
      // If no option is selected, show all places
      setFilteredPlaces(places);
    }
  }, [selectedOption, places]);

  useEffect(() => {
    // Filter places based on searchQuery
    if (searchQuery) {
      const filtered = places.filter((place) =>
        place.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      // If no search query, show all places
      setFilteredPlaces(places);
    }
  }, [searchQuery, places]);
  console.log(places);
  return (
    <div>
      <div className="places-top min-h-[80vh] ">
        <p className="flex justify-center pt-8 px-5  mx-auto sm:pt-[200px]  sm:pb-[40px] sm:px-[50px] align-middle text-white font-mono  text-xl sm:text-2xl">
          {" "}
          "Embark on a journey of discovery as you uncover hidden gems and
          explore the beauty of breathtaking destinations."
        </p>
      </div>
      <div className="places-data ">
        <div className="main-title mt-4 pt-4 flex flex-wrap justify-center align-middle">
          <h2 className=" font-serif text-3xl font-bold">
            Our<span className="checknoww "> Places</span>
          </h2>
        </div>
        <div className="search-buttons flex justify-center flex-wrap gap-4  p-5  align-middle ">
          <div className="search-inputs flex justify-center align-middle ">
            <input
              type="text"
              placeholder="Search by City Name..."
              className="p-2 border-[1px]  rounded-lg mx-4 mt-8  w-[300px] sm:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* filterMenu component */}
          <FilterMenu
            options={options} // all the filters (options)
            selected={selectedOption} // current selected filter (option)
            onSelect={setSelectedOption} // shu bisir iza 3emel select la new filter (option)
          />
        </div>

        <div className="places-container p-7 mt-4 gap-4">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
            // <Link
            //   to={`/places/${place.CityID}`}
            //   className="bg-slate-200  place-card  rounded-sm p-2 cursor-pointer"
            //   key={place.CityID}
            // >
            //   <div className="overflow-hidden flex justify-center items-center">
            //     <img
            //       src={`../../${place.CityImg}`}
            //       alt=""
            //       className="hover:scale-105 transition-all"
            //     />
            //   </div>
            //   {/* place content */}
            //   <div className="flex flex-col gap-2">
            //     <div className="flex gap-2 p-1 text-lg items-center justify-between">
            //       <div className="flex gap-2 text-lg items-center">
            //         <FontAwesomeIcon icon={faLocation} />
            //         <span>{place.Name}</span>
            //       </div>
            //       <FontAwesomeIcon icon={faArrowCircleRight} color="gray" />
            //     </div>
            //     <span className="text-sm text-gray-700 line-clamp-2">
            //       {place.CityDetails}
            //     </span>
            //   </div>
            //   <a
            //     href={place.mapLink}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="flex  cursor pointer items-center text-blue-500 hover:underline"
            //   >
            //     <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            //     View Here
            //   </a>
            // </Link>
          ))}
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Places;
