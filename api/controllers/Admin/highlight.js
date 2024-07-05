import { db } from "../../db.js";

export const AddHighlight = (req, res) => {
  const { Name, Details, Cityid, imgUrl, imgUrl1 } = req.body;
  let values = [[Name, Details, Cityid, imgUrl, imgUrl1]];
  const q1 =
    "INSERT INTO `cityhighlight`( `HighlightName`, `Details`, `City_fk`, `img1`, `img2`) VALUES ?";
  db.query(q1, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json("Highlight Inserted Successfully");
  });
};
export const GetHighlights = (req, res) => {
  const q1 = `SELECT HighlightID,HighlightName,img1 FROM cityhighlight `;
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};
export const DeleteHighlight = (req, res) => {
  const highlightid = req.params.id;
  const q1 = "DELETE FROM cityhighlight WHERE HighlightID = ?";
  db.query(q1, [highlightid], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json("Deleted Successfully");
  });
};
export const GetHighlight = (req, res) => {
  const hid = req.query.h;
  const q1 =
    "SELECT ch.*, c.Name AS CityName FROM cityhighlight ch JOIN city c ON ch.City_fk = c.CityID WHERE ch.HighlightID = ?";
  db.query(q1, hid, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};
export const UpdateHighlight = (req, res) => {
  const updatedHighlightData = req.body;
  const highlight = req.params.id;
  console.log(highlight);
  let values = [
    updatedHighlightData.HighlightName,
    updatedHighlightData.Details,
    updatedHighlightData.City_fk,
    updatedHighlightData.img1,
    updatedHighlightData.img2,
    highlight, // HighlightID
  ];
  const q1 =
    "UPDATE `cityhighlight` SET `HighlightName`=?, `Details`=?, `City_fk`=?, `img1`=?, `img2`=? WHERE HighlightID = ?";
  db.query(q1, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
