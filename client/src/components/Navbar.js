import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header>
      <div className="container">
        <div id="nav-box">
          <div id="nav-title-box">
            <img
              src="https://brand.ua.edu/wp-content/themes/ua-theme/assets/img/ua-square-logo.png"
              alt="alabamaLogo"
            />
            <div>
              <h1 id="nav-title">Senior Forum</h1>
              <span id="nav-subtitle">Connecting caregivers of Alabama</span>
            </div>
          </div>
          <nav>
            <ul>
              <li className="nav-item">
                <a href="/home">HOME</a>
              </li>
              <li className="nav-item">
                <a href="/categories">CATEGORIES</a>
              </li>
              <li className="nav-item">
                <a href="/about">ABOUT</a>
              </li>
              <li className="nav-item">
                <a href="/account">MY ACCOUNT</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
