import React, {useEffect} from "react";
import Contribution from "./Contribution";
import { timeSince } from "../../utility/timeSince";
import "../../styles/single-post.css";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../Spinner";
import CommentForm from "../forms/CommentForm";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCurrUser} from "../../features/users/userThunks";
import {setCurrentUser, selectCurrentUser} from "../../features/users/userSlice";

function SinglePost({ post, comments }) {
  const commentsStatus = useSelector((state) => state.comments.status);
  const numComments = comments.length;

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const {user: auth0User, isLoading } = useAuth0();


  useEffect(() => {
      if(!isLoading && auth0User) {
          dispatch(fetchCurrUser(auth0User));
          dispatch(setCurrentUser(auth0User));
      }
  }, [dispatch, isLoading, auth0User]);

  if(!currentUser) {
      window.location.href = 'http://localhost:3001/login';
      return null;
  }

  return (
    <div id="single-post-container">
      <div id="single-post-header">
        <h1 className="page-title">{post.title}</h1>
        <h3 id="time-since">
          {timeSince(post.dateCreated)} by {post.createdBy.firstName}{" "}
          {post.createdBy.lastName}
        </h3>
      </div>
      <Contribution contribution={post} />
      <div id="single-post-comments-container">
        {commentsStatus === "succeeded" && (
          <h2 id="comments-title">Comments ({numComments})</h2>
        )}
        {commentsStatus === "succeeded" ? (
          comments.map((comment) => <Contribution contribution={comment} />)
        ) : (
          <Spinner />
        )}
        <CommentForm />
      </div>
    </div>
  );
}

export default SinglePost;
