import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function Account() {
  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Account Section</h1>
      </div>
      <Footer/>
    </div>
  );
}

export default Account;
