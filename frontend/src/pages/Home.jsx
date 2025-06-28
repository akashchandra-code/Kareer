import React from "react";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Companies from "../components/Companies";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div className="h-full w-full  ">
      <Hero />
      <Feature />
      <HowItWorks />
      <Companies />
      <Footer />
    </div>
  );
};

export default Home;
