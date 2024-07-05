// import React from "react";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import HighlightCard from "../Components/HighlightCard/HighlightCard";
// import FilterMenu from "../Components/FilterMenu/FilterMenu";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// function CityHighlight() {
//   let p2 = useParams().id;
//   const [AllHighlight, setAllHighlight] = useState([]);
//   useEffect(() => {
//     const GetHighlights = async () => {
//       try {
//         console.log("coo");
//         const res = await axios.get(
//           `http://localhost:3000/api/places/cityhighlight/${p2}`
//         );

//         setAllHighlight(res.data.data);
//         console.log(AllHighlight);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     GetHighlights();
//   }, []);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [filteredPlaces, setFilteredPlaces] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [showList, setshowList] = useState(false);
//   useEffect(() => {
//     // Filter places based on searchQuery
//     if (searchQuery) {
//       const filtered = AllHighlight.filter((p) =>
//         p.HighlightName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredPlaces(filtered);
//     } else {
//       // If no search query, show all places
//       setFilteredPlaces(AllHighlight);
//     }
//   }, [searchQuery, AllHighlight]);
//   function openshowFilter() {
//     setshowList(!showList);
//   }
//   return (
//     <div className="flex-1 bg-slate-100">
//       <h2 className=" highlight font-bold text-xl text-center p-3  italic ">
//         Highlights
//       </h2>{" "}
//       <div className="search-buttons flex  flex-wrap gap-4 px-2 py-4  justify-center align-middle ">
//         <div className="search-inputs ">
//           <input
//             type="text"
//             placeholder="Search by  Name..."
//             className="p-2 border-[1px]  rounded-lg mx-4  w-[300px] mt-8"
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="hightlights-content gap-4 px-4">
//         {filteredPlaces.map((c) => {
//           return (
//             <HighlightCard
//               id={c.HighlightID}
//               name={c.HighlightName}
//               details={c.Details}
//               img1={c.img1}
//               img2={c.img2}
//             />
//           );
//         })}
//       </div>
//       {/* <div>
//         <h3 className="m-3 text-lg">
//           Did you Like the City? Check Trips Here!{" "}
//           <button className="bg-slate-200  rounded-lg border-[1px] p-3 font-bold">
//             Check Now
//           </button>
//         </h3>
//       </div> */}
//     </div>
//   );
// }

// export default CityHighlight;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HighlightCard from "../Components/HighlightCard/HighlightCard";

function CityHighlight() {
  const { id: cityId } = useParams();
  const [allHighlight, setAllHighlight] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const getHighlights = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/places/cityhighlight/${cityId}`
        );
        setAllHighlight(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getHighlights();
  }, [cityId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allHighlight.filter((p) =>
        p.HighlightName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(allHighlight);
    }
  }, [searchQuery, allHighlight]);

  return (
    <div className="flex-1 bg-slate-100 min-h-screen">
      <h2 className="highlight font-bold  pt-4 pb-[40px] px-6 text-3xl italic font-serif text-center  text-gray-700">
        Highlights
      </h2>
      <div className="search-buttons flex flex-wrap gap-4 px-2 py-4 justify-center align-middle">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search by Name..."
            className="p-2 border-2 rounded-lg mx-4 w-[300px] mt-8"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="highlights-content flex flex-wrap justify-center gap-6">
        {filteredPlaces.map((c) => (
          <HighlightCard
            key={c.HighlightID}
            id={c.HighlightID}
            name={c.HighlightName}
            details={c.Details}
            img1={c.img1}
            img2={c.img2}
          />
        ))}
      </div>
    </div>
  );
}

export default CityHighlight;
