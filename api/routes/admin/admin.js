import {
  GetGuides,
  GetGuide,
  UpdateGuide,
  DeleteGuide,
  InsertGuide,
} from "../../controllers/Admin/guide.js";
import {
  AddCity,
  AllCities,
  DeleteCity,
  GetCity,
  UpdateCity,
} from "../../controllers/Admin/city.js";
import express from "express";
import {
  AddHighlight,
  DeleteHighlight,
  GetHighlights,
  GetHighlight,
  UpdateHighlight,
} from "../../controllers/Admin/highlight.js";
import {
  AddActivity,
  GetActivities,
  DeleteActivity,
  GetActivity,
  UpdateActivity,
} from "../../controllers/Admin/activity.js";
import {
  AddLocation,
  GetLocations,
  DeleteLocation,
  GetLocation,
  UpdateLocation,
} from "../../controllers/Admin/location.js";
import {
  AddTrip,
  GetTrips,
  DeleteTrip,
  GetUsers,
  GetTrip,
} from "../../controllers/Admin/trip.js";
import { AddPath, GetPaths, DeletePath } from "../../controllers/Admin/path.js";

const router = express.Router();
router.get("/Guides", GetGuides);
router.get("/getguide", GetGuide);
router.put("/updateguide/:id", UpdateGuide);
router.delete("/deleteguide/:id", DeleteGuide);
router.post("/insertguide", InsertGuide);
// CRUD FORC CITY
router.post("/addcity", AddCity);
router.get("/getcities", AllCities);
router.delete("/deletecity/:id", DeleteCity);
router.get("/getcity", GetCity);
router.put("/updatecity/:id", UpdateCity);

// CRUD FOR highlight
router.post("/addhighlight", AddHighlight);
router.get("/gethighlights", GetHighlights);
router.delete("/deletehighlight/:id", DeleteHighlight);
router.get("/gethighlight", GetHighlight);
router.put("/updatehighlight/:id", UpdateHighlight);

// CRUD FOR ACTIVITY
router.post("/addactivity", AddActivity);
router.get("/getactivities", GetActivities);
router.delete("/deleteactivity/:id", DeleteActivity);
router.get("/getactivity", GetActivity);
router.put("/updateactivity/:id", UpdateActivity);

// CRUD FOR LOCATION
router.post("/addlocation", AddLocation);
router.get("/getlocations", GetLocations);
router.delete("/deleteactivity/:id", DeleteLocation);
router.get("/getLocation", GetLocation);
router.put("/updatelocation/:id", UpdateLocation);

// CRUD FOR TRIP
router.post("/addtrip", AddTrip);
router.get("/gettrips", GetTrips);
router.delete("/deletetrip/:id", DeleteTrip);
router.get("/gettrip/:id", GetTrip);
router.get("/getusers/:id", GetUsers);

// CRUD FOR PATH
router.post("/addpath", AddPath);
router.get("/getpaths", GetPaths);
router.delete("/deletepath/:id", DeletePath);
export default router;
