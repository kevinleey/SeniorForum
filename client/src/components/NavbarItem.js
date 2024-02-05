import React from "react";
import { Link } from "react-router-dom";

function NavbarItem({ href, text, subItems }) {
    const isLinkDisabled = text === "ABOUT" || text === "MY ACCOUNT"; //Disable the ABOUT and MY ACCOUNT links

  return (
    <li className="nav-item">
        {isLinkDisabled ? ( //If the link is disabled, don't make it a link, change class to disabled
            <div className="nav-link-disabled">{text}</div>
        ) : (
            <Link className="nav-link" to={href}>
                {text}
            </Link>
        )}
        {subItems && (
            <div className="dropdown">
                {subItems.map((item) => (
                    <Link className="dropdown-item" to={item.href}>{item.text}</Link>
                ))}
            </div>
        )}
    </li>
  );
}

export default NavbarItem;
