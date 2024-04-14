import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  setCurrentUser,
} from "../../features/users/userSlice";

function NavbarItem({ href, text, subItems }) {
  const isLinkDisabled = text === "ABOUT";

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const {
    user: auth0User,
    isLoading,
    loginWithRedirect,
    logout,
    isAuthenticated,
  } = useAuth0();

  const handleAuthAction = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      await loginWithRedirect();
    } else {
      await logout();
      dispatch(setCurrentUser(null));
    }
  };

  const authText = currentUser ? "Logout" : "Login"; //If the user is authenticated, change the text to Logout
  const authHref = currentUser
    ? "http://localhost:3001/logout"
    : "http://localhost:3001/login"; //If the user is authenticated, change the link to the logout link

  return (
    <li className="nav-item">
      {isLinkDisabled ? (
        <div className="nav-link-disabled">{text}</div>
      ) : (
        <Link className="nav-link" to={href}>
          {text}
        </Link>
      )}
      {subItems && (
        <div className="dropdown">
          {subItems.map((item) => (
            <Link
              className="dropdown-item"
              to={item.text === "Login" ? authHref : item.href}
              onClick={(event) =>
                item.text === "Login" || item.text === "Logout"
                  ? handleAuthAction(event)
                  : null
              }
            >
              {item.text === "Login" ? authText : item.text}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default NavbarItem;
