import { db } from "../../db.js";

export const AddTrip = (req, res) => {
  const {
    Name,
    whatsapp,
    imgUrl,
    Nbr_of_trips,
    Point,
    LastDate,
    DateTrip,
    Details,
    Price,
    Seat,
    Start,
    End,
    Cityid,
    Guideid,
    selectedguides,
  } = req.body;

  const tripValues = [
    Name,
    whatsapp,
    imgUrl,
    DateTrip,
    LastDate,
    Point,
    Details,
    Price,
    Cityid,
    Start,
    End,

    Seat,
  ];

  const q1 =
    "INSERT INTO `trip`(`TripName`,`whatsapp`, `Trip_Image`, `Date_of_Trip`, `Last_Payment_Date`, `Point_of_meeting`, `Details`, `Total_Price`, `City_fk`, `Start_Hour`, `End_Hour`, `Nbr_of_Seats`) VALUES (?)";

  db.query(q1, [tripValues], (err, tripData) => {
    if (err) {
      return res.status(500).json(err);
    }

    const tripID = tripData.insertId;

    const q2 = "INSERT INTO guideness (`Trip_fk`, `User_fk`) VALUES ?";

    const languagesValues = selectedguides.map((g) => [tripID, g]);
    console.log(languagesValues);
    db.query(q2, [languagesValues], (err, guideData) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Inserted Successfully");
    });
  });
};

export const GetTrips = (req, res) => {
  const q = "SELECT TripName,TripID,Trip_Image FROM trip";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data });
  });
};

export const DeleteTrip = (req, res) => {
  const tripid = req.params.id;

  const q1 = `SELECT city_fk FROM trip WHERE TripID = ?`;
  db.query(q1, [tripid], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    const city_fk = result[0].city_fk;

    const q2 = `UPDATE city SET nbr_of_trips = nbr_of_trips - 1 WHERE CityID = ?`;
    db.query(q2, [city_fk], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Delete the trip from the trip table
      const q3 = `DELETE FROM trip WHERE TripID = ?`;
      db.query(q3, [tripid], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Deleted Success");
      });
    });
  });
};

export const GetUsers = (req, res) => {
  const tripid = req.params.id;
  console.log(tripid, "tripid");
  const q1 = `SELECT CONCAT(u.Fname, ' ', u.Lname) AS full_name,u.UserID, u.Phonee AS phone_number,r.Payment_Status,r.Trip_fk, r.nb_of_People_with
  FROM reservation r
  JOIN user u ON r.User_fk = u.UserID
  WHERE r.Trip_fk = ?  AND r.Cancellation_status !=1;
  `;

  db.query(q1, [tripid], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data, "data");
    return res.status(200).json({ data });
  });
};

export const GetTrip = (req, res) => {
  const id = req.params.id;
  const q1 = `SELECT * FROM trip WHERE TripID = ?`;
  db.query(q1, [id], (err, tripData) => {
    if (err) return res.status(500).json(err);

    const q2 = `
      SELECT g.User_fk, u.fname, u.lname 
      FROM guideness g
      JOIN user u ON g.User_fk = u.UserID
      WHERE g.Trip_fk = ?
    `;
    db.query(q2, [id], (err, guideData) => {
      if (err) return res.status(500).json(err);
      const data = { tripData, guideData };
      console.log(data);
      return res.status(200).json({ data });
    });
  });
};
