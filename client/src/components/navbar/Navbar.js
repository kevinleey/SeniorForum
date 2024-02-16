import React, {useEffect, useState} from "react";
import NavbarItem from "./NavbarItem";
import {NAV_ITEMS, NAV_ITEMS as navItems} from "../../constants";
import { NAV_RESOURCES as navResources } from "../../constants";
import "../../styles/navbar.css";
import "../../styles/dropdown.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const {
    NAVBAR_TITLE: title,
    NAVBAR_SUBTITLE: subtitle,
    NAVBAR_ICON_URL: iconUrl,
    NAVBAR_ALT_TEXT: altText,
  } = navResources;

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  //const [authItems, setAuthItems] = useState(NAV_ITEMS);

  useEffect(() => {
    // Assuming you have some state to manage the navbar items
    // const [authItems, setAuthItems] = useState(NAV_ITEMS);

    const accountItem = navItems.find(item => item.text === "MY ACCOUNT");
    const authSubItem = accountItem?.subItems.find(subItem => subItem.text === "Login" || subItem.text === "Logout");

    if (authSubItem) {
      const isUser = isAuthenticated && user;
      authSubItem.text = isUser ? "Logout" : "Login";
      authSubItem.onClick = isUser ? () => logout({ logoutParams: { returnTo: window.location.origin } }) : () => loginWithRedirect();

    }
  }, [isAuthenticated, user, logout, loginWithRedirect]);

  /*useEffect(() => {
    const accountItem = NAV_ITEMS.find(item => item.text === "MY ACCOUNT");
    const authSubItem = accountItem.subItems.find(subItem => subItem.text === "Login" || subItem.text === "Logout");

    if(authSubItem) {
      const isUser = isAuthenticated && user;
      authSubItem.text = isUser ? "Logout" : "Login";
      authSubItem.onClick = isUser ? () => logout({ logoutParams: { returnTo: window.location.origin } }) : () => loginWithRedirect();
    }
  }, [isAuthenticated, user, logout, loginWithRedirect]);*/

  //const accountItem= NAV_ITEMS.find(item => item.text === "MY ACCOUNT");
  //const authSubItem = accountItem?.subItems.find(item => ["Login", "Logout"].includes(accountItem.subItems.text));
  //const authSubItem = accountItem.subItems.find(item => accountItem.subItems.text === "Login" || accountItem.subItems.text === "Logout");

  /*if (authSubItem) {
    const isUser = isAuthenticated && user;
    authSubItem.text = isUser ? "Logout" : "Login";
    authSubItem.onClick = isUser ? () => logout({ logoutParams: { returnTo: window.location.origin } }) : () => loginWithRedirect();
  }*/

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
