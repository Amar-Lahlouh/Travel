import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Select, { useStateManager } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function TripAdminAdd() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");

  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [File, setFile] = useState("");
  const [error, setError] = useState("");
  const [Point, setPoint] = useState("");
  const [LastDate, setLastDate] = useState("");
  const [DateTrip, setDateTrip] = useState("");
  const [Details, setDetails] = useState("");
  const [Price, setPrice] = useState("");
  const [Seat, setSeat] = useState("");
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");
  const [AllCities, setAllCities] = useState([]);
  const [Cityid, setCityid] = useState(0);
  const [Guideid, setGuideid] = useState(0);
  const [Allguides, setAllguides] = useState([]);
  const [selectedguides, setselectedguides] = useState([]);
  const [whatsapp, setWhatsapp] = useState("");
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
        console.log("res.data.data", res.data.data);
        // console.log(res.data.data);
        setAllCities(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetCities();
  }, []);

  // GET ALL GUIDES
  useEffect(() => {
    async function GetGuides() {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/Guides", {
          withCredentials: true,
        });
        console.log("res.data.data", res.data.data);
        // console.log(res.data.data);
        setAllguides(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetGuides();
  }, []);
  // GET SELECT CITY ID
  const handleSelectGuideChange = (selected) => {
    // if (selected) {
    //   setGuideid(selected.value);
    // } else {
    //   setGuideid("");
    // }
    setselectedguides(selected);
  };

  const GuidesTrip = selectedguides.map((g) => g.value);
  console.log("guides.trip", GuidesTrip);
  console.log(selectedguides, "guides");
  // GET SELECT CITY ID
  const handleSelectChange = (selected) => {
    if (selected) {
      setCityid(selected.value);
    } else {
      setCityid("");
    }
  };
  // end of it

  // UploadPhoto
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

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // INSERT TRIP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      let data = {
        Name,
        imgUrl: imgUrl || File,
        whatsapp,
        Point,
        LastDate,
        DateTrip,
        Details,
        Price,
        Seat,
        Start,
        End,
        Cityid,
        selectedguides: GuidesTrip,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/admin/addtrip",
        data,
        {
          withCredentials: true,
        }
      );

      navigate("/trips", { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      }
    }
  };
  return (
    <div className="w-[100%] mx-auto mr-2 bg-slate-50 ">
      <div className="pt-3">
        <Link to={"/trips"} className="p-4 pt-6 mt-2">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </div>
      <div className="max-w-[700px] mx-auto ">
        <div className="shadow-lg flex flex-col gap-3 px-5  p-3 mb-10  bg-slate-200 border-[1px]  my-2 rounded-lg ">
          <h1 className="font-serif text-2xl text-center font-bold text-gray-800">
            Add a Trip
          </h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Name</label>
              <input
                id="Name"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Point of Meeting</label>
              <input
                id="Gover"
                type="text"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setPoint(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Last Payment Date: </label>
              <input
                id="Name"
                type="date"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setLastDate(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Date of Trip</label>
              <input
                id="Gover"
                type="date"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setDateTrip(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Details</label>
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll "
                onChange={(e) => setDetails(e.target.value)}
                cols={10}
                rows={5}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Total Price</label>
              <input
                id="Gover"
                type="number"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Number of Seats</label>
              <input
                id="Gover"
                type="number"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setSeat(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Start Hour</label>
              <input
                id="Name"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">End Hour</label>
              <input
                id="Gover"
                type="text"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">City Name</label>
              <Select
                options={AllCities.map((city) => ({
                  value: city.CityID,
                  label: city.Name,
                }))}
                placeholder="Select City"
                // value={Cityid}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Guide Name</label>
              <Select
                options={Allguides.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))}
                isMulti
                placeholder="Select Guide"
                onChange={handleSelectGuideChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">Trip Image</label>
              <input
                id="img"
                name="img"
                type="file"
                className="border-[2px] rounded-md p-1 "
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">WhatsApp Link</label>
              <input
                id="Gover"
                type=""
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
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

export default TripAdminAdd;
