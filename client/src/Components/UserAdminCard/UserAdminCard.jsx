import axios from "axios";
import { UserParticipants } from "../../Pages";
import { useState } from "react";
function UserAdminCard({
  UserParticipants: {
    full_name,
    phone_number,
    nb_of_People_with,
    Payment_Status,
    UserID,
    Trip_fk,
  },
}) {
  const [status, setStatus] = useState(Payment_Status); // Initialize status state with Payment_Status

  async function ChangeStatus() {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/trips/updatepayment/${UserID}`,
        { Trip_fk, nb_of_People_with },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // If the request is successful
        setStatus("Paid"); // Update status state to "Paid"
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=" border-b-2  flex mb-4 p-3  gap-8 justify-between flex-wrap align-middle w-[100%] ">
      <div className="flex gap-8 text-center  align-middle ">
        {UserParticipants && (
          <h3 className="align-middle font-bold mt-5">{full_name}</h3>
        )}
      </div>
      <div className="flex gap-4">
        {" "}
        <p className="mt-5 flex gap-2 flex-col flex-wrap ">
          {UserParticipants && <p>Phone: {phone_number}</p>}
          {UserParticipants && (
            <p>
              Number of People with:{" "}
              <span className="font-bold">{nb_of_People_with}</span>
            </p>
          )}
        </p>
        <p className="mt-5 flex gap-2 flex-col flex-wrap  border-l-[3px] pl-4 border-slate-500">
          {UserParticipants && (
            <p>
              Payment Status:{" "}
              <span className="text-red-500">
                <button
                  className={`border-slate-400 border-[2px] cursor-pointer p-2 rounded-md hover:bg-red-200 ${
                    status === "Paid" &&
                    "bg-green-500 text-gray-300 hover:bg-green-500 cursor-none"
                  }`}
                  onClick={ChangeStatus}
                  disabled={status === "Paid"}
                >
                  {status}
                </button>
              </span>
            </p>
          )}{" "}
        </p>
      </div>
    </div>
  );
}

export default UserAdminCard;
