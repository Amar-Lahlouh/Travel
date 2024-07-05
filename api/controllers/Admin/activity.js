import { db } from "../../db.js";
export const AddActivity = (req, res) => {
  const { Name, Details, Safety, imgUrl, Cityid } = req.body;
  const values = [Name, Details, Safety, Cityid, imgUrl];
  console.log(values);
  const q1 =
    "INSERT INTO `cityactivity`(`ActivityName`, `ActivityDetails`, `Safety_Level`, `City_fk`, `Activity_Img`) VALUES (?)";
  db.query(q1, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json("Inserted Successfully");
  });
};
export const GetActivities = (req, res) => {
  const q1 = `SELECT ActivityName, ActivityID ,Activity_Img FROM cityactivity `;
  db.query(q1, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};
export const DeleteActivity = (req, res) => {
  const activityid = req.params.id;
  console.log(activityid);
  const q1 = "DELETE FROM cityactivity WHERE ActivityID = ?";
  db.query(q1, [activityid], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json("Deleted Successfully");
  });
};
export const GetActivity = (req, res) => {
  const activityid = req.query.h; //read it from link
  console.log(activityid);
  const q1 = `
  SELECT ca.*, c.Name 
  FROM cityactivity ca
  INNER JOIN city c ON ca.City_fk = c.CityID 
  WHERE ca.ActivityID = ?;
`;
  db.query(q1, [activityid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};
export const UpdateActivity = (req, res) => {
  const updatedActivitytData = req.body;
  const actiivity = req.params.id;

  let values = [
    updatedActivitytData.ActivityName,
    updatedActivitytData.ActivityDetails,
    updatedActivitytData.Safety_Level,
    updatedActivitytData.City_fk,
    updatedActivitytData.Activity_Img,
    actiivity,
  ];
  const q1 =
    "UPDATE `cityactivity` SET `ActivityName`=?,`ActivityDetails`=?,`Safety_Level`=?,`City_fk`=?,`Activity_Img`=? WHERE ActivityID =?";
  db.query(q1, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
