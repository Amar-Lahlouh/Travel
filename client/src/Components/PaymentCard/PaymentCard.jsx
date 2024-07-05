import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function PaymentCard({ payment, onDeletePayment }) {
  useEffect(() => {
    async function DeletePay() {
      const date1 = new Date();
      const TripDate = new Date(payment.tripDetails.Last_Payment_Date);
      if (date1 > TripDate) {
        TimeExceeded();
      }
    }
    DeletePay();
  }, []);

  const TimeExceeded = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/trips/deletereserve/exceedtime/${payment.tripDetails.TripID}`,
        {
          withCredentials: true,
        }
      );
      onDeletePayment(payment.tripDetails.TripID);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropPayment = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/trips/deletereserve/${payment.tripDetails.TripID}`,
        {},
        {
          withCredentials: true,
        }
      );
      onDeletePayment(payment.tripDetails.TripID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    payment.Cancellation_status !== 1 && (
      <div className="flex w-fit max-w-[780px] flex-col md:flex-row shadow-xl rounded-md text-center md:flex-nowrap flex-wrap  mt-4 mx-auto">
        <div className="flex align-middle border-[1px] p-1 sm:p-4">
          <img
            src={payment.tripDetails.Trip_Image}
            alt=""
            className="max-w-[200px] aspect-[16/9] object-cover"
          />
        </div>
        <div className="border-[1px]">
          <h3 className="border-b-2 p-4 pb-4 font-bold">Trip Name:</h3>
          <p className="mt-8 text-center"> {payment.tripDetails.TripName}</p>
        </div>
        {payment.Payment_Status !== "Paid" && (
          <div className="border-[1px]">
            <h3 className="border-b-2 p-4 pb-4 font-bold">Last Payment:</h3>
            <p className="mt-8 text-center">
              {new Date(
                payment.tripDetails.Last_Payment_Date
              ).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="border-[1px]">
          <h3 className="border-b-2 p-4 pb-4 font-bold">Payment Status:</h3>
          <p className="mt-8 text-center">{payment.Payment_Status}</p>
        </div>
        <div className="border-[1px]">
          <h3 className="border-b-2 p-4 pb-4 font-bold">Total Payment:</h3>
          <p className="mt-8 text-center">{payment.Total_Payment} $</p>
        </div>
        {payment.Payment_Status !== "Paid" && (
          <div className="border-[1px]">
            <h3 className="border-b-2 pt-4 pb-8 font-bold">Drop</h3>
            <FontAwesomeIcon
              icon={faTrashCan}
              size="2x"
              className=" px-2  mt-4 pt-3 cursor-pointer"
              onClick={handleDropPayment}
            />
          </div>
        )}
      </div>
    )
  );
}

export default PaymentCard;
