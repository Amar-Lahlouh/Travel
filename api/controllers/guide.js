import { db } from "../db.js";
export const GetTrips = (req, res) => {
  const g = req.params.guide;
  console.log("g is", g);
  const q1 = `SELECT trip.*
FROM trip
INNER JOIN guideness ON trip.TripID = guideness.Trip_fk
WHERE guideness.User_fk = ?
`;
  db.query(q1, [g], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json(data);
  });
};

export const GetParticipants = (req, res) => {
  const tripid = req.params.id;
  console.log(tripid, "tripid");
  const q1 = `SELECT CONCAT(u.Fname, ' ', u.Lname) AS full_name, u.Phonee AS phone_number,r.Payment_Status, r.nb_of_People_with
  FROM reservation r
  JOIN user u ON r.User_fk = u.UserID
  WHERE r.Trip_fk = ? AND r.Cancellation_status !=1 ;
  `;

  db.query(q1, [tripid], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json({ data });
  });
};
