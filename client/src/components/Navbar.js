import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <div id="nav-box">
          <div id="nav-title-box">
            <Link id="nav-title-link" to={'/'}><img
                src="https://brand.ua.edu/wp-content/themes/ua-theme/assets/img/ua-square-logo.png"
                alt="alabamaLogo"
            />
              <div>
                <h1 id="nav-title">Senior Forum</h1>
                <span id="nav-subtitle">Connecting caregivers of Alabama</span>
              </div>
            </Link>

          </div>
          <nav>
            <ul>
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/categories'}>CATEGORIES</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/about'}>ABOUT</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/account'}>MY ACCOUNT</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
