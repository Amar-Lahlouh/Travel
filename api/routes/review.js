import { setReview, AllReviews } from "../controllers/reviews.js";
import express from "express";

const router = express.Router();

router.post("/insertreview", setReview);
router.get("/getAll", AllReviews);
export default router;
