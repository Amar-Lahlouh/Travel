import { db } from "../db.js";
export const GetUser = (req, res) => {
  let id = req.params.id;

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

export const GetMe = (req, res) => {
  let id = req.user.userid;

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

//   const updatedUserData = req.body;

//   console.log(updatedUserData);
//   db.query(
//     "UPDATE user SET ? WHERE UserID = ?",
//     [updatedUserData, userId],
//     (error, data) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json("Error updating user");
//       } else {
//         res.status(200).json("User updated successfully");
//       }
//     }
//   );
// };
// export const UpdateUser = (req, res) => {
//   const { username } = req.params; // Assuming the username is passed in the params
//   const updatedUserData = req.body;
//   console.log("jiii");
//   console.log(username);
//   // Separate the languages from the updated user data
//   const { languages, ...userData } = updatedUserData;
//   // Update the user data in the 'user' table
//   db.query(
//     "UPDATE user SET ? WHERE username = ?",
//     [userData, username],
//     (error, data) => {
//       if (error) {
//         return res.status(500).json(error);
//       }
//       // Now update the languages in the 'spoken_languages' table
//       // Delete existing languages for the user
//       db.query(
//         "DELETE FROM spoken_languages WHERE username = ?",
//         [username],
//         (deleteError, deleteResult) => {
//           if (deleteError) {
//             console.error(deleteError);
//             return res.status(500).json("Error deleting existing languages");
//           }
//           // Insert the updated languages for the user
//           const languageValues = languages.map((language) => [
//             username,
//             language,
//           ]);
//           db.query(
//             "INSERT INTO spoken_languages (username, language) VALUES ?",
//             [languageValues],
//             (insertError, insertResult) => {
//               if (insertError) {
//                 console.error(insertError);
//                 return res
//                   .status(500)
//                   .json("Error inserting updated languages");
//               }
//               return res
//                 .status(200)
//                 .json("User and languages updated successfully");
//             }
//           );
//         }
//       );
//     }
//   );
// };
// export const UpdateUser = (req, res) => {
//   const { username } = req.params; // Assuming the username is passed in the params
//   const updatedUserData = req.body;

//   // Separate the languages from the updated user data
//   const { languages, ...userData } = updatedUserData;

//   // Update the user data in the 'user' table
//   db.query(
//     "UPDATE `user` SET `Fname` = ?, `Lname` = ?, `Email` = ?, `Nationality` = ?, `Phonee` = ?, `Role` = ?, `Age` = ? WHERE `username` = ?",
//     [
//       userData.Fname,
//       userData.Lname,
//       userData.Email,
//       userData.Nationality,
//       userData.Phonee,
//       userData.Role,
//       userData.Age,
//       username,
//     ],
//     (error, data) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json("Error updating user");
//       }

//       // Now update the languages in the 'spoken_languages' table
//       // Delete existing languages for the user
//       db.query(
//         "DELETE FROM spoken_languages WHERE username = ?",
//         [username],
//         (deleteError, deleteResult) => {
//           if (deleteError) {
//             console.error(deleteError);
//             return res.status(500).json("Error deleting existing languages");
//           }

//           // Insert the updated languages for the user
//           const languageValues = languages.map((language) => [
//             username,
//             language.value, // Assuming language.value contains the language value
//           ]);

//           // Flatten the languageValues array

//           db.query(
//             "INSERT INTO spoken_languages (`username`, `language`) VALUES ?",
//             [languages],
//             (insertError, insertResult) => {
//               if (insertError) {
//                 console.error(insertError);
//                 return res.status(500).json(insertError);
//               }
//               return res
//                 .status(200)
//                 .json("User and languages updated successfully");
//             }
//           );
//         }
//       );
//     }
//   );
// };
export const UpdateUser = (req, res) => {
  const id = req.user.userid;
  console.log("id of user", id);

  const updatedUserData = req.body;
  console.log("U=NEW USER", updatedUserData);
  // Separate the languages from the updated user data
  const { languages, ...userData } = updatedUserData;
  if (!languages.length)
    return res.status(400).json("spoken languages required");

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
        return res.status(500).json("Error updating user");
      }
      // console.log("updated user first");
      // Now update the languages in the 'spoken_languages' table
      // Delete existing languages for the user

      db.query(
        "DELETE FROM spoken_languages WHERE userID = ?",
        [id],
        (deleteError, deleteResult) => {
          if (deleteError)
            return res.status(500).json("Error deleting existing languages");

          // Insert multiple rows into 'spoken_languages' table
          languages.forEach((lang) => {
            const l = lang.label;
            console.log("l is", l);

            db.query(
              "INSERT INTO spoken_languages (`userID`, `language`) VALUES (?, ?)",
              [id, l], // Passing the language values array as a single parameter
              (insertError, insertResult) => {
                if (insertError) return res.status(500).json(insertError);
              }
            );
          });
          return res.status(200).json({
            message: "User and languages updated successfully",
          });
        }
      );
    }
  );
};
