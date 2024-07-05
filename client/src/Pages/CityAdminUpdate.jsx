import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

function CityAdminUpdate() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [Name, setName] = useState("");
  const [Governorate, setGovernorate] = useState("");
  const [Historical, setHistorical] = useState("");
  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [TimeVisit, setTimeVisit] = useState("");
  const [Details, setDetails] = useState("");
  const [File, setFile] = useState("");
  const [City, setCity] = useState([]);
  const [maplink, setmaplink] = useState("");
  const cityid = useParams().id;
  console.log("Cityid", cityid);
  const handleSelectChange = (selected) => {
    setCity({ ...City, Historical_Status: selected.value });
  };

  const handleSelectChangeType = (selected) => {
    setCity({ ...City, City_Type: selected.value });
  };
  useEffect(() => {
    async function getCity() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getcity?city=${cityid}`,
          {
            withCredentials: true,
          }
        );
        setCity(res.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getCity();
  }, [cityid]);

  console.log("city is", City);
  const options = [
    { value: "Historical", label: "Historical" },
    { value: "Moderate", label: "Moderate" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile(file); // Store the selected file in state
  };

  const options1 = [
    { value: "SeaBoard", label: "SeaBoard" },
    { value: "Mountainous", label: "Mountainous" },
  ];

  let data = {
    Name,
    Governorate,
    Details,
    Historical,
    Type,
    Nbr_of_trips,
    TimeVisit,
    maplink,
  };

  console.log(data);
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

  async function UpdateCity() {
    try {
      const uploadedFileData = File?.name ? await upload() : City.CityImg; // Wait for the upload to complete
      console.log("Uploaded", uploadedFileData);
      console.log("Cityimg", { ...City, CityImg: uploadedFileData });
      await axios
        .put(
          `http://localhost:3000/api/admin/updatecity/${cityid}`,
          { ...City, CityImg: uploadedFileData },
          {
            withCredentials: true,
          }
        )
        .then(() => navigate("/cities", { replace: true }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-[100%] bg-slate-50 ">
      <p className="mt-3">
        {" "}
        <Link to={"/guides"} className="p-3 ">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>{" "}
      </p>

      <h3 className=" text-xl font-bold border-b-[1px] text-center pb-2">
        City Profile
      </h3>

      <div className="flex flex-col md:flex-nowrap lg:flex-nowrap  flex-wrap gap-5 border-[1px] max-w-[700px] mx-auto shadow-lg mt-9 rounded-lg bg-slate-200 p-5">
        <div className="">
          <div className="flex gap-8  pb-2 md:flex-nowrap lg:flex-nowrap  flex-wrap  justify-center align-middle">
            <div className="p-1">
              <label htmlFor="" className="text-md">
                Name:
              </label>
              <br />

              {City && (
                <input
                  type="text"
                  onChange={(e) => setCity({ ...City, Name: e.target.value })}
                  value={City.Name}
                  className="mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                />
              )}
            </div>
            <div className="p-1">
              <label htmlFor="" className="text-md">
                Governorate
              </label>
              <br />

              {City && (
                <input
                  type="text"
                  onChange={(e) =>
                    setCity({ ...City, governorate: e.target.value })
                  }
                  value={City.governorate}
                  className=" mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                />
              )}
            </div>
          </div>

          <div className="flex gap-1 pb-2  md:flex-nowrap lg:flex-nowrap  flex-wrap  justify-center align-middle">
            <div className="p-1">
              <label htmlFor="">Historical Status:</label>
              <br />

              {City && (
                <Select
                  options={options}
                  placeholder="Status"
                  value={{
                    value: City.Historical_Status,
                    label: City.Historical_Status,
                  }}
                  className="w-[200px]"
                  onChange={handleSelectChange}
                />
              )}
            </div>
            <div className="p-1">
              <label htmlFor="">City Type:</label>
              <br />

              {City && (
                <Select
                  options={options1}
                  placeholder="Type"
                  className="w-[200px]"
                  value={{
                    value: City.City_Type,
                    label: City.City_Type,
                  }}
                  onChange={handleSelectChangeType}
                />
              )}
            </div>
          </div>

          <div className="flex gap-8  pb-2 md:flex-nowrap lg:flex-nowrap  flex-wrap justify-center align-middle">
            <div className="p-1 w-[100%]">
              <label htmlFor="" className="p-1">
                Time to Visit
              </label>
              <br />

              {City && (
                <textarea
                  className="border-[2px] rounded-md p-1 overflow-scroll w-full resize-none"
                  onChange={(e) =>
                    setCity({ ...City, Time_To_Visit: e.target.value })
                  }
                  rows={5}
                  value={City.Time_To_Visit}
                  cols={5}
                ></textarea>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="phone">Details of City</label>
            {City && (
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll resize-none "
                onChange={(e) =>
                  setCity({ ...City, CityDetails: e.target.value })
                }
                cols={5}
                rows={5}
                value={City.CityDetails}
              ></textarea>
            )}
          </div>
        </div>
        <div className="flex gap-2  pb-2  md:flex-nowrap lg:flex-nowrap  flex-wrap justify-center align-middle">
          <div className="p-1">
            <label htmlFor="">MapLink</label>
            <br />

            {City && (
              <input
                type="text"
                value={City.maplink}
                className="text-gray-500 mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                onChange={(e) => setCity({ ...City, maplink: e.target.value })}
              />
            )}
          </div>
          <div className="p-2">
            <label htmlFor="">City Image</label>
            <br />
            {City && (
              <>
                {" "}
                <img src={`../../${City.CityImg}`} alt="" width={"200px"} />
                <input
                  type="file"
                  className="max-w-[200px]"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex  md:flex-nowrap lg:flex-nowrap  flex-wrap gap-8 justify-center align-middle">
          <div className="mt-5 p-1">
            <br />
            <span className="p-2 border-[1px] mt-3 rounded-xl bg-slate-100  hover:bg-slate-300 shadow-md text-xl">
              <Link to={"/cities"}>
                <button>Cancel</button>{" "}
              </Link>
            </span>
            <span
              onClick={UpdateCity}
              className="cursor-pointer p-2 border-[1px] mt-3 rounded-xl ml-9 bg-slate-100 hover:bg-slate-400 hover:text-white shadow-md text-xl"
            >
              Update
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityAdminUpdate;
