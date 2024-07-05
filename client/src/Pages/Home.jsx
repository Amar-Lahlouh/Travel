import React from "react";
import {
  Landing,
  Navbar,
  Map,
  About,
  Services,
  Features,
  Gallery,
  Footer,
} from "../Components";
import PaymentMethod from "../Components/PaymentMethod/PaymentMethod";
function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <Map />
      <Features />
      <About />
      <Gallery />

      <Services />
      <PaymentMethod />
      <Footer />
    </>
  );
}

export default Home;
