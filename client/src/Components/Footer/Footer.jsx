import "./Footer.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  const navLinks = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "about",
      path: "#about",
    },
    {
      label: "services",
      path: "#services",
    },
    {
      label: "places",
      path: "/places",
    },
    {
      label: "gallery",
      path: "#gallery",
    },
    { label: "Payment Method", path: "/" },
    {
      label: "contact us",
      path: "#contactus",
    },
  ];
  return (
    <div className="footer " id="contact">
      <div className="footer-data pb-3 flex flex-wrap justify-between gap-10 align-middle ">
        {" "}
        <div className="footer-section  " data-aos="fade-right">
          <h2 className="text-2xl font-bold italic font-serif text-green-800">
            Lebanon Paradise Tours
          </h2>
          <p className="max-w-[300px] mt-3">
            Discover our story and learn more about our mission and values.
          </p>
        </div>
        <div
          className="footer-section flex flex-col gap-4"
          data-aos="fade-right"
        >
          {" "}
          <h3 className="font-bold">Our Links</h3>
          <a href="" className="hover:checknoww">
            Home
          </a>
          <a href="#about" className="hover:checknoww">
            About Us
          </a>
          <a href="#services" className="hover:checknoww">
            services
          </a>
          <a href="#features" className="hover:checknoww">
            Features
          </a>
          <Link to={"/places"} className="hover:checknoww">
            Places
          </Link>
        </div>
        <div
          className="footer-section flex flex-col gap-4"
          data-aos="fade-left"
        >
          <h3 className="font-bold">Useful Links</h3>

          <a href="/" className="hover:checknoww">
            Terms of use
          </a>

          <a href="/" className="hover:checknoww">
            FAQs
          </a>
          <a href="/privacy" className="hover:checknoww">
            Privacy Policy
          </a>
        </div>
        <div
          className="footer-section flex flex-col  gap-4"
          data-aos="fade-left"
        >
          <h3 className="font-bold hover:checknoww">Contact Us</h3>

          <p>
            {" "}
            <FontAwesomeIcon icon={faEnvelope} />{" "}
            <span className="checknoww p-1 font-bold">Email: </span>
            lebanonparadisetours@gmail.com
          </p>
          <p>
            {" "}
            <FontAwesomeIcon icon={faPhone} />{" "}
            <span className="checknoww p-1 font-bold">Phone: </span> +961 78
            952903
          </p>
          <p>
            {" "}
            <FontAwesomeIcon icon={faLocationPin} />{" "}
            <span className="checknoww p-1 font-bold">Address: </span>
            Tripoli
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/lebanonparadisetours/?hl=en"
              target="blank"
            >
              {" "}
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center p-3 ft">
        © Copyright 2024 Lebanon Paradise Tours All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
