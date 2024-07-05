import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../Context/authContext";
import countryLanguages from "../Data/Languages";
import Nationalities from "../Data/Nationality";
import reg from "../../public/reg5.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Register() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
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
  const [errpass, seterrpass] = useState("");
  const handleSelectLanguages = (S) => {
    setLanguages(S);
  };
  const selectedLanguages = languages.map((option) => option.value);
  React.useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser) return navigate("/", { replace: true });
  }, [currentUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        fname,
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
        "http://localhost:3000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
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

  const CheckPass = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length <= 6) {
      seterrpass("Password must be greater than 6 characters.");
    } else if (!/[a-zA-Z]/.test(newPassword)) {
      seterrpass("Password must contain at least one letter.");
    } else {
      seterrpass("");
    }
  };

  return (
    <div className="mt-4">
      <span className="mt-7  p-4 pt-4 mx-2 mb-6">
        {" "}
        <Link to={"/"} className="px-5 pt-6">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </span>
      <div className="flex  bg-slate-50 border-[1px]  justify-center align-middle shadow-2xl rounded-xl max-h-[1000px] sm:max-h-[850px]   mb-5 w-fit  mx-auto mt-[50px] ">
        {" "}
        <div className="flex justify-between">
          <div></div>
          <div className="flex flex-col gap-3 px-5 p-3 mb-10   my-2  rounded-lg max-w-[600px]">
            <h1 className="font-serif text-2xl text-center font-bold text-green-900">
              Sign Up
            </h1>
            <div></div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                  name="fname"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lname"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
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
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
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
                  type="phone"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  onChange={CheckPass}
                  type="password"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="cpassword">Confirm password</label>
                <input
                  id="cpassword"
                  type="password"
                  className="border-[1px] border-slate-200 rounded-md px-2 py-1"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <span className="text-red-600 p-2 ">{error}</span>}
            {errpass && <span className="text-red-600 p-2 ">{errpass}</span>}
            <button
              onClick={handleSubmit}
              className={`flex justify-center mx-auto p-2 w-[50%] text-center align-middle rounded-xl mt-2 ${
                errpass
                  ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                  : "bg-slate-300 hover:bg-gray-300"
              }`}
              disabled={!!errpass}
            >
              Sign up
            </button>
            <div className="flex flex-1 justify-center gap-2">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="text-blue-600">Login</span>
              </Link>
            </div>
          </div>
        </div>
        <img
          src={reg}
          alt=""
          className=" w-[400px]  rounded-lg sm:block hidden"
        />
      </div>
    </div>
  );
}

export default Register;
