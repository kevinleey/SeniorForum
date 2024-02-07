import React from "react";
import NavbarItem from "./NavbarItem";
import { NAV_ITEMS as navItems } from "../constants";
import { NAV_RESOURCES as navResources } from "../constants";
import "../styles/navbar.css";
import "../styles/dropdown.css";
import { Link } from "react-router-dom";

function Navbar() {
  const {
    NAVBAR_TITLE: title,
    NAVBAR_SUBTITLE: subtitle,
    NAVBAR_ICON_URL: iconUrl,
    NAVBAR_ALT_TEXT: altText,
  } = navResources;

  return (
    <header>
      <div className="container">
        <div id="nav-box">
          <div id="nav-title-box">
            <Link id="nav-title-link" to={"/"}>
              <img src={iconUrl} alt={altText} />
              <div>
                <h1 id="nav-title">{title}</h1>
                <span id="nav-subtitle">{subtitle}</span>
              </div>
            </Link>
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <NavbarItem text={item.text} href={item.href} subItems={item.subItems}/>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
