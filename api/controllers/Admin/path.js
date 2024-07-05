import { db } from "../../db.js";

export const AddPath = (req, res) => {
  const { Name, Details, Order, tripid, locid } = req.body;
  const values = [[tripid, locid, Order, Details, Name]]; // Wrap values in an array

  const q1 =
    "INSERT INTO `path_trip`(`Trip_fk`, `location_fk`, `order_of_location`, `Details_of_location`, `PathName`) VALUES ?";

  db.query(q1, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("Inserted Success");
  });
};
export const GetPaths = (req, res) => {
  const q1 = "SELECT PathName,PathID FROM path_trip";
  db.query(q1, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data });
  });
};

export const DeletePath = (req, res) => {
  const p = req.params.id;
  const q1 = "DELETE FROM path_trip WHERE PathID = ?";
  db.query(q1, [p], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("Delete Success");
  });
};
