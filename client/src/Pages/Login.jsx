import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import loginn from "../../public/reg3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, currentUser } = useContext(AuthContext);
  React.useEffect(() => {
    if (currentUser) return navigate("/", { replace: true });
  }, [currentUser]);

  const handleSubmit = async (e) => {
    // if (!password || !email) {
    //   setError("Please fill all the fields");
    // }
    let data = {
      email,
      password,
    };
    try {
      await login(data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Set the error to the response data directly
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="pt-4 rounded-md">
      <span className="mt-7  p-4 pt-4 mx-2">
        {" "}
        <Link to={"/"} className="px-5 pt-6">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
      </span>
      <div className="flex  bg-slate-50  justify-center align-middle shadow-2xl rounded-lg   w-fit  mx-auto mt-[50px] max-h-[450px]">
        <img src={loginn} alt="" className="w-[300px] sm:block hidden" />
        <div className=" flex pl-10  border-l-[1px] pt-12 align-middle p-7 ">
          <div className="flex flex-col  align-middle justify-center  gap-3 px-5  p-3 mb-10     rounded-lg ">
            <h1 className="font-serif text-2xl text-center font-bold login-title ">
              Login
            </h1>
            <div></div>
            <div className="flex flex-wrap gap-2 flex-col">
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="firstName">Email: </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="border-[1px] rounded-md p-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-1">
                <label htmlFor="lastName">Password:</label>
                <input
                  id="lastName"
                  required
                  type="password"
                  className="border-[1px] rounded-md p-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <span className="text-red-500">{error}</span>}
              <div className="flex justify-between gap-1 p-1">
                <div></div>
                <div>
                  <Link to={"/forgotpass"}>
                    <span className="text-blue-400">forgot password?</span>
                  </Link>
                </div>
              </div>
              <div className="flex text-center justify-center align-middle gap-1 p-1">
                <div>
                  <button
                    onClick={handleSubmit}
                    className="flex justify-center mx-auto p-2 bg-gray-200 w-[100px] ml-[0px]  border-[2px]   text-center align-middle rounded-xl  hover:bg-gray-400 hover:text-white"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-1 p-1 mt-3 ">
                <div className="mb-3">
                  Don't Have an Account?{" "}
                  <Link to={"/signup"}>
                    {" "}
                    <span className="text-blue-400">Signup</span>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
