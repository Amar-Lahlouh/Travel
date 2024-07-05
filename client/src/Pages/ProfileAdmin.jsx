import React, { useContext, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../Context/authContext";
import countryLanguages from "../Data/Languages";
import Nationalities from "../Data/Nationality";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function ProfileAdmin() {
  const [languages, setLanguages] = useState([]);
  const handleSelectLanguages = (selectedLanguages) => {
    //setUser({ ...user, languages: selectedLanguages });
    setLanguages(selectedLanguages);
  };

  const { currentUser, logout } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser?.user); //everything we rerite in the input fields will be directly changed in the User

  React.useEffect(() => {
    setUser(currentUser?.user);
  }, [currentUser]);

  const handleSelectChange = (selected) => {
    setUser({ ...user, Nationality: selected.value });
  };

  async function UpdateUser() {
    try {
      if (!user.languages.length) {
        alert("You must specify at least one spooken language");
        return;
      }
      console.log("HI");
      const res = await axios.put(
        `http://localhost:3000/api/user/updateuser`,
        user,
        {
          withCredentials: true,
        }
      );
      getUser();
      alert("Successfully Updated");
      return;
      // navigate("/", { replace: true });
      console.log("Bye");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-5  border-[1px] max-w-[700px] mx-auto mt-9 rounded-xl shadow-md bg-slate-50 p-5">
        <h3 className="text-center text-xl">Admin Profile</h3>
        <div className="">
          <div className="flex gap-3 justify-center align-middle">
            <div>
              <label htmlFor="">Username:</label>
              <br />
              {user && (
                <input
                  type="text"
                  disabled
                  value={user.username}
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                />
              )}
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <br />
              {user && (
                <input
                  type="email"
                  disabled
                  value={user.Email}
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-center align-middle">
            <div>
              <label htmlFor="">First Name:</label>
              <br />
              {user && (
                <input
                  type="text"
                  disabled
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                  value={user.Fname}
                  onChange={(e) => setUser({ ...user, Fname: e.target.value })}
                />
              )}
            </div>
            <div>
              <label htmlFor="">Last Name:</label>
              <br />
              {user && (
                <input
                  type="text"
                  disabled
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                  value={user.Lname}
                  onChange={(e) => setUser({ ...user, Lname: e.target.value })}
                />
              )}
            </div>
          </div>

          {/* Nationality and Language */}
          <div className="flex gap-3 justify-center align-middle">
            <div>
              <label htmlFor="">Age:</label>
              <br />
              {user && (
                <input
                  type="number"
                  disabled
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                  value={user.Age}
                  onChange={(e) => setUser({ ...user, Age: e.target.value })}
                />
              )}
            </div>
            <div>
              <label htmlFor="">Phone:</label>
              <br />
              {user && (
                <input
                  type="text"
                  disabled
                  className="text-gray-400 px-2 mb-2 py-1 border-[1px] rounded-lg border-gray-400"
                  value={user.Phonee}
                  onChange={(e) => setUser({ ...user, Phonee: e.target.value })}
                />
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-center align-middle">
            {" "}
            <div>
              <label htmlFor="">Nationality:</label>
              <br />
              {user && (
                <Select
                  options={Nationalities}
                  disabled
                  className="text-gray-400"
                  placeholder="Select Nationality"
                  value={{ value: user.Nationality, label: user.Nationality }}
                  //  onChange={handleSelectChange}
                />
              )}
            </div>
            {user && (
              <div>
                <label htmlFor="">Spoken Language:</label>
                <br />
                <Select
                  options={countryLanguages}
                  isMulti
                  disabled
                  onChange={handleSelectLanguages}
                  value={
                    user.languages
                      ? user.languages.map((language, index) => ({
                          value: language.label,
                          label: language.label,
                          key: `${language.value}-${index}`,
                        }))
                      : []
                  }
                  placeholder="Languages"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 justify-center align-middle">
          <div className="mt-5">
            <br />
            {/* <span className="p-2 border-[1px] mt-3 rounded-xl bg-slate-400 text-xl">
      <Link to={"/"}>
        <button>Cancel</button>{" "}
      </Link>
    </span> */}
            {/* <Link to={"/"}>
      <span
        className="p-2 border-[1px] mt-3 rounded-xl ml-9 bg-slate-400 text-xl"
        onClick={UpdateUser}
      >
        Update
      </span>
    </Link> */}
            <Link
              className="px-5 py-3 border-[1px] bg-red-100 text-red-500 hover:bg-red-50 font-semibold  rounded-md"
              onClick={logout}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
