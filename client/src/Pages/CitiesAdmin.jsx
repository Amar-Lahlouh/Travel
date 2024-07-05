import React, { useState, useEffect } from "react";
import CityCard from "../Components/CityCard/CityCard";
import { Link } from "react-router-dom";
import axios from "axios";

function CitiesAdmin() {
  const [AllCities, setAllCities] = useState([]);
  useEffect(() => {
    async function GetCities() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/getcities",
          {
            withCredentials: true,
          }
        );
        console.log("res.data.data", res.data.data);
        // console.log(res.data.data);
        setAllCities(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetCities();
  }, []);
  const onDeleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/deletecity/${id}`, {
        withCredentials: true,
      });
      const newCities = AllCities.filter((c) => c.CityID != id);
      console.log("newCities", newCities);
      setAllCities(newCities);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(AllCities);
  return (
    <div className="w-[100%]">
      <h3 className="text-xl border-[1px] shadow-md p-4 text-center">Cities</h3>
      <div>
        <Link to={"/cityadminadd"} className=" flex justify-end mr-4">
          {" "}
          <button className=" bg-slate-200 p-2 text-md rounded-lg my-5 shadow-sm hover:bg-gray-400 hover:text-white">
            Add new City
          </button>
        </Link>
      </div>
      <div className="flex justify-center align-middle">
        <input
          type="text"
          placeholder="Search By Name..."
          className="border-[1px] p-2 mt-4 rounded-lg outline-none"
        />
      </div>
      <div className="border-t-[2px] p-4 m-4">
        {AllCities.length > 0 ? (
          AllCities.map((city, index) => (
            <CityCard key={index} city={city} onDelete={onDeleteCity} />
          ))
        ) : (
          <p>No Cities available</p>
        )}
      </div>
    </div>
  );
}

export default CitiesAdmin;
