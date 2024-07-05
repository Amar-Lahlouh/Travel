import { GetUser, UpdateUser, GetMe } from "../controllers/user.js";

import express from "express";
const router = express.Router();
router.get("/me", GetMe);
router.get("/getuser/:id", GetUser);
router.put("/updateuser", UpdateUser);
export default router;
