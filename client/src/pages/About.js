import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div id="page-overview">
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">About Section</h1>
      </div>
      <Footer />
    </div>
  );
}

export default About;
