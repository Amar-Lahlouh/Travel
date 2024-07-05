import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CityAdminAdd() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Governorate, setGovernorate] = useState("");
  const [Historical, setHistorical] = useState("");
  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [TimeVisit, setTimeVisit] = useState("");
  const [Details, setDetails] = useState("");
  const [maplink, setmaplink] = useState("");
  // IMAGE FUNC
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); //file tnye hyye input mn l useState
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
      console.log("file", file);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // IMG END FUNC

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);
    try {
      let data = {
        Name,
        Governorate,
        Historical: Historical.value,
        Type: Type.value,
        Nbr_of_trips,
        TimeVisit,
        Details,
        maplink,
        imgUrl: imgUrl || file,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/admin/addcity",
        data,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          withCredentials: true,
        }
      );

      navigate("/cities");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      }
    }
  };

  const handleSelectChange = (selected) => {
    setHistorical(selected);
  };

  const handleSelectChangeType = (selected) => {
    setType(selected);
  };

  const options = [
    { value: "Historical", label: "Historical" },
    { value: "Moderate", label: "Moderate" },
  ];

  const options1 = [
    { value: "SeaBoard", label: "SeaBoard" },
    { value: "Mountainous", label: "Mountainous" },
  ];

  return (
    <div className="w-[100%] mx-auto mr-2 bg-slate-50">
      <div className="pt-3">
        <Link to={"/cities"} className="p-4 pt-6 mt-2">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </div>
      <div className="max-w-[700px] mx-auto ">
        <div className="shadow-lg flex flex-col gap-3 px-5  p-3 mb-10  bg-slate-200 border-[1px]  my-2 rounded-lg ">
          <h1 className="font-serif text-2xl text-center font-bold text-gray-800">
            Add a City
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
              <label htmlFor="lastName">Governorate</label>
              <input
                id="Gover"
                type="text"
                name="Gover"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setGovernorate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1 ">
              <label htmlFor="username">Historical Status</label>
              <Select
                options={options}
                placeholder="Status"
                value={Historical}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="username">City Type</label>
              <Select
                options={options1}
                placeholder="Type"
                value={Type}
                onChange={handleSelectChangeType}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="trip">Number of Trips</label>
              <input
                id="trip"
                name="trip"
                type="number"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setNbr_of_trips(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Time to Visit</label>
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll resize-none "
                onChange={(e) => setTimeVisit(e.target.value)}
                cols={5}
                rows={5}
              ></textarea>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Details of City</label>
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll resize-none "
                onChange={(e) => setDetails(e.target.value)}
                cols={5}
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">Map Link</label>
              <input
                id="maplink"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setmaplink(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="img">City Image</label>
              <input
                id="file"
                name="file"
                type="file"
                className="border-[2px] rounded-md p-1 "
                onChange={(e) => setFile(e.target.files[0])}
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

export default CityAdminAdd;
