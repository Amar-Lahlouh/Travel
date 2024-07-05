import express from "express";
import {
  GetTrips,
  GetAllLocation,
  GetReservePage,
  ConfirmReserve,
  GetPaymentDetails,
  DeleteReserve,
  ExceedTime,
  GetMyTrips,
  CheckReserve,
  UpdatePayment,
  GetFriends,
  Expired,
  ExpiredDatabase,
  UpExpire,
  ByLang,
  Like,

  // DropPayment,
} from "../controllers/trip.js";
import { VerifyAuth } from "../middlewares/VerifyAuth.js";
const router = express.Router();
router.get("/all", GetTrips);
router.get("/singletrip/:id", GetAllLocation);

router.use(VerifyAuth);
router.delete("/deletereserve/exceedtime/:tripid", ExceedTime);
// router.get("/guides", GetGuidesForTrip);
router.get("/paymentDetails", GetPaymentDetails);
router.get("/getmytrips", GetMyTrips);
router.put("/updatepayment/:id", UpdatePayment);
router.post("/confirmreserve", ConfirmReserve);
router.put("/deletereserve/:id", DeleteReserve);
router.get("/checkreserve/:tripid", CheckReserve);

router.get("/reserve/:tripid", GetReservePage);
// router.delete("/droppayment/:id", DropPayment);
router.get("/friends/:id", GetFriends);
router.put("/expired/:id", Expired);
router.put("/expireddatabase/:id", ExpiredDatabase);
router.put("/upexpire/:id", UpExpire);
// router.get("/alltripsexpire", GetTripsExpire);
router.get("/bylang", ByLang);
router.post("/like", Like);
export default router;
