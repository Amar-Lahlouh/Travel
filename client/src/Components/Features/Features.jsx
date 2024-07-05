import React from "react";
import "./Features.css";
import f11 from "../../assets/f11.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Features() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <div id="features">
      <div className="main-title mt-9 pt-4  mb-8 flex justify-center align-middle">
        <h2 className=" font-serif text-3xl font-bold">
          Some<span className="checknoww mb-4 mt-8"> Features</span>
        </h2>
      </div>
      <div
        data-aos="fade-right"
        className="features  flex  justify-center align-middle flex-wrap gap-4 mt-6 pt-7"
      >
        <div className="features-content">
          <div className="features-content-data  mt-3 px-3 max-w-[450px]">
            <span className="p-1 span-1 rounded-xl px-2 text-white">01</span>
            <h3 className="font-bold pt-3">Destination Guides: </h3>
            <p>
              {" "}
              Access detailed guides for various destinations in Lebanon,
              providing essential information such as historical significance.
            </p>
          </div>
          <div className="features-content-data  mt-3 px-3 max-w-[450px]">
            <span className="bg-#b0b9b0 span-2 p-1 rounded-xl px-2">02</span>
            <h3 className="font-bold pt-3">Unique Trips:</h3>
            <p>
              Tailor your travel experiences according to your interests, with
              trip itineraries curated to showcase the best of Lebanon's
              landscapes
            </p>
          </div>
          <div className="features-content-data  mt-3 px-3 max-w-[450px]">
            <span className="span-3  p-1 rounded-xl px-2">03</span>
            <h3 className="font-bold pt-3">Safe Trips: </h3>
            <p>
              {" "}
              Provide a safe trips so feel comfortable and enjoy your trips
              happily!
            </p>
          </div>
        </div>
        <div className="features-image px-7" data-aos="fade-left">
          <img src={f11} className="w-[550px]" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Features;
