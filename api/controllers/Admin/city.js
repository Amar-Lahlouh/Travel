import { db } from "../../db.js";
export const AddCity = (req, res) => {
  const {
    Name,
    Governorate,
    Historical,
    Type,
    Nbr_of_trips,
    TimeVisit,
    Details,
    imgUrl,
    maplink,
  } = req.body;

  let values = [
    Governorate,
    maplink,
    imgUrl,
    Name,
    Details,
    Historical,
    Type,
    Nbr_of_trips,
    TimeVisit,
  ];
  console.log("values", values);
  const q1 =
    "INSERT INTO `city`( `governorate`,`maplink`, `CityImg`,`Name`, `CityDetails`, `Historical_Status`, `City_Type`, `nbr_of_trips`, `Time_To_Visit`) VALUES (?)";

  db.query(q1, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json("City Inserted Successfully");
  });
};
export const AllCities = (req, res) => {
  const q1 = "SELECT Name,CityID,CityImg from city";
  db.query(q1, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data });
  });
};

export const DeleteCity = (req, res) => {
  const cityid = req.params.id;
  const q1 = "DELETE FROM city WHERE CityID = ?";
  db.query(q1, [cityid], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json("Deleted Successfully");
  });
};

export const GetCity = (req, res) => {
  const cityid = req.query.city;
  const q1 = `SELECT *, (
    SELECT COUNT(*) FROM trip t2 WHERE t2.City_fk = CityID AND t2.Date_of_Trip > NOW()
  ) AS nbr_of_trips FROM city WHERE CityID = ?`;
  db.query(q1, cityid, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ data });
  });
};
export const UpdateCity = (req, res) => {
  const updatedCityData = req.body;
  const city = req.params.id;
  console.log(city);
  let values = [
    updatedCityData.governorate,
    updatedCityData.Name,
    updatedCityData.CityDetails,
    updatedCityData.Historical_Status,
    updatedCityData.City_Type,
    updatedCityData.nbr_of_trips,
    updatedCityData.CityImg,
    updatedCityData.Time_To_Visit,
    updatedCityData.maplink,
    city,
  ];
  const q1 =
    "UPDATE `city` SET `governorate`=? ,`Name`=?,`CityDetails`=?,`Historical_Status`=?, `City_Type`= ? ,`nbr_of_trips`=?,`CityImg`=?,`Time_To_Visit`=?,`maplink`=? WHERE CityID = ? ";
  db.query(q1, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
