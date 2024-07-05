import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import serv1 from "../assets/serv1.jpg";
import countryLanguages from "../Data/Languages";
import { AuthContext } from "../Context/authContext";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Nationalities from "../Data/Nationality";
function GuidAdminUpProf() {
  const [languages, setLanguages] = useState([]);
  const handleSelectLanguages = (selectedLanguages) => {
    //setUser({ ...user, languages: selectedLanguages });
    setLanguages(selectedLanguages);
  };

  console.log("bye");
  const { username } = useParams();
  const guideusernam = username.split("/").pop();
  console.log(guideusernam);
  const [user, setUser] = useState({});

  //Get Guide Data
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getguide?guidee=${guideusernam}`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data[0]);
        const userLanguages = res.data.map((userData) => ({
          value: userData.language,
          label: userData.language,
        }));
        setLanguages(userLanguages);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [guideusernam]);

  //ENd of guide data
  console.log(user);
  //to get nationality Value
  const handleSelectChange = (selected) => {
    setUser({ ...user, Nationality: selected.value });
  };

  //end of nationality value

  //Update User
  async function UpdateUser() {
    try {
      const updatedUser = {
        ...user,
        languages: languages.map((language) => language.value),
      };

      console.log("HI");
      const res = await axios.put(
        `http://localhost:3000/api/admin/updateguide/${guideusernam}`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      console.log("Bye");
    } catch (err) {
      console.log(err);
    }
  }
  //end of update

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
        GuideLine Profile
      </h3>
      <div className="flex md:flex-nowrap lg:flex-nowrap  flex-wrap gap-5 flex-col border-[1px] max-w-[700px]  mx-auto shadow-lg mt-9 rounded-lg bg-slate-200 p-5">
        <div className="">
          <div className="flex gap-8 md:flex-nowrap lg:flex-nowrap  flex-wrap justify-center align-middle">
            <div className="p-1">
              <label htmlFor="" className="text-md">
                Username:
              </label>
              <br />
              {user && (
                <input
                  type="text"
                  disabled
                  value={user.username}
                  className="text-gray-500 mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                />
              )}
            </div>
            <div className="p-1">
              <label htmlFor="" className="text-md">
                Email:
              </label>
              <br />
              {user && (
                <input
                  type="email"
                  disabled
                  value={user.Email}
                  className="text-gray-500 mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                />
              )}
            </div>
          </div>
          <div className="flex gap-8  md:flex-nowrap lg:flex-nowrap  flex-wrap justify-center align-middle">
            <div className="p-1">
              <label htmlFor="">First Name:</label>
              <br />
              {user && (
                <input
                  type="text"
                  className=" mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                  value={user.Fname}
                  onChange={(e) => setUser({ ...user, Fname: e.target.value })}
                />
              )}
            </div>
            <div className="p-1">
              <label htmlFor="">Last Name:</label>
              <br />
              {user && (
                <input
                  type="text"
                  className=" mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                  value={user.Lname}
                  onChange={(e) => setUser({ ...user, Lname: e.target.value })}
                />
              )}
            </div>
          </div>

          {/* Nationality and Language */}
          <div className="flex gap-8 md:flex-nowrap lg:flex-nowrap  flex-wrap justify-center align-middle">
            <div className="p-1">
              <label htmlFor="">Age:</label>
              <br />
              {user && (
                <input
                  type="number"
                  className=" mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                  value={user.Age}
                  onChange={(e) => setUser({ ...user, Age: e.target.value })}
                />
              )}
            </div>
            <div className="p-1">
              <label htmlFor="" className="p-1">
                Phone:
              </label>
              <br />
              {user && (
                <input
                  type="text"
                  className=" mt-1 p-1 shadow-sm rounded-md bg-slate-50  border-[1px]"
                  value={user.Phonee}
                  onChange={(e) => setUser({ ...user, Phonee: e.target.value })}
                />
              )}
            </div>
          </div>
          <div className="flex  md:flex-nowrap lg:flex-nowrap  flex-wrap  gap-8 justify-center align-middle">
            {" "}
            <div className="p-1">
              <label htmlFor="">Nationality:</label>
              <br />
              {user && (
                <Select
                  options={Nationalities}
                  className=""
                  placeholder="Select Nationality"
                  value={{ value: user.Nationality, label: user.Nationality }}
                  onChange={handleSelectChange}
                />
              )}
            </div>
            {user && (
              <div className="p-1">
                <label htmlFor="">Spoken Language:</label>
                <br />
                <Select
                  options={countryLanguages}
                  isMulti
                  className=""
                  onChange={handleSelectLanguages}
                  value={languages.map((language, index) => ({
                    value: language.value,
                    label: language.label,
                    key: `${language.value}-${index}`, // Ensure each key is unique
                  }))}
                  placeholder="Languages"
                />
              </div>
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
            <Link to={"/guides"} onClick={UpdateUser}>
              <span className="p-2 border-[1px] mt-3 rounded-xl ml-9 bg-slate-100 hover:bg-slate-400 hover:text-white shadow-md text-xl">
                Update
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidAdminUpProf;
