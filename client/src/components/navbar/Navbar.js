import React, {useEffect, useState} from "react";
import NavbarItem from "./NavbarItem";
import {NAV_ITEMS, NAV_ITEMS as navItems} from "../../constants";
import { NAV_RESOURCES as navResources } from "../../constants";
import "../../styles/navbar.css";
import "../../styles/dropdown.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {selectAllUsers, selectCurrentUser, setCurrentUser} from "../../features/users/userSlice";
import { fetchCurrUser } from "../../features/users/userThunks";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const {
    NAVBAR_TITLE: title,
    NAVBAR_SUBTITLE: subtitle,
    NAVBAR_ICON_URL: iconUrl,
    NAVBAR_ALT_TEXT: altText,
  } = navResources;

  return (
    <header>
      <div className="nav-container">
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
                <NavbarItem
                  text={item.text}
                  href={item.href}
                  subItems={item.subItems}
                  //auth={isAuthenticated}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
