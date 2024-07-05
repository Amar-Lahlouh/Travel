import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { redirect } from "react-router-dom";
export const register = (req, res) => {
  //const history = useHistory();
  // Check if user exists
  const {
    fname,
    lname,
    username,
    email,
    password,
    nationality,
    languages,
    age,
    Phone,
    confirmpassword,
  } = req.body;
  console.log(req.body);
  if (
    !fname ||
    !lname ||
    !username ||
    !email ||
    !password ||
    !nationality ||
    !languages ||
    !age ||
    !Phone ||
    !confirmpassword
  )
    return res.status(403).json("All field are required!");

  const q = "SELECT * FROM user WHERE Email = ? OR username = ?";
  db.query(q, [email, username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) return res.status(409).json("User already exists");
    // if (password.length < 6) {
    //   return res.status(400).json("Password should be at least 4 characters.");
    // }

    if (confirmpassword !== password) {
      return res.status(400).json("Passwords don't match.");
    }

    // Hashing the Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const insertQuery =
      "INSERT INTO   `user`(`Fname`, `Lname`, `username`, `Email`, `Nationality`, `Phonee`, `Password`, `Age`, `Role`) VALUES ?";
    const values = [
      [
        fname,
        lname,
        username,
        email,
        nationality.value,
        Phone,
        hash, // Use the hashed password here
        age,
        "2", // Assuming '2' represents the role for a regular user
      ],
    ];

    const q2 = db.query(insertQuery, [values], async (err, data) => {
      console.log(q2.data);
      if (err) {
        console.error("Error querying the database:", err);
        return res.status(500).json(err);
      }
      const inseredUserQ = "SELECT UserID FROM user where username = ?";
      const q3 = db.query(inseredUserQ, [username], (err, userData) => {
        console.log("userData", userData);
        const insertLanguagesQuery =
          "INSERT INTO `spoken_languages` (`userID`, `language`) VALUES ?";
        const languagesValues = languages.map((language) => [
          userData[0].UserID,
          language,
        ]);
        console.log(languagesValues);
        console.log(db.query.toString);
        db.query(insertLanguagesQuery, [languagesValues], (err) => {
          if (err) {
            // Handle error
            return res.status(500).json(err);
          }

          return res
            .status(200)
            .json("User and spoken languages successfully inserted");
        });
      });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json("All Fields Are Required! ");
  }
  const q1 = "SELECT * FROM user WHERE Email = ?";
  db.query(q1, [email], (err, data) => {
    if (err) return res.json(err);
    // Check if user exists
    if (data.length === 0) {
      return res.status(404).json("User Doesn't Exist.");
    }
    const user = data[0];
    // Check if password is correct
    const ComparePassword = bcrypt.compareSync(password, data[0].Password);
    if (!ComparePassword) {
      return res.status(400).json("Password is Incorrect. Try Again.");
    }

    //Access Token
    const accesstoken = jwt.sign(
      { userid: user.UserID, role: user.Role },
      "jwt-access-token-secret-key",
      { expiresIn: "1d" }
    );
    //Refresh Token
    const Refreshtoken = jwt.sign(
      { userid: user.UserID, role: user.Role },
      "jwt-refresh-token-secret-key",
      { expiresIn: "7d" }
    );
    //for security everyuser hs a token
    res.cookie("accessToken", accesstoken, { maxAge: 1000 * 60 * 60 * 24 });
    //refreshtoken so that user no need to login everytime
    res.cookie("refreshToken", Refreshtoken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ user });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json("User has been logged out.");
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  // console.log("req.cookies", req.cookies);
  let exist = false;

  if (!refreshToken) return res.json({ valid: false, message: "No Token" });

  jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
    if (err) return res.json({ valid: false, message: "INVALID" });
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = jwt.sign(decoded, "jwt-access-token-secret-key", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(decoded, "jwt-refresh-token-secret-key", {
      expiresIn: "7d",
    });
    res.cookie("accessToken", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    exist = true;
    res.json({ valid: true });
  });
};

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "amarlahlouh5@gmail.com",
//     pass: "ypzn yfta hphy rbpv",
//   },
// });

// var mailOptions = {
//   from: "amarlahlouh5@gmail.com",
//   to: email,
//   subject: "Lebanon Paradise Tours Registeration",
//   text: "Thank you for Registering to Our Website",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
