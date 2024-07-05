import { db } from "../../db.js";
export const AddLocation = (req, res) => {
  const { Name, imgUrl } = req.body;
  const d = [Name, imgUrl];
  console.log(d);
  const q1 = "INSERT INTO `location`(`LocationName`, `LocImage`) VALUES (?)";
  db.query(q1, [d], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Inserted Successfully");
  });
};

export const GetLocations = (req, res) => {
  const q1 = "SELECt * FROM `location`";
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};
export const DeleteLocation = (req, res) => {
  const locid = req.paras.id;
  const q1 = `DELETE FROM location WHERE LocationID =?`;
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfuly");
  });
};
export const GetLocation = (req, res) => {
  const cityid = req.query.h;
  const q1 = `SELECT * FROM location WHERE LocationID = ?`;
  db.query(q1, [cityid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};
export const UpdateLocation = (req, res) => {
  const newloc = req.body;
  const locid = req.params.id;
  let values = [newloc.LocationName, newloc.LocImage, locid];
  console.log(locid);
  console.log(values);
  const q1 =
    "UPDATE `location` SET `LocationName`= ?,`LocImage`=? WHERE LocationID =?";
  db.query(q1, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("UPDATED SUCCESSFULLY");
  });
};
