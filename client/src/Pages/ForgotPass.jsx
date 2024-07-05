import React from "react";
import { Link } from "react-router-dom";
function ForgotPass() {
  return (
    <div>
      <div className="forgot-form bg-slate-100 w-[300px] p-5 rounded-lg flex flex-col mt-[200px] justify-center align-middle mx-auto">
        <h2 className="font-bold">Forgot Password? </h2>
        <p className="pb-4 pt-4">Enter Your Email: </p>
        <input type="email" />
        <Link to={"/resetpass"}>
          <button className="bg-slate-200 w-[60%] flex justify-center align-middle mt-5 rounded-lg mx-auto  p-3 font-bold">
            Send
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPass;
