import express from "express";
import { GetTrips, GetParticipants } from "../controllers/guide.js";
const router = express.Router();

router.get("/gettrips/:guide", GetTrips);
router.get("/getusers/:id", GetParticipants);
export default router;
