import React, { useEffect } from "react";
import "./landing.css";
import home1 from "../../assets/home1.jpg";
import home3 from "../../assets/home3.jpg";
import home2 from "../../assets/image.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
function Landing() {
  //   return (
  //     <div className="landing pt-3 px-4 mt-4 mx-6">
  //       <div className="f1-image ">
  //         <img src={home1} className=" p-2 border-[1px]" alt="" />
  //       </div>
  //       <div className="title">
  //         <h2 className=" font-serif text-6xl font-semibold">
  //           Lebanon Paradise Tours
  //         </h2>
  //         <p className="tracking-wide">
  //           Lebanon Paradise Tours invites you to explore the breathtaking beauty
  //           and rich cultural heritage of Lebanon.
  //         </p>
  //         <Link to="/places">
  //           {" "}
  //           <button className="p-2 rounded-lg font-semibold  bg-gray-200 border-[1px]  border-gray-300 hover:bg-gray-400 hover:text-white mt-2">
  //             Check More
  //           </button>
  //         </Link>
  //       </div>
  //       <div className="f2-image">
  //         <img src={home3} className="p-2 border-[1px] z-0 " alt="" />
  //       </div>
  //     </div>
  //   );
  useEffect(() => {
    AOS.init({ duration: 1500 });
    AOS.refresh();
  }, []);
  return (
    <div
      className="shadow-layer p-6 flex flex-col justify-center ps-10 text-white w-[100%] min-h-[90dvh] bg-no-repeat bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: `url(${home2})`,
      }}
    >
      <div className="z-[2] flex flex-col gap-6 " data-aos="zoom-in-right">
        <h1 className="sm:text-6xl text-3xl font-semibold">
          Lebanon Paradise Tours
        </h1>
        <p className="text-xl text-gray-400 tracking-wide max-w-[600px]">
          Lebanon Paradise Tours invites you to explore the breathtaking beauty
          and rich cultural heritage of Lebanon.
        </p>
        <Link to="/places">
          <button className="px-3 py-2 mt-3 rounded-sm bg-gray-800 hover:bg-gray-700">
            Check More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
