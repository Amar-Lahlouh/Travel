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

function LocationAdminUp() {
  const [Name, setName] = useState("");
  const [File, setFile] = useState("");
  const [Location, setLocation] = useState([]);
  const navigate = useNavigate();
  const loc = useParams().id;
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile(file); // Store the selected file in state
  };
  //  GET LOCATION
  useEffect(() => {
    async function getLocation() {
      try {
        const uploadedFileData = File?.name ? await upload() : Highlight.img1;

        const res = await axios.get(
          `http://localhost:3000/api/admin/getLocation?h=${loc}`,
          {
            withCredentials: true,
          }
        );
        setLocation(res.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getLocation();
  }, [loc]);
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
  async function updateLocation() {
    try {
      const uploadedFileData = File?.name ? await upload() : Location.LocImage;

      await axios
        .put(
          `http://localhost:3000/api/admin/updatelocation/${loc}`,
          { ...Location, LocImage: uploadedFileData },
          {
            withCredentials: true,
          }
        )
        .then(() => navigate("/locations", { replace: true }));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-[100%] bg-slate-50 ">
      <p className="mt-3">
        {" "}
        <Link to={"/highlights"} className="p-3 ">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>{" "}
      </p>

      <h3 className=" text-xl font-bold border-b-[1px] text-center pb-2">
        Highlight Profile
      </h3>
      <div
        className="flex flex-col md:flex-nowrap lg:flex-nowrap  flex-wrap gap-5 
          border-[1px] max-w-[700px] mx-auto shadow-lg mt-9 rounded-lg bg-slate-200 p-5"
      >
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="firstName">Name</label>
            {Location && (
              <input
                id="Name"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) =>
                  setLocation({ ...Location, LocationName: e.target.value })
                }
                value={Location.LocationName}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="">City Image</label>
            <br />
            {Location && (
              <>
                {" "}
                <img
                  src={`../../${Location.LocImage}`}
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
            <span className="p-2 border-[1px] cursor-pointer mt-3 rounded-xl bg-slate-100  hover:bg-slate-300 shadow-md text-xl">
              <Link to={"/locations"}>
                <button>Cancel</button>{" "}
              </Link>
            </span>

            <span
              onClick={updateLocation}
              className="p-2 border-[1px] cursor-pointer mt-3 rounded-xl ml-9 bg-slate-100 hover:bg-slate-400 hover:text-white shadow-md text-xl"
            >
              Update
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationAdminUp;
