import React from "react";
import { Link } from "react-router-dom";
function ResetPass() {
  return (
    <div>
      <div className="forgot-form bg-slate-100 w-[300px] p-5 rounded-lg flex flex-col mt-[200px] justify-center align-middle mx-auto">
        <h2 className="font-bold">Reset Your Password </h2>
        <p className="pb-4 pt-4">Password: </p>
        <input type="password" />
        <p className="pb-4 pt-4"> Confirm Password: </p>
        <input type="password" />
        <Link to={"/"}>
          <button className="bg-slate-200 w-[60%] flex justify-center align-middle mt-5 rounded-lg mx-auto  p-3 font-bold">
            Reset
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ResetPass;
