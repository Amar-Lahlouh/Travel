import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TripAdminup() {
  const [error, setError] = useState("");
  const [cityOptions, setcityOptions] = useState([]);
  const [allGuides, setAllGuides] = useState([]);
  const handleSelectChange = (selected) => {
    setHistorical(selected);
  };

  const handleSelectChangeType = (selected) => {
    setType(selected);
  };

  const handleSelectLanguages = (selectedLanguages) => {
    console.log("selected lang", selectedLanguages);
    settrip({ ...trip, languages: selectedLanguages });
  };
  // GET ALL GUIDELINES
  useEffect(() => {
    async function GetGuides() {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/Guides", {
          withCredentials: true,
        });
        console.log("res.data.data", res.data.data);
        // console.log(res.data.data);
        setAllGuides(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetGuides();
  }, []);
  const handleFile2Change = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile(file); // Store the selected file in state
  };
  console.log(allGuides);
  // GET ALL CITIES
  useEffect(() => {
    async function GetCities() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getcities",
          {
            withCredentials: true,
          }
        );
        const cities = res.data.data.map((city) => ({
          value: city.CityID,
          label: city.Name,
        }));
        setcityOptions(cities);
      } catch (err) {
        console.log(err);
      }
    }
    GetCities();
  }, []);

  console.log("CITTYOPTIONS", cityOptions);
  const [File, setFile] = useState("");
  const [trip, settrip] = useState([]);
  const trippid = useParams().id;
  console.log("id is ", trippid);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", File); //file tnye hyye input mn l useState
      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data", res.data);
      console.log(File);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // GET TRIP
  const [tripdata, setripdata] = useState([]);
  const [guidedata, setguidedata] = useState([]);

  useEffect(() => {
    async function GetTripData() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/gettrip/${trippid}`,
          {
            withCredentials: true,
          }
        );
        settrip(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetTripData();
  }, [trippid]);
  console.log(trip);
  console.log(trip.tripData);
  return (
    <div className="w-[100%] bg-slate-50 ">
      <p className="mt-3">
        {" "}
        <Link to={"/trips"} className="p-3 ">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>{" "}
      </p>

      <h3 className=" text-xl font-bold border-b-[1px] text-center pb-2">
        Trip Profile
      </h3>

      <div className="max-w-[700px] mx-auto mt-4">
        <div className="shadow-lg flex flex-col gap-3 px-5  p-3 mb-10  bg-slate-200 border-[1px]  my-2 rounded-lg ">
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Name</label>
              {trip && (
                <input
                  id="Name"
                  type="text"
                  name="name"
                  value={trip.TripName}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip.tripData,
                      TripName: e.target.value,
                    })
                  }
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Point of Meeting</label>
              {tripdata && (
                <input
                  id="Gover"
                  type="text"
                  name="Gover"
                  value={tripdata.Point_of_meeting}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...tripdata,
                      Point_of_meeting: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Last Payment Date: </label>
              {trip && (
                <input
                  id="Name"
                  type=""
                  name="name"
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Last_Payment_Date: e.target.value,
                    })
                  }
                  value={new Date(trip.Last_Payment_Date).toLocaleDateString()}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Date of Trip</label>
              {trip && (
                <input
                  id="Gover"
                  type=""
                  name="Gover"
                  value={new Date(trip.Date_of_Trip).toLocaleDateString()}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Date_of_Trip: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Details</label>
              {trip && (
                <textarea
                  className="border-[2px] rounded-md p-1 overflow-scroll "
                  value={trip.Details}
                  cols={10}
                  rows={5}
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Date_of_Trip: e.target.value,
                    })
                  }
                ></textarea>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Total Price</label>
              {trip && (
                <input
                  id="Gover"
                  type="number"
                  name="Gover"
                  value={trip.Total_Price}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Total_Price: e.target.value,
                    })
                  }
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Number of Seats</label>
              {trip && (
                <input
                  id="Gover"
                  type="number"
                  name="Gover"
                  value={trip.Nbr_of_Seats}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Nbr_of_Seats: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Start Hour</label>
              {trip && (
                <input
                  id="Name"
                  type="text"
                  name="name"
                  value={trip.Start_Hour}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      Start_Hour: e.target.value,
                    })
                  }
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">End Hour</label>
              {trip && (
                <input
                  type="text"
                  value={trip.End_Hour}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      End_Hour: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">City Name</label>
              <Select
                options={cityOptions}
                value={cityOptions.find(
                  (option) => option.value === trip.City_fk
                )}
                onChange={(selectedOption) => {
                  settrip({
                    ...trip,
                    City_fk: selectedOption.value,
                    Name: selectedOption.label,
                  });
                }}
                placeholder="Select City"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Guide Name</label>
              <Select
                options={allGuides.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))}
                isMulti
                placeholder="Select Guide"
                value={
                  allGuides.languages
                    ? user.languages.map((id, name, index) => ({
                        value: id.label,
                        label: name.label,
                        key: `${language.value}-${index}`,
                      }))
                    : []
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Number of People in it</label>
              {trip && (
                <input
                  id="Name"
                  type="number"
                  name="name"
                  value={trip.NumPeople_In_it}
                  className="border-[2px] rounded-md p-1"
                  onChange={(e) =>
                    settrip({
                      ...trip,
                      NumPeople_In_it: e.target.value,
                    })
                  }
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Trip Image</label>
              {trip && (
                <>
                  {" "}
                  <img
                    src={`../../${trip.Trip_Image}`}
                    alt=""
                    width={"200px"}
                  />
                  <input
                    type="file"
                    className="max-w-[200px]"
                    onChange={handleFile2Change}
                  />
                </>
              )}
            </div>
          </div>
          {error && <span className="text-red-600 p-2 ">{error}</span>}
          <button className="flex justify-center mx-auto p-2 bg-slate-300 w-[50%] text-center align-middle rounded-xl mt-2 hover:bg-gray-100">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripAdminup;
