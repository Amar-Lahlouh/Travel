import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import TripCard from "../Components/TripCard/TripCard";
import countryLanguages from "../Data/Languages";

function Trips() {
  const cid = useParams().id;
  const [AllTrips, setAllTrips] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(AllTrips);
  useEffect(() => {
    async function GetAllTrips() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/trips/all?id=${cid}`,
          {
            withCredentials: true,
          }
        );
        setAllTrips(res.data.data);
      } catch (err) {
        // console.log(err);
      }
    }
    GetAllTrips();
  }, [cid]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const handleLanguageChange = (selectedOption) => {
    // console.log("selectedOption", selectedOption);
    setSelectedLanguage(selectedOption.value);
  };

  const filteredTrips = AllTrips.filter((trip) => {
    // console.log("selectedLanguage", !!selectedLanguage);
    // console.log("selectedMonth", !!selectedMonth);
    // console.log(
    //   "trip",
    //   trip?.spoken_languages && trip.spoken_languages.includes(selectedLanguage)
    // );
    const tripDate = new Date(trip.Date_of_Trip);
    const tripMonth = tripDate.getMonth() + 1;
    let filtered = trip.TripName.toLowerCase().includes(
      searchInput.toLowerCase()
    );
    if (selectedMonth)
      filtered = filtered && tripMonth == parseInt(selectedMonth, 10);
    if (selectedLanguage)
      filtered =
        filtered &&
        trip.spoken_languages &&
        trip.spoken_languages.includes(selectedLanguage);

    // console.log("filter result", filtered);
    return filtered;
  });
  console.log("filteredTrips.length", filteredTrips.length);

  return (
    <div className="main-trips bg-gray-50   mx-auto ">
      <h2 className="font-bold trips-title pt-5 text-gray-600 text-center text-4xl mb-8 font-serif">
        Our Trips
      </h2>
      <div className="search-filters mx-[50px] mt-[80px] bg-slate-100 rounded-sm p-3 mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
          <div className="flex items-center gap-2">
            <label htmlFor="languages" className="font-medium">
              Languages:
            </label>
            <Select
              options={countryLanguages}
              onChange={handleLanguageChange}
              placeholder="Select languages"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="month" className="font-medium">
              Choose a Month:
            </label>
            <input
              type="number"
              min={1}
              max={12}
              placeholder="Month"
              className="border rounded-lg p-2"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
          <button className="checknowww text-white p-2 rounded-lg">
            Search
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="font-medium">
            Search by Trip Name:
          </label>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search..."
            className="border rounded-lg p-2"
            value={searchInput}
          />
        </div>
      </div>
      <div className="trips-list flex flex-col gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))
        ) : (
          <p className="text-center text-gray-500">No trips available</p>
        )}
      </div>
    </div>
  );
}

export default Trips;
