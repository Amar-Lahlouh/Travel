import React from "react";
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.jpg";
import about from "../../assets/B1.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./About.css";
function About() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <div className="mt-9 pt-5 px-6 pb-9" id="about">
      <div className="main-title flex justify-center align-middle">
        <h2 className=" font-serif text-3xl font-bold mt-6 mb-7">
          About <span className="checknoww "> Us</span>
        </h2>
      </div>
      <div className="about flex gap-9 justify-center align-middle ">
        <div className="about-images max-w-[350px] " data-aos="fade-right">
          <img src={about} alt="" />
          {/* <div className="about-img1">
            <img width={"270px"} height={"400px"} src={b1} alt="" />
          </div>
          <div className="about-img2">
            <img width={"270px"} height={"400px"} src={b2} alt="" />
          </div> */}
        </div>

        <div className="about-content" data-aos="fade-left">
          <h3 className="font-bold text-xl italic font-serif px-3 mt-6">
            Get to Know More About Us
          </h3>
          <p className="max-w-[350px] mt-2 about-text px-5 tracking-widest">
            Welcome to Lebanon PARADISE Tours, where wanderlust meets wonder!
            Established in 2024, we have been dedicated to crafting
            unforgettable journeys that immerse travelers in the beauty and
            {/* culture of Lebanon. Over the years, we've had the pleasure of
            welcoming countless adventurers who have joined us on our quest to
            explore the breathtaking landscapes and rich heritage of this
            remarkable country. */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
