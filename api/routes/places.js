import {
  getPlaces,
  getsingleCity,
  getActivity,
  getHighlight,
} from "../controllers/places.js";

import express from "express";
const router = express.Router();
router.get("/all", getPlaces);
router.get("/:CityId", getsingleCity);
router.get("/cityactivity/:CityId", getActivity);
router.get("/cityhighlight/:CityId", getHighlight);
export default router;
