import React from "react";
import "./Services.css";
import serv1 from "../../assets/serv1.jpg";
import serv2 from "../../assets/serv2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
function Services() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <>
      <div
        className="main-title mt-9  pt-4 flex mb-9 pb-9 justify-center align-middle"
        id="services"
      >
        <h2 className=" font-serif text-3xl font-bold">
          Our <span className="checknoww mt-4"> Services</span>
        </h2>
      </div>
      <div
        className="services py-5 flex flex-wrap gap-10 justify-center align-middle mt-5 pt-4 m-auto"
        data-aos="fade-right"
      >
        <div className="first-card max-w-[300px]  rounded-lg">
          <div className="first-card-icon text-center p-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div className="first-card-text bg-slate-100 p-2">
            <h2 className="font-bold text-center pb-1">Exploring Cities</h2>
            Help You Explore the Best Places in Lebanon, Providing Detailed
            Insights and Expertise to Ensure Your Journey Unveils the Most
            Magnificent Destinations and Experiences.
          </div>
        </div>
        <div
          className="second-card card max-w-[300px] rounded-lg"
          data-aos="fade-left"
        >
          <div className="second-card-img w-full text-center p-2">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div className="second-card-text bg-slate-100 p-2">
            <h2 className="font-bold text-center">Reserving a Trip</h2>
            Help You Explore the Best Places in Lebanon, Providing Detailed
            Insights and Expertise to Ensure Your Journey Unveils the Most
            Magnificent Destinations and Experiences.
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
