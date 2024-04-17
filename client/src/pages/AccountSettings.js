import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/edit-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/users/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/account.css";
import "../styles/edit-profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountSettings() {
  const currentUser = useSelector(selectCurrentUser);
  const {
    user: auth0User,
    isLoading,
    getAccessTokenSilently,
    logout,
    loginWithRedirect,
  } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleDeleteAccount = async () => {
  //     try {
  //         const accessToken = await getAccessTokenSilently();
  //
  //         const deleteAccountResponse = await axios.delete(`https://dev-xva3bwyqfub0c5sf.us.auth0.com/api/v2/users/${auth0User.sub}`, {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${accessToken}`,
  //             }
  //         });
  //
  //         if(deleteAccountResponse.status === 204) {
  //             await logout({returnTo: window.location.origin});
  //             alert('Account deleted');
  //         }else {
  //             console.error('Error deleting account:', deleteAccountResponse.data);
  //             alert('Error deleting account. Please check the console for details.');
  //         }
  //     }catch (error) {
  //         console.error('Error deleting account', error);
  //     }
  // }

  const handleChangePassword = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const passwordChangeResponse = await axios.post(
        "https://dev-xva3bwyqfub0c5sf.us.auth0.com/dbconnections/change_password",
        {
          client_id: "7CEAotFZme2gstjkZWCwTzoKfM9f1OrV",
          email: currentUser.email,
          connection: "MongoDB",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (passwordChangeResponse.status === 200) {
        alert("Password reset email sent");
      } else {
        //const errorData = await passwordChangeResponse.json();
        console.error("Error changing password:", passwordChangeResponse.data);
        alert("Error changing password. Please check the console for details.");
      }
    } catch (error) {
      console.error("Error sending password reset email", error);
    }
  };

  if (!currentUser) {
    loginWithRedirect();
    return null;
  }

  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Account Settings</h1>
        <div id="account-container">
          {
            <button id="button" onClick={handleChangePassword}>
              Change Password
            </button>
          }
          {/*{<button onClick={handleDeleteAccount}>Delete Account</button>}*/}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AccountSettings;
