import { Link, useNavigate, useParams } from "react-router-dom";
import g1 from "../assets/gallery1.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import res from "../../public/registrt.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function ReservePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const tripid = useParams().tripid;
  const userid = currentUser?.user?.UserID;
  const [nmbrofPeople, setnmbrofPeople] = useState(0);
  const [Allreserve, setAllreserve] = useState([]);
  const [err, setError] = useState("");
  const [numtrue, setnumtrue] = useState(false);
  useEffect(() => {
    console.log("currentUser", currentUser);
    async function GetReserve() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/trips/reserve/${tripid}`,
          {
            withCredentials: true,
          }
        );
        console.log("res.data reserve", res.data);

        setAllreserve(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (currentUser) GetReserve();
  }, [currentUser]);
  const [TotalPayment, setTotalPayment] = useState(
    Allreserve.trip ? Allreserve.trip.Total_Price : 0
  );

  useEffect(() => {
    if (Allreserve.trip) {
      // Calculate base price
      const basePrice = Allreserve.trip.Total_Price;

      // Check if the input field of number of people is empty
      if (!nmbrofPeople.toString().length) {
        setError("Please Choose a Number"); // Reset error message
        setTotalPayment(basePrice); // Set total payment as base price only
      } else if (nmbrofPeople < 0) {
        setError("Please enter a non-negative number.");
      } else {
        // Calculate total payment with additional peoplbae
        const totalPayment = +basePrice + +nmbrofPeople * basePrice;
        setTotalPayment(totalPayment);

        // Check if the number of people exceeds available seats
        const availableSeats =
          Allreserve.trip.Nbr_of_Seats - Allreserve.trip.NumPeople_In_it;
        if (nmbrofPeople > availableSeats) {
          setError(`Maximum number of available seats is ${availableSeats}.`);
        } else {
          setError(""); // Reset error message
        }
      }
    }
  }, [nmbrofPeople, Allreserve.trip]);

  let data = {
    tripid,
    userid,
    nmbrofPeople,
    TotalPayment,
  };
  const CheckNumber = async () => {
    if (!err) {
      try {
        console.log(data);
        console.log("hooo");
        const res = await axios.post(
          "http://localhost:3000/api/trips/confirmreserve",
          data,
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }

      navigate(`/payment`, { replace: true });
    }
  };

  return (
    <>
      {/* <Link to={"/singletrip/:id"} className="px-5">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link> */}
      <div className="shadow-2xl  bg-slate-100 border-1 rounded-md w-fit mx-auto mt-[50px] pb-4">
        <div className="flex justify-center align-middle gap-6  ">
          <div>
            {" "}
            <fieldset className="border-[1px] flex  p-4 mx-4 mt-5">
              <legend className="font-bold text-xl checknoww">
                Personal Details
              </legend>

              <div className="flex flex-wrap  md:flex-nowrap  justify-between align-middle gap-4 px-3">
                <div className="flex flex-col justify-center align-middle gap-3">
                  {" "}
                  <div className="mt-2 px-1">
                    <label htmlFor="" className="px-1">
                      First Name:{" "}
                    </label>
                    {Allreserve.user && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3  py-1 rounded-lg text-gray-400"
                        value={Allreserve.user.Fname}
                      />
                    )}
                  </div>
                  <div className="flex felx-col justify-center align-middle gap-3">
                    <label htmlFor="" className="px-1">
                      Last Name:{" "}
                    </label>
                    {Allreserve.user && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3   py-1 rounded-lg text-gray-400"
                        value={Allreserve.user.Lname}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 justify-center align-middle gap-3">
                  {" "}
                  <div className="mt-2 px-1">
                    <label htmlFor="">Email: </label>
                    {Allreserve.user && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={Allreserve.user.Email}
                      />
                    )}
                  </div>
                  <div className="flex felx-col">
                    <label htmlFor="">Age: </label>
                    {Allreserve.user && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={Allreserve.user.Age}
                      />
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="border-[1px] flex sm:flex-row flex-col p-4 mx-4 mt-5">
              <legend className="font-bold text-xl checknoww">
                Trips Details
              </legend>
              <div className="flex  sm:flex-nowrap flex-wrap justify-between align-middle">
                <div className="mb-2 ">
                  <h3 className="mb-2">
                    <span className="font-bold px-2">Name:</span>
                    {Allreserve.trip && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={Allreserve.trip.TripName}
                      />
                    )}
                  </h3>
                  <h3>
                    <span className="font-bold px-2">Date:</span>
                    {Allreserve.trip && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={new Date(
                          Allreserve.trip.Date_of_Trip
                        ).toLocaleDateString()}
                      />
                    )}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap justify-between align-middle">
                <div>
                  <h3 className="mb-2">
                    <span className="font-bold px-2 mb-2">
                      Point of meeting:
                    </span>
                    {Allreserve.trip && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={Allreserve.trip.Point_of_meeting}
                      />
                    )}
                  </h3>
                  <h3>
                    <span className="font-bold px-2 mb-2">Nbr of Seats:</span>
                    {Allreserve.trip && (
                      <input
                        type="text"
                        readOnly
                        className="border-[1px] px-3 py-1 rounded-lg text-gray-400"
                        value={Allreserve.trip.Nbr_of_Seats}
                      />
                    )}
                  </h3>
                </div>
              </div>
            </fieldset>
            <div className="mt-4">
              <h3 className="italic text-lg pl-2">
                How Many People are with You?
              </h3>
              <p className="px-3">
                {" "}
                {Allreserve.trip && (
                  <input
                    type="number"
                    className="px-2 py-1 border-[1px] mt-2 w-full rounded-lg"
                    max={Allreserve.trip.Nbr_of_Seats}
                    min={0}
                    onChange={(e) => setnmbrofPeople(e.target.value)}
                    pattern="[0-9]*"
                    required
                    value={nmbrofPeople}
                  />
                )}
              </p>

              <p className="pt-3 px-2">Total Payment:{TotalPayment} $</p>
            </div>
            {err && <span className="text-red-500">{err}</span>}
          </div>
          <div className="p-5 pt-9 md:block hidden">
            <img src={res} className="w-[360px]" alt="" />
          </div>
        </div>

        <button
          className={`bg-gray-300 border-[1px] p-3  flex justify-center align-middle  mx-auto mb-2 rounded-lg ${
            err ? "text-gray-500" : ""
          }`}
          onClick={CheckNumber}
          disabled={!!err} // Disable button if there is an error
        >
          Reserve Now
        </button>
      </div>
    </>
  );
}

export default ReservePage;
