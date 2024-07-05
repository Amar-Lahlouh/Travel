import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../Context/authContext";
import countryLanguages from "../Data/Languages";
import Nationalities from "../Data/Nationality";
import f1 from "../../public/profilee.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Profile() {
  const navigate = useNavigate();

  const handleSelectLanguages = (selectedLanguages) => {
    console.log("selected lang", selectedLanguages);
    setUser({ ...user, languages: selectedLanguages });
  };

  const { currentUser, setCurrentUser } = useContext(AuthContext);
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
        alert("You msut specify at least one spooken language");
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

      //
      setCurrentUser({ user });

      navigate("/", { replace: true });

      console.log("Bye");
    } catch (err) {
      console.log(err);
    }
  }
  // console.log("user language", user.languages);
  return (
    <>
      <Link to={"/"} className="px-5 mt-5">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" className="mt-2" />
      </Link>

      <div className=" flex  shadow-2xl flex-wrap w-fit  mx-auto  gap-4 rounded-[5%] justify-center align-middle mt-[50px] ">
        <div className="flex flex-col gap-5   rounded-lg  p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex  flex-col gap-3 justify-center align-middle">
              <div className="py-2">
                <label htmlFor="">Username:</label>
                <br />
                {user && (
                  <input
                    type="text"
                    disabled
                    value={user.username}
                    className="text-gray-300  bg-gray-50 rounded-[10px] border-[1px] px-1"
                  />
                )}
              </div>
              <div>
                <label htmlFor="">Last Name:</label>
                <br />
                {user && (
                  <input
                    type="text"
                    className="text-gray-300 rounded-[10px] border-[1px] px-1"
                    value={user.Lname}
                    onChange={(e) =>
                      setUser({ ...user, Lname: e.target.value })
                    }
                  />
                )}
              </div>
              <div>
                <label htmlFor="">First Name:</label>
                <br />
                {user && (
                  <input
                    type="text"
                    className="text-gray-400 rounded-[10px] border-[1px] px-1"
                    value={user.Fname}
                    onChange={(e) =>
                      setUser({ ...user, Fname: e.target.value })
                    }
                  />
                )}
              </div>
            </div>

            {/* Nationality and Language */}
            <div className="flex flex-col gap-3 justify-center align-middle">
              <div>
                <label htmlFor="">Email:</label>
                <br />
                {user && (
                  <input
                    type="email"
                    disabled
                    value={user.Email}
                    className="text-gray-400 rounded-[10px] border-[1px] px-1"
                  />
                )}
              </div>

              <div>
                <label htmlFor="">Age:</label>
                <br />
                {user && (
                  <input
                    type="number"
                    className="text-gray-400 rounded-[10px] border-[1px] px-1"
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
                    className="text-gray-400 rounded-[10px] border-[1px] px-1"
                    value={user.Phonee}
                    onChange={(e) =>
                      setUser({ ...user, Phonee: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center align-middle">
            {" "}
            <div>
              <label htmlFor="">Nationality:</label>
              <br />
              {user && (
                <Select
                  options={Nationalities}
                  placeholder="Select Nationality"
                  value={{ value: user.Nationality, label: user.Nationality }}
                  onChange={handleSelectChange}
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
          <div className="flex gap-3 justify-center align-middle">
            <div className="mt-5">
              <br />
              <span className="p-2 border-[1px] mt-3 rounded-xl bg-gray-200 hover:bg-gray-400 text-xl">
                <Link to={"/"}>
                  <button>Cancel</button>{" "}
                </Link>
              </span>
              <span
                className="p-2 border-[1px] mt-3 rounded-xl ml-9 bg-gray-300 hover:bg-gray-400 text-xl cursor-pointer"
                onClick={UpdateUser}
              >
                Update
              </span>
            </div>
          </div>
        </div>
        <img
          src={f1}
          className="w-[300px] sm:block hidden rounded-[5%]"
          alt=""
        />
      </div>
    </>
  );
}
export default Profile;
