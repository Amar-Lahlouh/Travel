import { db } from "../db.js";

export const GetTrips = (req, res) => {
  const cityId = req.query.id;
  const q1 = `SELECT 
  t.TripID,
  t.TripName,
  t.Trip_Image,
  t.Details,
  t.Date_of_Trip,
  t.Start_Hour,
  t.End_Hour,
  t.Point_of_meeting AS Location,
  t.Total_Price,
  t.Nbr_of_Seats,
  t.NumPeople_In_it,
  t.City_fk,
  t.Last_Payment_Date,
  GROUP_CONCAT(DISTINCT CONCAT(user.Fname, ' ', user.Lname) SEPARATOR ', ') AS guides,
  GROUP_CONCAT(DISTINCT l.language SEPARATOR ', ') AS spoken_languages
FROM 
  trip t
LEFT JOIN 
  guideness AS guide ON guide.Trip_fk = t.TripID
LEFT JOIN 
  user ON guide.User_fk = user.UserID
LEFT JOIN 
  spoken_languages AS l ON l.userID = user.UserID
WHERE 
  t.City_fk = ?
GROUP BY 
  t.TripID;
`;

  db.query(q1, [cityId], (err, data) => {
    if (err || !data.length) {
      console.error("Error retrieving trips:", err);
      return res.status(500).json(err);
    }
    console.log("data", data);
    // jma3na l guides ma3 ba3ad 7asab l trip
    const guides = data.reduce((prev, current) => {
      // current: element in the array
      if (!prev[current.TripID]) prev[current.TripID] = [];
      if (current.guides) prev[current.TripID].push(current.guides);
      return prev;
    }, {}); // {}: prev
    console.log("guides", guides);
    // 7atayna l guides bl trips tab3on
    data = Object.entries(guides).map((g) => {
      const trip = data.find((d) => d.TripID == g[0]);
      trip.guides = g[1];
      return trip;
    });
    console.log(data);
    // done
    res.status(200).json({ data });
  });
};

