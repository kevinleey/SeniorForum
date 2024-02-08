import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/categories.css";

function Categories() {
  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div id="box-holder"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
