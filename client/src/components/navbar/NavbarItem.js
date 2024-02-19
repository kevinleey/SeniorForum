import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setCurrentUser} from "../../features/users/userSlice";
import {fetchCurrUser} from "../../features/users/userThunks";

function NavbarItem({ href, text, subItems, auth }) {
  const isLinkDisabled = text === "ABOUT"; //Disable the ABOUT link

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { user: auth0User, isLoading } = useAuth0();

  useEffect(() => {
    if(!isLoading && auth0User) {
      dispatch(fetchCurrUser(auth0User));
      dispatch(setCurrentUser(auth0User));
    }
  }, [dispatch, isLoading, auth0User]);

  const authText = currentUser ? "Logout" : "Login"; //If the user is authenticated, change the text to Logout
  const authHref = currentUser ? "http://localhost:3001/logout" : "http://localhost:3001/login"; //If the user is authenticated, change the link to the logout link

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
              <Link className="dropdown-item" to={item.text === 'Login' ? authHref : item.href}>
                {item.text === 'Login' ? authText : item.text}
              </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default NavbarItem;
