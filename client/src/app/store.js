import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import usersReducer from "../features/users/userSlice";
import { useAuth0 } from "@auth0/auth0-react";

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    auth: (state = {}, action) => {
      const { getAccessTokenSilently } = useAuth0;
      return { ...state, getAccessTokenSilently };
    },
  },
});
