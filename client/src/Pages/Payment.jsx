import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PaymentCard from "../Components/PaymentCard/PaymentCard";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Payment() {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser?.user?.UserID;
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
        setPaymentDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetPayments();
  }, []);

  const handleDeletePayment = (tripID) => {
    setPaymentDetails(
      paymentDetails.filter((payment) => payment.tripDetails.TripID !== tripID)
    );
  };

  // if (!paymentDetails.length)
  //   return <p className="absolute top-[50%]">No Payments at this time</p>;

  const pendingPayments = paymentDetails.filter(
    (payment) => payment.Payment_Status === "Pending"
  );

  return (
    <div>
      <h3 className=" pay text-center text-2xl pt-5 font-serif font-bold mb-[70px]">
        Payment Page
      </h3>
      <Link to={"/"} className="px-5">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <Link
        to={"/paidpay"}
        className="border-[2px] p-3  hover:text-gray-500 hover:bg-gray-200 rounded-lg absolute right-20 top-[155px]"
      >
        Paid Trips
      </Link>

      <h3 className="font-bold text-center px-5 mt-4">
        For Any Payments Please Check The Payment Method in Home Page Thank You!
      </h3>
      {/* {pendingPayments.length === 0 && (
        <p className=" absolute top-[50%]">No Payments Right Now</p>
      )} */}

      <div className="mt-[90px]">
        {pendingPayments.length > 0 ? (
          pendingPayments.map((payment, index) =>
            payment.Cancellation_status !== 1 ? (
              <PaymentCard
                key={index}
                payment={payment}
                onDeletePayment={handleDeletePayment}
              />
            ) : null
          )
        ) : (
          <p className=" text-2xl mx-auto  flex justify-center align-middle mt-9  ">
            No Payments Right Now
          </p>
        )}
      </div>
    </div>
  );
}

export default Payment;
