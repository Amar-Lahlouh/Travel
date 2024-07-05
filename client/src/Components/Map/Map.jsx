import React from "react";
import map2 from "../../assets/map2.jpg";
import video from "../../assets/video.mp4";
import tryy from "../../assets/try.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./Map.css";
function Map() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <div className=" mt-4  pt-4" id="map">
      <div className="main-title flex justify-center align-middle">
        <h2 className=" font-serif text-3xl font-bold">
          Lebanon's <span className="checknoww"> Map</span>
        </h2>
        {/* <a
          href="https://chat.whatsapp.com/JbQZuJl0KlA8WEH5j3UxLg"
          target="blank"
        >
          Join WHataspp
        </a> */}
      </div>
      <div className="flex gap-6 justify-center mt-5 p-6 map-main">
        <div className="hidden md:flex">
          <img
            width={"200px"}
            src={map2}
            data-aos="fade-right"
            // data-aos-offset="200"

            alt=""
            className="object-cover"
          />
        </div>
        <div
          data-aos="fade-left"
          className="max-w-[500px] p-5 tracking-wide rounded-xl map-text bg-[#00000008] "
        >
          Lebanon's map unfurls a captivating journey, adorned with a myriad of
          tourism treasures awaiting discovery. From the historic streets of
          Beirut to the ancient ruins of Baalbek, each corner of this enchanting
          land holds a story waiting to be told. Traverse the lush valleys of
          the Bekaa, bask in the sun-kissed shores of Jounieh, and lose yourself
          in the timeless charm of Byblos. With its rich tapestry of cultural
          heritage, breathtaking landscapes, and vibrant cities, Lebanon beckons
          travelers to explore its diverse offerings and create memories that
          last a lifetime
        </div>
      </div>
      {/* <div className=" video-container p-0 m-0 w-[100%] overflow-hidden relative h-[280px] mb-4 ">
        {" "}
        <video
          autoPlay
          loop
          controls
          className="full-width-video w-[100%] h-[100%] object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div> */}
    </div>
  );
}

export default Map;