export const GetAllLocation = (req, res) => {
  const tripid = req.params.id;
  const q1 = ` SELECT
    l.LocationID,
    l.LocationName AS LocationName,
    l.LocImage AS LocationImage,
    pt.order_of_location,
    pt.Details_of_location
FROM
    location l
JOIN
    path_trip pt ON l.LocationID = pt.location_fk
WHERE
    pt.Trip_fk = ?
ORDER BY
    pt.order_of_location`;

  db.query(q1, [tripid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};
// export const GetGuidesForTrip = (req, res) => {
//   const tripId = req.query.tripId;
//   const q1 = `SELECT u.Fname, u.Lname
//     FROM guideness g
//     JOIN user u ON g.User_fk = u.UserID
//     WHERE g.Trip_fk = ?;
//     `;
//   db.query(q1, [tripId], (err, data) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).json(data);
//   });
// };

export const GetReservePage = (req, res) => {
  console.log("reserve route");
  const tripid = req.params.tripid;
  const userid = req.user.userid;
  console.log("tripid", tripid);
  console.log("userid", userid);

  // trip data
  const q1 = `
    SELECT *
    FROM trip
    WHERE tripid = ?;
  `;

  // user data
  const q2 = `
    SELECT Fname, Lname, Email, Age
    FROM user
    WHERE UserID = ?;
  `;

  db.query(q1, [tripid], (err1, data1) => {
    if (err1) {
      res.status(500).send(err);
      return;
    }

    db.query(q2, [userid], (err2, data2) => {
      if (err2) {
        res.status(500).send(err2);
        return;
      }

      if (data1.length === 0 || data2.length === 0) {
        res.status(404).send("Trip or user not found");
        return;
      }

      const tripInfo = data1[0];
      const userInfo = data2[0];

      const combinedData = {
        trip: tripInfo,
        user: userInfo,
      };
      console.log(combinedData);

      res.json(combinedData);
    });
  });
};
export const ConfirmReserve = (req, res) => {
  const { tripid, TotalPayment, nmbrofPeople } = req.body;
  const userid = req.user.userid;
  console.log(tripid, userid, TotalPayment, nmbrofPeople);
  let values = [
    [
      `${+userid}`,
      `${+tripid}`,
      new Date(),
      `Pending`,
      0,
      `${+nmbrofPeople}`,
      `${+TotalPayment}`,
    ],
  ];

  const q1 =
    "INSERT INTO `reservation`(`User_fk`, `Trip_fk`, `Date_of_Reserve`, `Payment_Status`, `Cancellation_status`, `nb_of_People_with`, `Total_Payment`) VALUES (?)";
  console.log(q1);
  db.query(q1, values, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json({ data });
  });
};

//   // const q2 = `
//   //   UPDATE trip
//   //   SET NumPeople_in_It = NumPeople_in_It + ?
//   //   WHERE TripID = ?;
//   // `;
//   // db.query(q2, [nmbrofPeople, tripid], (err2, data2) => {
//   //   if (err2) return res.status(500).json(err2);
//   return res.status(200).json("Reservation confirmed successfully.");
//   });
// };

export const GetPaymentDetails = (req, res) => {
  console.log("bey");
  const userid = req.user.userid;
  console.log("hi");
  console.log("userod", userid);
  // Query to fetch trip details for the user
  const tripQuery = `
    SELECT *
    FROM trip
    WHERE TripID IN (
      SELECT Trip_fk
      FROM reservation
      WHERE User_fk = ?
    )
  `;

  db.query(tripQuery, [userid], (err, tripData) => {
    if (err) {
      console.error("Error fetching trip details:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (tripData.length === 0) {
      return res.status(404).json("No reservations found for the user.");
    }

    // Query to fetch reservation details for the user
    const reservationQuery = `
      SELECT *
      FROM reservation
      WHERE User_fk = ?
    `;

    db.query(reservationQuery, [userid], (err, reservationData) => {
      if (err) {
        console.error("Error fetching reservation details:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      /**
       * reservationData: l reservations li 3andi mn dun data l trip (1)
       * 3mlt map 3laya w jbt data l trip 7asab l id (l foreign key) (2)
       * w zdt data l trip 3ala data l reservation (.tripDetails) (3)
       * w 3mlt return lal result (4)
       *
       * conclusion: jbt kl l trips w kl l reservations, zdt data l trip 3a kl reservation.
       */
      // (1)
      reservationData.map((r) => {
        const getTrip = tripData.find((t) => t.TripID == r.Trip_fk); // (2)
        r.tripDetails = getTrip; // (3)
        return r; // (4)
      });

      console.log(reservationData);
      res.status(200).json(reservationData);
    });
  });
};

export const DeleteReserve = (req, res) => {
  console.log("Start");
  const tripid = req.params.id;
  const number = req.query.nbr;
  const user = req.user.userid;
  console.log("DELETING CANCELLA");
  const q1 =
    "Update  reservation SET Cancellation_status=1 WHERE Trip_fk = ? AND User_fk= ?";
  db.query(q1, [tripid, user], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};
export const ExceedTime = (req, res) => {
  const trip = req.params.tripid;
  const user = req.user.userid;
  const q1 = "DELETE FROM reservation WHERE Trip_fk= ? AND User_fk =? ";
  db.query(q1, [trip, user], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Deleted Confirmed");
  });
};

export const GetMyTrips = (req, res) => {
  const user = req.user.userid;
  const q1 = `
    SELECT *
    FROM trip
    WHERE TripID IN (
      SELECT Trip_fk
      FROM reservation
      WHERE User_fk = ? 
    )`;
  db.query(q1, [user], (err, tripData) => {
    if (err) return res.status(500).json(err);

    const q2 = `
      SELECT *
      FROM reservation
      WHERE User_fk = ?
      AND Payment_Status = 'Paid'  
    `;

    db.query(q2, [user], (err, reservationData) => {
      if (err) return res.status(500).json(err);

      const q3 = `
      SELECT guideness.*,
             CONCAT(user.Fname, ' ', user.Lname) AS guide_name,
             user.Email AS guide_email,
             user.Phonee AS guide_phone
      FROM guideness
      LEFT JOIN user ON guideness.User_fk = user.UserID
      WHERE guideness.Trip_fk IN (
        SELECT Trip_fk
        FROM reservation
        WHERE User_fk = ? 
      )
    `;

      db.query(q3, [user], (err, guidelineData) => {
        if (err) return res.status(500).json(err);

        const reservationsWithTripDetails = reservationData.map(
          (reservation) => {
            // Find the corresponding trip details
            const tripDetail = tripData.find(
              (trip) => trip.TripID === reservation.Trip_fk
            );

            // Find the corresponding guidelines for the trip
            const tripGuidelines = guidelineData.filter(
              (guideline) => guideline.Trip_fk === tripDetail.TripID
            );

            reservation.tripDetails = tripDetail;
            reservation.guidelines = tripGuidelines;
            console.log(reservation);
            return reservation;
          }
        );

        console.log(reservationsWithTripDetails, "reservationdetails");
        return res.status(200).json(reservationsWithTripDetails);
      });
    });
  });
};
export const CheckReserve = (req, res) => {
  const { tripid } = req.params;
  const userid = req.user.userid;

  const query = `
    SELECT *
    FROM reservation
    WHERE User_fk = ? AND Trip_fk = ? AND Cancellation_status!=1;
  `;

  db.query(query, [userid, tripid], (err, result) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

// export const DropPayment = (req, res) => {
//   const id = req.params.id;
//   const userid = req.user.userid;
//   const q1 =
//     "DELETE FROM reservation WHERE Payment_Status = 'Paid' AND Res_ID = ? AND User_fk = ?";
//   db.query(q1, [id, userid], (err, data) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).json("Payment Deleted");
//   });
// };
export const UpdatePayment = (req, res) => {
  const userid = req.params.id;
  const { Trip_fk, nb_of_People_with } = req.body;
  let values = [nb_of_People_with, Trip_fk];
  const q1 = `UPDATE reservation
  SET Payment_Status = 'Paid'
  WHERE User_fk =?`;
  db.query(q1, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const q2 = `UPDATE trip 
    SET NumPeople_In_it =NumPeople_In_it + ?
    WHERE TripID = ?`;
    db.query(q2, [nb_of_People_with, Trip_fk], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json("UPDATED SUCCESSFULLY TO PAID AND NBR OF PEOPLE ADDED");
    });
  });
};

export const GetFriends = (req, res) => {
  const tripid = req.params.id;
  const q1 = `SELECT CONCAT(Fname, ' ', Lname) AS fullName,Nationality,Phonee
  FROM user
  INNER JOIN reservation ON user.UserID = reservation.User_fk
  WHERE reservation.Trip_fk = ?
  AND reservation.Payment_Status = 'Paid' AND Cancellation_Status!=1;`;

  db.query(q1, [tripid], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    return res.status(200).json({ data });
  });
};

export const Expired = (req, res) => {
  const cityfk = req.params.id;
  console.log("nice");
  const q = `
    UPDATE city
    SET nbr_of_trips = nbr_of_trips - 1
    WHERE CityID = ?
  `;
  db.query(q, [cityfk], (err, data) => {
    if (err) return res.status(500).json(err);

    console.log("workeddddd");
    return res.status(200).json("Expired trip ");
  });
};

export const ExpiredDatabase = (req, res) => {
  const tripid = req.params.id;
  console.log("CANCELLATION");
  const q1 = `Update trip Set Expiration = "Expired"  Where TripID = ?`;
  db.query(q1, [tripid], (err, data) => {
    if (err) res.status(500).json(err);
    console.log("DONE");
    return res.status(200);
  });
};

export const UpExpire = (req, res) => {
  console.log("epiree");
  const userid = req.user.userid;
  const tripid = req.params.id;
  console.log("tripid", tripid);
  const q1 = `UPDATE trip SET Availability ="Expired" WHERE   TripID =? `;
  db.query(q1, [tripid], (err, data) => {
    if (err) return res.status(500).json(500);
    console.log(q1);
    return res.status(200).json("CITY EXPIRED");
  });
};

export const ByLang = (req, res) => {
  const cid = req.query.id;
  const lang = req.query.lang;

  const q1 = `SELECT * FROM trip WHERE City_fk =? AND Availability != "Expired"`;
  db.query(q1, [cid], (err, data) => {
    if (err) return res.status(500).json(500);
    const tripIds = data.map((trip) => trip.TripID);

    return res.status(200).json({ data });
  });
};

export const Like = (req, res) => {
  const tripid = req.body.TripID;

  const userid = req.user.userid;
  const v = [tripid, userid];
  const q1 = "INSERT INTO `likes`(`Trip_fk`, `User_fk`) VALUES ( ?)";
  db.query(q1, [v], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("INSERTED");
  });
};
