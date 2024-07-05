import { db } from "../db.js";
export const getPlaces = (req, res) => {
  const q = "SELECT * from city";

  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json({ data });
  });
};
export const getsingleCity = (req, res) => {
  const id = req.params.CityId; //get  id from the link nfs esm
  console.log(id);
  const q1 = `
  SELECT *, (
    SELECT COUNT(*) FROM trip t2 WHERE t2.City_fk = CityID AND t2.Date_of_Trip > NOW()
  ) AS nbr_of_trips FROM city WHERE CityID = ?
  `;

  db.query(q1, id, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length == 0) {
      return res.status(404).json("No city Found");
    }
    // const city = data[0]; //return the first city only

    return res.status(200).json(data);
  });
};

export const getActivity = (req, res) => {
  const p1 = req.params.CityId;
  console.log("ac id");
  console.log(p1);
  const q = "SELECT * FROM cityactivity WHERE City_fk = ?";
  db.query(q, p1, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data });
  });
};
export const getHighlight = (req, res) => {
  const p2 = req.params.CityId;
  const q = "SELECT * FROM cityhighlight WHERE City_fk = ?";
  db.query(q, p2, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data });
  });
};
