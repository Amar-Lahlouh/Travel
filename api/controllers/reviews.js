import { db } from "../db.js";
export const setReview = (req, res) => {
  const { rating, userid, cityid, details } = req.body;
  console.log(rating);
  console.log(userid);
  console.log(cityid);
  const values = [[rating, userid, cityid, details]];

  const q1 =
    "INSERT INTO `review`( `Nbr_of_Stars`, `User_fk`, `City_fk`, `ReviewDetails`) VALUES ? ";
  db.query(q1, [values], (err, data) => {
    console.log("work");
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};

export const AllReviews = (req, res) => {
  const cityid = req.query.cityid; // to get it from the url in front end in POST we Use req.body
  console.log(cityid);
  const q1 = `
    SELECT review.*, user.username
    FROM review
    INNER JOIN user ON review.User_fk = user.UserID
    WHERE review.City_fk = ? 
    ORDER BY Date DESC
  `; //joining tables to get username also from user table
  db.query(q1, [cityid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};
