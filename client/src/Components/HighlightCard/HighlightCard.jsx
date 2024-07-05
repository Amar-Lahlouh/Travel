// import l2 from "../../assets/gallery1.jpg";
// import g2 from "../../assets/gallery2.jpg";
// function HighlightCard({ id, img1, img2, name, details }) {
//   return (
//     <div
//       className=" bg-slate-50 max-w-[350px] flex flex-col align-middle justify-center border-[2px] rounded-[20%] shadow-lg   border-[1px]shadow-xl  m-2 "
//       key={id}
//     >
//       {" "}
//       <div className="highlight-card-images flex  sm:flex-row pt-3  justify-center align-middle gap-5  max-h-[300px]">
//         <img
//           src={`../../${img1}`}
//           alt=""
//           className=" rounded-[30%] w-[150px] h-[170px]"
//         />
//         <img
//           src={`../../${img2}`}
//           alt=""
//           className=" rounded-[30%] sm:block hidden mt-7 w-[150px] h-[170px]"
//         />
//       </div>{" "}
//       <div className=" ">
//         <h3 className="font-bold px-3 text-xl mt-3 text-center mb-2">{name}</h3>
//         <div className="hightlight-card-text  mx-auto px-4  pb-6 max-w-[300px]">
//           {details}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HighlightCard;
import React from "react";

function HighlightCard({ id, img1, img2, name, details }) {
  return (
    <div
      className="relative bg-white max-w-xs flex flex-col items-center justify-center border-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 m-4 overflow-hidden"
      key={id}
    >
      <div className=" flex justify-center items-center gap-4">
        <img
          src={`../../${img1}`}
          alt=""
          className=" rounded-sm w-[130px] h-[140px] object-cover border-4 border-white shadow-lg"
        />
        <img
          src={`../../${img2}`}
          alt=""
          className="rounded-sm w-[130px] h-[140px] object-cover border-4 border-white shadow-lg"
        />
      </div>
      <div className=" px-4 text-center ">
        <h3 className="font-bold text-xl text-gray-800 mt-3 mb-2">{name}</h3>
        <div className="highlight-card-text text-gray-600 mx-auto pb-6 max-w-[300px]">
          {details}
        </div>
      </div>
    </div>
  );
}

export default HighlightCard;
