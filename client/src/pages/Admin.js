import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../features/users/userSlice";
import axios from "axios";
import "../styles/admin.css";
import { imageLinks } from "../constants";

function Admin() {
  const currentUser = useSelector(selectCurrentUser);
  const { user, isLoading, isAuthenticated, getAccessTokenSilently, get } =
    useAuth0();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  const users = useSelector(selectAllUsers);

  const [banStatus, setBanStatus] = useState({});

  const [activeTab, setActiveTab] = useState("usersTab");

  useEffect(() => {
    if (!isLoading && currentUser) {
      let userRole = currentUser.role;
      setUserRole(userRole);
      setLoadingRole(false);
    }
  }, [isLoading, isAuthenticated, currentUser]);

  useEffect(() => {
    if (
      (!isAuthenticated && !isLoading) ||
      (!isLoading && !loadingRole && (!userRole || userRole !== "Admin"))
    ) {
      navigate("/");
    }
  }, [isLoading, userRole, navigate, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleNameClick = (user) => {
    let userProfURI = `/profile/${user._id}`;
    navigate(userProfURI);
  };

  const handleBanUser = async (user) => {
    const confirmation = window.confirm(
      `Are you sure you want to ban ${user.firstName} ${user.lastName}? They can be unbanned later.`,
    );
    if (confirmation) {
      const updatedUser = {
        banned: true,
      };

      try {
        const response = await axios.put(`/users/me/${user._id}`, updatedUser);

        if (response.status === 200) {
          setBanStatus({ ...banStatus, [user._id]: true });
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error banning user:", error);
      }
    }
  };

  const handleUnbanUser = async (user) => {
    const confirmation = window.confirm(
      `Are you sure you want to unban ${user.firstName} ${user.lastName}?`,
    );
    if (confirmation) {
      const updatedUser = {
        banned: false,
      };

      try {
        const response = await axios.put(`/users/me/${user._id}`, updatedUser);

        if (response.status === 200) {
          setBanStatus({ ...banStatus, [user._id]: false });
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error unbanning user:", error);
      }
    }
  };

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Admin Dashboard</h1>
        {currentUser ? (
          <h3>Welcome {currentUser.firstName}</h3>
        ) : (
          <h2>Welcome Admin</h2>
        )}
        {userRole ? <p>User Role: {userRole}</p> : <p>User role not found.</p>}

        <br />

        <div className="admin-table">
          <div className="admin-table-tabs">
            <button
              className={`tab ${activeTab === "usersTab" ? "active" : ""}`}
              onClick={() => setActiveTab("usersTab")}
            >
              Users
            </button>
            <button
              className={`tab ${activeTab === "logsTab" ? "active" : ""}`}
              onClick={() => setActiveTab("logsTab")}
            >
              Logs
            </button>
          </div>

          <div className="admin-table-content">
            {activeTab === "usersTab" && (
              <div>
                {users.map((user) => (
                  <div className="user" key={user._id}>
                    <img
                      className="profile-pic"
                      src={
                        user.picture
                          ? user.picture
                          : imageLinks.USER.USER_PICTURE_LINK
                      }
                      alt={imageLinks.USER.USER_PICTURE_TEXT}
                    />
                    <div className="user-info">
                      <h3 onClick={() => handleNameClick(user)}>
                        {user.firstName} {user.lastName}
                      </h3>
                      <p>{user.email}</p>
                    </div>
                    {user.banned ? (
                      <button
                        className="ban-button"
                        onClick={() => handleUnbanUser(user)}
                      >
                        Unban User
                      </button>
                    ) : (
                      <button
                        className="ban-button"
                        onClick={() => handleBanUser(user)}
                      >
                        Ban User
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "logsTab" && (
              <div>
                <p>Logs tab</p>
                {/*{loadingLogs ? <p>Loading logs...</p> : logs.map((log) => (*/}
                {/*      <div className="log" key={log._id}>*/}
                {/*           <p>{log.description}</p>*/}
                {/*           <p>{log.timestamp}</p>*/}
                {/*      </div>*/}
                {/* ))}*/}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
