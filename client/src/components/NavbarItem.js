import React from "react";
import { Link } from "react-router-dom";

function NavbarItem({ href, text }) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={href}>
        {text}
      </Link>
    </li>
  );
}

export default NavbarItem;
