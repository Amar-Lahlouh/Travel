import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function HighlightAdminAdd() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Details, setDetails] = useState("");
  const [Cityid, setCityid] = useState(0);
  const [Historical, setHistorical] = useState("");
  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [Image, setImage] = useState("");
  const [Image1, setImage1] = useState("");
  const [File, setFile] = useState("");
  const [File1, setFile1] = useState("");
  const [error, setError] = useState("");
  const [AllCities, setAllCities] = useState([]);

  //  Uploading IMages
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

  const upload1 = async () => {
    try {
      const formData = new FormData();
      formData.append("file", File1); //file tnye hyye input mn l useState
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
  // END

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);
    const imgUrl1 = await upload1();
    try {
      let data = {
        Name,
        Cityid,
        Details,
        imgUrl: imgUrl || File,
        imgUrl1: imgUrl1 || File1,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/admin/addhighlight",
        data,
        {
          withCredentials: true,
        }
      );

      navigate("/highlights");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      }
    }
  };

  // GET SELECT CITY ID
  const handleSelectChange = (selected) => {
    if (selected) {
      setCityid(selected.value);
    } else {
      setCityid("");
    }
  };
  // end of it

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

  // end
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
            Add a Highlight
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
              <label htmlFor="img">City Image 1</label>
              <input
                id="img"
                name="img"
                type="file"
                className="border-[2px] rounded-md p-1 "
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="img">City Image 2</label>
              <input
                id="img"
                name="img"
                type="file"
                className="border-[2px] rounded-md p-1 "
                onChange={(e) => setFile1(e.target.files[0])}
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

export default HighlightAdminAdd;
