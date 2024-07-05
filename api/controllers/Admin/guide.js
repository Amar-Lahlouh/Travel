import { db } from "../../db.js";
import bcrypt from "bcryptjs";
export const GetGuides = (req, res) => {
  const q1 = `SELECT UserID as id,username,Phonee, CONCAT(Fname, ' ', Lname) AS name
    FROM user
    WHERE Role = 1;
    `;

  db.query(q1, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const GetGuide = (req, res) => {
  let id = req.query.guidee;

  const q1 = `
  SELECT u.*, s.language
  FROM user u
  LEFT JOIN spoken_languages s ON u.UserID = s.userID
  WHERE u.UserID = ?
`;
  db.query(q1, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const UpdateGuide = (req, res) => {
  const id = req.params.id; // Assuming the username is passed in the params
  const updatedUserData = req.body;

  // Separate the languages from the updated user data
  const { languages, ...userData } = updatedUserData;
  if (!languages.length)
    return res.status(400).json({ message: "spoken languages required" });

  // Update the user data in the 'user' table
  db.query(
    "UPDATE `user` SET `Fname` = ?, `Lname` = ?, `Email` = ?, `Nationality` = ?, `Phonee` = ?, `Role` = ?, `Age` = ? WHERE `UserID` = ?",
    [
      userData.Fname,
      userData.Lname,
      userData.Email,
      userData.Nationality,
      userData.Phonee,
      userData.Role,
      userData.Age,
      id,
    ],
    (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).json("Error updating user");
      }

      // Now update the languages in the 'spoken_languages' table
      // Delete existing languages for the user

      db.query(
        "DELETE FROM spoken_languages WHERE userID = ?",
        [id],
        (deleteError, deleteResult) => {
          if (deleteError) {
            console.error(deleteError);
            return res.status(500).json("Error deleting existing languages");
          }

          // Insert the updated languages for the user
          console.log("languages", languages);

          // Insert multiple rows into 'spoken_languages' table
          languages.forEach((lang) => {
            db.query(
              "INSERT INTO spoken_languages (`userId`, `language`) VALUES (?, ?)",
              [id, lang], // Passing the language values array as a single parameter
              (insertError, insertResult) => {
                if (insertError) {
                  console.error("insertError", insertError);
                  return res.status(500).json(insertError);
                }
              }
            );
          });
          return res
            .status(200)
            .json("User and languages updated successfully");
        }
      );
    }
  );
};
export const DeleteGuide = (req, res) => {
  const guideId = req.params.id;
  const sql = "DELETE FROM user WHERE UserID = ?";
  db.query(sql, [guideId], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json("Deleted Successfully");
  });
};

export const InsertGuide = (req, res) => {
  const {
    fname,
    lname,
    username,
    address,
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
    !address ||
    !username ||
    !email ||
    !password ||
    !nationality ||
    !languages ||
    !age ||
    !Phone ||
    !confirmpassword
  )
    return res.status(403).json({
      message: "all field required!",
    });

  const q = "SELECT * FROM user WHERE Email = ? OR username = ?";
  db.query(q, [email, username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) return res.status(409).json("User already exists");
    if (password.length < 4) {
      return res.status(400).json("Password should be at least 4 characters.");
    }

    if (confirmpassword !== password) {
      return res.status(400).json("Passwords don't match.");
    }

    // Hashing the Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const insertQuery =
      "INSERT INTO `user`(`Fname`, `Lname`,`Address`, `username`, `Email`, `Nationality`, `Phonee`, `Password`, `Age`, `Role`) VALUES ?";
    const values = [
      [
        fname,
        lname,
        address,
        username,
        email,
        nationality.value,
        Phone,
        hash, // Use the hashed password here
        age,
        "1",
      ],
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json(err);
      }

      const userId = data.insertId;

      const insertLanguagesQuery =
        "INSERT INTO `spoken_languages` (`userID`, `language`) VALUES ?";
      const languagesValues = languages.map((language) => [userId, language]);
      db.query(insertLanguagesQuery, [languagesValues], (err) => {
        if (err) {
          console.error("Error inserting languages:", err);
          return res.status(500).json(err);
        }

        return res
          .status(200)
          .json("User and spoken languages successfully inserted");
      });
    });
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

// export const DeleteGuide = (req, res) => {
//   const { id } = req.params;
//   const q1 = "DELETE FROM user WHERE UserID = ?";
//   db.query(q1, [id], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("Deleted Successfully");
//   });
// };
