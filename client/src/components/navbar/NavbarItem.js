import React from "react";
import { Link } from "react-router-dom";

function NavbarItem({ href, text, subItems }) {
  const isLinkDisabled = text === "ABOUT"; //Disable the ABOUT link

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
          {subItems.map((subItem, index) => (
            <div className="dropdown-item" key={index} onClick={subItem.onClick} /*to={item.href}*/>
              {subItem.text}
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

export default NavbarItem;
