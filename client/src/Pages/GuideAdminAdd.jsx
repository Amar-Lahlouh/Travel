import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import countryLanguages from "../Data/Languages";
import Nationalities from "../Data/Nationality";
function GuideAdminAdd() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [Phone, setPhone] = useState();
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [languages, setLanguages] = useState([]);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const handleSelectLanguages = (S) => {
    setLanguages(S);
  };
  const selectedLanguages = languages.map((option) => option.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        fname,
        address,
        lname,
        username,
        email,
        password,
        nationality,
        languages: selectedLanguages,
        age,
        Phone,
        confirmpassword,
      };
      const response = await axios.post(
        "http://localhost:3000/api/admin/insertguide",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/guides");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Set the error to the response data directly
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };
  const handleSelectChange = (selected) => {
    setNationality(selected);
  };
  return (
    <div className="w-[100%] mx-auto mr-2 bg-slate-50">
      <div className="pt-3">
        {" "}
        <Link to={"/guides"} className="p-4 pt-6 mt-2">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </div>

      <div className="max-w-[700px] mx-auto ">
        {" "}
        <div className=" shadow-lg flex flex-col gap-3 px-5  p-3 mb-10  bg-slate-200 border-[1px]  my-2 rounded-lg ">
          <h1 className="font-serif text-2xl text-center font-bold text-gray-800">
            Add a GuideLine
          </h1>
          <div></div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="firstName">first name</label>
              <input
                id="firstName"
                type="text"
                name="fname"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="lastName">last name</label>
              <input
                id="lastName"
                type="text"
                name="lname"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                name="username"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="age">age</label>
              <input
                id="age"
                type="number"
                name="age"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="email">email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Phone Number: </label>
              <input
                id="phone"
                name="phone"
                className="border-[2px] rounded-md p-1"
                type="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="phone">Address: </label>
              <input
                id="address"
                name="address"
                className="border-[2px] rounded-md p-1"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="languages">spoken languages</label>
              <Select
                options={countryLanguages}
                isMulti
                onChange={handleSelectLanguages}
                value={languages}
                placeholder="languages"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="nationality">nationality</label>
              <Select
                options={Nationalities}
                placeholder="nationality"
                value={nationality}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1">
              <label htmlFor="cpassword">confirm password</label>
              <input
                id="cpassword"
                type="password"
                className="border-[2px] rounded-md p-1"
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default GuideAdminAdd;
