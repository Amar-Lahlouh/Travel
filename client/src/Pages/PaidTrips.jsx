import React, { useContext, useEffect, useState } from "react";
import { PaymentCard } from "../Components";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";

function PaidTrips() {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser?.user?.UserID;
  console.log("userid", userid);
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    async function GetPayments() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/trips/paymentDetails`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setPaymentDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetPayments();
  }, []);

  const handleDeletePayment = async (tripID) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/trips/deletereserve/${tripID}`,
        {
          withCredentials: true,
        }
      );
      setPaymentDetails(
        paymentDetails.filter(
          (payment) => payment.tripDetails.TripID !== tripID
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // if (!paymentDetails.length)
  //   return <p className="absolute top-[50%] ">No Payments at this time</p>;

  const paidPayments = paymentDetails.filter(
    (payment) => payment.Payment_Status === "Paid"
  );

  return (
    <div>
      <h3 className=" pay text-center text-2xl pt-5 font-serif font-bold mb-[70px]">
        Paid Trips
      </h3>

      {/* <Link
        to={"/paidpay"}
        className="border-[2px] p-3 rounded-lg  absolute right-2 top-[95px] "
      >
        Paid Trips
      </Link> */}
      <Link to={"/payment"} className="px-5">
        {" "}
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>

      <p>
        {paidPayments.length ? (
          ""
        ) : (
          <p className="absolute top-[50%] left-[40%] text-2xl font-bold">
            No Payments Right Now
          </p>
        )}
      </p>
      <div className="mt-[40px]">
        {paidPayments.map((payment, index) => (
          <PaymentCard
            key={index}
            payment={payment}
            onDeletePayment={handleDeletePayment}
            user={userid}
          />
        ))}
      </div>
    </div>
  );
}

export default PaidTrips;
