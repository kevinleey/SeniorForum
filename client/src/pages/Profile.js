import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import {imageLinks} from "../constants";
import "../styles/account.css";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostList from "../components/posts/PostList";
import { useParams } from "react-router-dom";
import {selectUserById} from "../features/users/userSlice";


function Profile() {
    const posts = useSelector(selectAllPosts);
    const {userId} = useParams();
    console.log("Before new Use Selector");
    const user = useSelector((state) => selectUserById(state, userId));
    console.log("After New Selector");
    // console.log("User Array");
    // console.log(user.firstName);
    // console.log("User Id: ", userId);
    const userPosts = posts.filter(post => post.createdBy._id === userId);

    return (
        <div id="page-overview">
            <Navbar />
            <div className="page-container">
                <div id="account-container">
                    <div id="image-area">
                        <img src={imageLinks.USER.USER_PICTURE_LINK} alt={imageLinks.USER.USER_PICTURE_TEXT}/>
                        <div id="follow-bar">
                            <p>Followers</p>
                            <p>Following</p>
                        </div>
                        <div id="follow-numbers">
                            <p>100</p>
                            <p>100</p>
                        </div>
                    </div>
                    <div id="main-content">
                        <div id="account-header">
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                        <h2 className="bio">Bio:</h2>
                        <div id="account-bio">
                            <p>I am a caregiver for my mother who has dementia. I am looking for advice on how to handle
                                her mood swings.</p>
                        </div>
                        <div id="account-history">
                            <div id="account-history-heading">
                                <h2>Post History</h2>
                            </div>
                            <div id="account-history-list">
                                <PostList posts={userPosts}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;