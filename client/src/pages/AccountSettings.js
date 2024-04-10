import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/edit-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../features/users/userSlice";
import { fetchCurrUser } from "../features/users/userThunks";
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

  /*const handleChangePassword = async () => {
        try {
            console.log('password change triggered');

            const accessTokenResponse = await fetch('http://localhost:3001/get-access-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const accessTokenData = await accessTokenResponse.json();
            const accessToken = accessTokenData.access_token;

            const passwordChangeResponse = await fetch('http://localhost:3001/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    client_id: process.env.AUTH_CLIENT_ID,
                    email: currentUser.email,
                    connection: 'MongoDB',
                }),
            });

            console.log('Password change response:', await passwordChangeResponse.text());

            if (passwordChangeResponse.ok) {
                const passwordChangeData = await passwordChangeResponse.json();
                console.log('Password change response:', passwordChangeData);
                alert('Password reset email sent');
                console.log('email sent to ' + currentUser.email);
            } else {
                // Log the error response if the request is not successful
                const errorData = await passwordChangeResponse.json();
                console.error('Error changing password:', errorData);
                alert('Error changing password. Please check the console for details.');
            }

            //alert('Password reset email sent');
            //console.log('email sent to ' + currentUser.email);
        } catch(error) {
            console.error('Error sending password reset email', error);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            console.log('delete account triggered');

            const accessTokenResponse = await fetch('http://localhost:3001/get-access-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('access token response:', accessTokenResponse);

            const accessTokenData = await accessTokenResponse.json();
            const accessToken = accessTokenData.access_token;

            console.log('access token:', accessToken);

            // const authId = "auth0|" + currentUser._id;
            // console.log('authId: ' + authId);

            const deleteAccountResponse = await fetch('http://localhost:3001/delete-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
                    email: currentUser.email,
                    connection: 'MongoDB',
                }),
            });

            //console.log('Account delete response:', await deleteAccountResponse.text());

            if(deleteAccountResponse.ok) {
                await logout({returnTo: window.location.origin});
                alert('Account deleted');
            }
            else {
                // Check the Content-Type of the response
                const contentType = deleteAccountResponse.headers.get('content-type');
                let errorData;

                // If the response is JSON, parse it as JSON
                if (contentType && contentType.includes('application/json')) {
                    errorData = await deleteAccountResponse.json();
                } else {
                    // Otherwise, parse it as text
                    errorData = await deleteAccountResponse.text();
                }

                console.error('Error deleting account:', errorData);
                alert('Error deleting account. Please check the console for details.');
            }

        } catch (error) {
            console.error('Error deleting account', error);
        }
    }*/

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
          {<button onClick={handleChangePassword}>Change Password</button>}

          {/*{<button onClick={handleDeleteAccount}>Delete Account</button>}*/}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default AccountSettings;
