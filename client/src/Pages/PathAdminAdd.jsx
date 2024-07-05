import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function PathAdminAdd() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Details, setDetails] = useState("");
  const [locid, setlocid] = useState(0);
  const [tripid, settripid] = useState(0);
  const [Order, setOrder] = useState(0);
  const [error, setError] = useState("");
  const [AllTrips, setAllTrips] = useState([]);
  const [AllLocations, setAllLocations] = useState([]);
  // GET SELECT Trip ID
  const handleSelectChange = (selected) => {
    if (selected) {
      settripid(selected.value);
    } else {
      settripid("");
    }
  };
  const handleSelecLocationtChange = (selected) => {
    if (selected) {
      setlocid(selected.value);
    } else {
      setlocid("");
    }
  };

  const handleSubmit = async () => {
    try {
      let data = { Name, Details, Order, tripid, locid };
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/admin/addpath",
        data,
        {
          withCredentials: true,
        }
      );

      navigate("/path", { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      }
    }
  };

  // GET ALL Trips

  useEffect(() => {
    async function GetTrips() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/gettrips",
          {
            withCredentials: true,
          }
        );
        setAllTrips(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetTrips();
  }, []);

  //   get ALL LOCATIONS
  useEffect(() => {
    async function Getlocationss() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getlocations",
          {
            withCredentials: true,
          }
        );
        setAllLocations(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    Getlocationss();
  }, []);

  return (
    <div className="w-[100%] mx-auto mr-2 bg-slate-50">
      <div className="pt-3">
        <Link to={"/highlights"} className="p-4 pt-6 mt-2">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </div>
      <div className="max-w-[700px] mx-auto ">
        <div className="shadow-lg flex flex-col gap-3 px-5  p-3 mb-10  bg-slate-200 border-[1px]  my-2 rounded-lg ">
          <h1 className="font-serif text-2xl text-center font-bold text-gray-500">
            Add a Path
          </h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Path Name</label>
              <input
                id="Name"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Order of Location</label>
              <input
                id="Name"
                type="number"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Trip Name</label>
              <Select
                options={AllTrips.map((t) => ({
                  value: t.TripID,
                  label: t.TripName,
                }))}
                placeholder="Select Trip"
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Location Name</label>
              <Select
                options={AllLocations.map((t) => ({
                  value: t.LocationID,
                  label: t.LocationName,
                }))}
                placeholder="Select City"
                onChange={handleSelecLocationtChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Location Details</label>
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll "
                onChange={(e) => setDetails(e.target.value)}
                cols={10}
                rows={5}
              ></textarea>
            </div>
          </div>

          {error && <span className="text-red-600 p-2 ">{error}</span>}
          <button
            onClick={handleSubmit}
            className="flex justify-center mx-auto p-2 bg-slate-300 w-[50%] text-center align-middle rounded-xl mt-2 hover:bg-gray-100"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PathAdminAdd;
