import React, {useEffect} from "react";
import { useNavigate} from "react-router-dom";
import UserImage from "./UserImage";
import "../../styles/user-info-small.css";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setCurrentUser} from "../../features/users/userSlice";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCurrUser} from "../../features/users/userThunks";

function UserInfoSmall({ user }) {
    //console.log('UserInfoSmall component rendered');
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { user: auth0User, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && auth0User){
            dispatch(fetchCurrUser(auth0User));
            dispatch(setCurrentUser(auth0User));
        }
    }, [dispatch, isLoading, auth0User]);

    let userProfileURI = `/profile/${user._id}`;

    const handleProfileClick = (event) => {
        //console.log('handleProfileClick function called');
       event.stopPropagation();

        //console.log('user._id:', user._id);
        //console.log('currentUser._id:', currentUser._id);

        if (!isLoading && currentUser && user._id === currentUser._id) { //not working
            // If true, navigate to '/account'
            navigate('/account');
        } else {
            navigate(userProfileURI);
        }
    };

  return (
    <div className="user-info-small" onClick={handleProfileClick}>
      <UserImage user={user} />
        {user.firstName}
    </div>
  );
}

export default UserInfoSmall;
