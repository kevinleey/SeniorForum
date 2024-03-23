import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setCurrentUser} from "../features/users/userSlice";
import {fetchCurrUser} from "../features/users/userThunks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {

    const currentUser = useSelector(selectCurrentUser);
    const { user: auth0User, isLoading, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    console.log('IS Authenticated:', isAuthenticated);

    const fetchUserRole = async (userId) => {
        console.log('fetchUserRole called with userId:', userId);
       let config = {
           method: 'get',
           url: `${process.env.AUTH_AUDIENCE}/users/${userId}/roles`,
              headers: {
                'Accept': 'application/json',
              }
       };

       console.log("URL: ", config.url);

       try {
           const response = await axios(config);
           console.log('Response data:', response.data);
           console.log(JSON.stringify(response.data));
           setUserRole(response.data[0].name); //set user role
       } catch (error) {
           console.log('Error: ',error);
       }
    };

    //const { getIdTokenClaims, isAuthenticated } = useAuth0();

    /*useEffect(() => {
        if (isAuthenticated) {
            getIdTokenClaims()
                .then(claims => {
                    console.log('ID token claims:', claims);
                })
                .catch(error => {
                    console.error('Error getting ID token claims:', error);
                });
        }
    }, [getIdTokenClaims, isAuthenticated]);*/

    /*useEffect(() => {
        console.log('isLoading:', isLoading); // Log the value of isLoading
        console.log('auth0User:', auth0User);
        if (!isLoading && auth0User) {
            console.log('User ID:', auth0User.sub);
            dispatch(fetchCurrUser(auth0User));
            dispatch(setCurrentUser(auth0User));
            fetchUserRole(auth0User.sub);
        }
    }, [dispatch, isLoading, auth0User]);*/

    if (isLoading) {
        return <div>Loading...</div>;
    }

    //const appMetadata = currentUser && currentUser['http://localhost:3000/app_metadata'];
    //const role = appMetadata && appMetadata.role;

    /*if(currentUser && role !== 'Admin') {
        //navigate("/");
        //return null;
        console.log("Role: ", role);
    }*/

    return (
        <div id="page-background">
            <Navbar />
            <div id="page-container">
                <h1 className="page-title">Admin Dashboard</h1>
                {userRole && <p>User Role: {userRole}</p>}
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
