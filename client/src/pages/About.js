import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">About</h1>
      </div>
      <Footer />
    </div>
  );
}

export default About;
