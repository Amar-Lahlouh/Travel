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
function HighlightAdminUp() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Details, setDetails] = useState("");
  const [Governorate, setGovernorate] = useState("");
  const [Historical, setHistorical] = useState("");
  const [Type, setType] = useState("");
  const [Nbr_of_trips, setNbr_of_trips] = useState(0);
  const [File, setFile] = useState("");
  const [File1, setFile1] = useState("");
  const [error, setError] = useState("");
  const [Highlight, setHighlight] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);
  const handleSelectChange = (selectedOption) => {
    setHighlight({ ...Highlight, City_fk: selectedOption.value });
  };
  // const [AllCities, setAllCities] = useState([]);
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
  console.log("CITTYOPTIONS", cityOptions);
  const Highlightid = useParams().id;

  // get highlight data
  useEffect(() => {
    async function getHighlight() {
      try {
        const uploadedFileData = File?.name ? await upload() : Highlight.img1;
        const uploadedFile2Data = File1?.name
          ? await upload1()
          : Highlight.img2;
        const res = await axios.get(
          `http://localhost:3000/api/admin/gethighlight?h=${Highlightid}`,
          {
            withCredentials: true,
          }
        );
        setHighlight(res.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getHighlight();
  }, [Highlightid]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile(file); // Store the selected file in state
  };
  const handleFile2Change = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input
    setFile1(file); // Store the selected file in state
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
      console.log("data", res.data);
      console.log(File);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  async function updateHighlight() {
    try {
      const uploadedFileData = File?.name ? await upload() : Highlight.img1;
      const uploadedFile2Data = File1?.name ? await upload1() : Highlight.img2;

      await axios
        .put(
          `http://localhost:3000/api/admin/updatehighlight/${Highlightid}`,
          { ...Highlight, img1: uploadedFileData, img2: uploadedFile2Data },
          {
            withCredentials: true,
          }
        )
        .then(() => navigate("/highlights", { replace: true }));
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
            {Highlight && (
              <input
                id="Name"
                type="text"
                name="name"
                className="border-[2px] rounded-md p-1"
                onChange={(e) =>
                  setHighlight({ ...Highlight, HighlightName: e.target.value })
                }
                value={Highlight.HighlightName}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="lastName">City Name</label>
            <Select
              options={cityOptions}
              value={cityOptions.find(
                (option) => option.value === Highlight.City_fk
              )}
              onChange={(selectedOption) => {
                setHighlight({
                  ...Highlight,
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
            {Highlight && (
              <textarea
                className="border-[2px] rounded-md p-1 overflow-scroll "
                onChange={(e) =>
                  setHighlight({ ...Highlight, Details: e.target.value })
                }
                value={Highlight.Details}
                cols={10}
                rows={5}
              ></textarea>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="">City Image</label>
            <br />
            {Highlight && (
              <>
                {" "}
                <img src={`../../${Highlight.img1}`} alt="" width={"200px"} />
                <input
                  type="file"
                  className="max-w-[200px]"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-1">
            <label htmlFor="">City Image</label>
            <br />
            {Highlight && (
              <>
                {" "}
                <img src={`../../${Highlight.img2}`} alt="" width={"200px"} />
                <input
                  type="file"
                  className="max-w-[200px]"
                  onChange={handleFile2Change}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex md:flex-nowrap lg:flex-nowrap  flex-wrap  gap-8 justify-center align-middle">
          <div className="mt-5 p-1">
            <br />
            <span className="p-2 border-[1px] mt-3 rounded-xl bg-slate-100  hover:bg-slate-300 shadow-md text-xl">
              <Link to={"/"}>
                <button>Cancel</button>{" "}
              </Link>
            </span>

            <span
              onClick={updateHighlight}
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

export default HighlightAdminUp;
