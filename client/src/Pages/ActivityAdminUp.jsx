import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import serv1 from "../assets/serv1.jpg";
import countryLanguages from "../Data/Languages";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function ActivityAdminUp() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [File, setFile] = useState("");
  const [Details, setDetails] = useState("");
  const [Governorate, setGovernorate] = useState("");
  const [Historical, setHistorical] = useState("");
  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [Image, setImage] = useState("");
  const [Image1, setImage1] = useState("");
  const [error, setError] = useState("");
  const [Activity, setActivity] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);
  // const handleSelectChange = (selectedOption) => {
  //   setHighlight({ ...Highlight, City_fk: selectedOption.value });
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile(file); // Store the selected file in state
  };

  const Activityid = useParams().id;
  console.log(Activityid);
  // FETCH CITIES
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
  const handleLevelChange = (selected) => {
    setActivity({ ...Activity, Safety_Level: selected.value });
  };
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
  useEffect(() => {
    async function getActivity() {
      try {
        //const uploadedFileData = File?.name ? await upload() : Highlight.img1;
        // const uploadedFile2Data = File1?.name ? await upload1() : Highlight.img2
        const res = await axios.get(
          `http://localhost:3000/api/admin/getactivity?h=${Activityid}`,
          {
            withCredentials: true,
          }
        );
        setActivity(res.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getActivity();
  }, [Activityid]);

  const options = [
    { value: "Safe", label: "Safe" },
    { value: "Risky", label: "Risky" },
  ];
  const handleSelectChangeType = (selected) => {
    setType(selected);
  };
  // UPDATE ACTIVITY
  async function updateActivity() {
    try {
      const uploadedFileData = File?.name
        ? await upload()
        : Activity.Activity_Img;

      await axios
        .put(
          `http://localhost:3000/api/admin/updateactivity/${Activityid}}`,
          { ...Activity, Activity_Img: uploadedFileData },
          {
            withCredentials: true,
          }
        )
        .then(() => navigate("/activities", { replace: true }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-[100%] bg-slate-50 ">
      <p className="mt-3">
        {" "}
        <Link to={"/activities"} className="p-3 ">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>{" "}
      </p>
      <h3 className=" text-xl font-bold border-b-[1px] text-center pb-2">
        Activity Profile
      </h3>
      <div
        className="flex flex-col md:flex-nowrap lg:flex-nowrap  flex-wrap gap-5 
      border-[1px] max-w-[700px] mx-auto shadow-lg mt-9 rounded-lg bg-slate-200 p-5"
      >
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="firstName">Name</label>
            {Activity && (
              <input
                id="Name"
                type="text"
                name="name"
                value={Activity.ActivityName}
                className="border-[2px] rounded-md p-1"
                onChange={(e) =>
                  setActivity({ ...Activity, ActivityName: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="lastName">City ID</label>
            <Select
              options={cityOptions}
              value={cityOptions.find(
                (option) => option.value === Activity.City_fk
              )}
              onChange={(selectedOption) => {
                setActivity({
                  ...Activity,
                  City_fk: selectedOption.value,
                  Name: selectedOption.label,
                });
              }}
              placeholder="Select City"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="phone">Details</label>
            <textarea
              className="border-[2px] rounded-md p-1 overflow-scroll "
              cols={10}
              rows={5}
              onChange={(e) =>
                setActivity({ ...Activity, ActivityDetails: e.target.value })
              }
              value={Activity.ActivityDetails}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="img">Safety Level</label>
            {Activity && (
              <Select
                options={options}
                placeholder="Safety"
                onChange={handleLevelChange}
                value={{
                  value: Activity.Safety_Level,
                  label: Activity.Safety_Level,
                }}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="img">City Image 1</label>

            {Activity && (
              <>
                {" "}
                <img
                  src={`../../${Activity.Activity_Img}`}
                  alt=""
                  width={"200px"}
                />
                <input
                  type="file"
                  className="max-w-[200px]"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex md:flex-nowrap lg:flex-nowrap  flex-wrap  gap-8 justify-center align-middle">
          <div className="mt-5 p-1">
            <br />
            <span className="p-2 border-[1px] mt-3 rounded-xl bg-slate-100  hover:bg-slate-300 shadow-md text-xl">
              <Link to={"/activities"}>
                <button>Cancel</button>{" "}
              </Link>
            </span>

            <span
              onClick={updateActivity}
              className="p-2 border-[1px] mt-3 rounded-xl ml-9 bg-slate-100 hover:bg-slate-400 hover:text-white shadow-md text-xl"
            >
              Update
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityAdminUp;
