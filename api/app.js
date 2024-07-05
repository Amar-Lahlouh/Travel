import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import placeRoutes from "./routes/places.js";
import UserRoutes from "./routes/user.js";
import reviewRoutes from "./routes/review.js";
import TripRoutes from "./routes/trip.js";
import GuideRoutes from "./routes/guide.js";
import AdminGuideRoute from "./routes/admin/admin.js";
import { VerifyAuth } from "./middlewares/VerifyAuth.js";
import { VerifyGuideline } from "./middlewares/VerifyGuideline.js";
import { VerifyAdmin } from "./middlewares/VerifyAdmin.js";
import multer from "multer";
const app = express();
import { config } from "dotenv";
config();

app.listen(3000, () => console.log("Server is running on port 3000.\n"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// IMAGE START UPLOAD

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
//hu name file bkun zetu mwjud bl formData
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file);
  res.status(200).json(file?.filename);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

// IMAGE END UPLOAD
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);

// required auth
// client
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/trips", TripRoutes);
app.use(VerifyAuth);
app.use("/api/user", UserRoutes);
// guideline
app.use("/api/guide", VerifyGuideline, GuideRoutes);
// admin
app.use("/api/admin", VerifyAdmin, AdminGuideRoute);

// app.get("/test", (req, res) => {
//   res.json("Not work");
// });

process.on("uncaughtException", (e) => {
  console.error(e);
});

process.on("uncaughtExceptionMonitor", (e) => {
  console.error(e);
});
