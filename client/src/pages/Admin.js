import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import axios from "axios";

function Admin() {

    const currentUser = useSelector(selectCurrentUser);
    const { user, isLoading, isAuthenticated, getAccessTokenSilently, get } = useAuth0();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const [loadingRole, setLoadingRole] = useState(true);

    const [users, setUsers] = useState([]);

    const [activeKey, setActiveKey] = useState('users');

    /*const fetchUserRole = async (userId) => {
        console.log('fetchUserRole called with userId:', userId);
       let config = {
           method: 'get',
           url: `${process.env.AUTH_AUDIENCE}/users/${userId}/roles`,
              headers: {
                'Accept': 'application/json',
              }
       };

       try {
           const response = await axios(config);
           console.log('Response data:', response.data);
           console.log(JSON.stringify(response.data));
           setUserRole(response.data[0].name); //set user role
       } catch (error) {
           console.log('Error: ',error);
       }
    };*/

    useEffect(() => {
        if(!isLoading && isAuthenticated && user) {
            let userRole = user['http://localhost:3000/role'];
            setUserRole(userRole);
            setLoadingRole(false);
        }
    }, [isLoading, isAuthenticated, user]);

    useEffect(() => {
        if(!isAuthenticated && !isLoading || (!isLoading && !loadingRole && (!userRole || userRole !== 'Admin'))) {
            navigate("/");
        }
    }, [isLoading, userRole, navigate]);

    //Not currently working, as it appears that the credential types we have access to as a single-page application are not sufficient to access the scope read:users
    /*useEffect(() => {
        const getUsers = async () => {
            try {
                const auth0Domain = "dev-xva3bwyqfub0c5sf.us.auth0.com";

                // Get an access token
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${auth0Domain}/api/v2/`,
                    scope: "read:users",
                });

                //console.log('Access Token:', accessToken)

                // Get the list of users
                try {
                    const usersResponse = await axios.get(`https://${auth0Domain}/api/v2/users`, {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    });

                    setUsers(usersResponse.data);
                } catch (error) {
                    console.error("Error getting userResponse:", error.response.data);
                }

            } catch (error) {
                console.error("Error getting users:", error);
            }
        };

        getUsers();
    }, []);*/

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="page-background">
            <Navbar />
            <div id="page-container">
                <h1 className="page-title">Admin Dashboard</h1>
                {currentUser ? <h3>Welcome {currentUser.firstName}</h3> : <h2>Welcome Admin</h2>}
                {userRole ? <p>User Role: {userRole}</p> : <p>User role not found.</p>}

                <br/>

                {/* <div className="users-container">
                    <h2>Users</h2>
                    {users.map((user) => (
                        <div key={user.sub}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    ))}
                </div> */}

            </div>


            <Footer/>
        </div>
    );
}

export default Admin;
