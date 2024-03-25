import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Account from "./pages/Account";
import SinglePostPage from "./pages/SinglePostPage";
import AddPostPage from "./pages/AddPostPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsThunks";
import { fetchCurrUser, fetchUsers } from "./features/users/userThunks";
import { selectAllUsers } from "./features/users/userSlice";
import { selectAllPosts } from "./features/posts/postsSlice";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditPostPage from "./pages/EditPostPage";

function App() {
  const dispatch = useDispatch();
  const postsStatus = useSelector((state) => state.posts.status);
  const currentPosts = useSelector(selectAllPosts);
  const usersStatus = useSelector((state) => state.users.status);
  const users = useSelector(selectAllUsers);
  const timerRef = useRef(null);

  let previousPosts = useRef(currentPosts);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    dispatch(fetchCurrUser());
  }, [usersStatus, dispatch]);

  useEffect(() => {
    console.log("Users fetched from server : ", users);
  }, [users]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const postsChanged = previousPosts.current.length !== currentPosts.length;

      if (postsChanged) {
        dispatch(fetchPosts());
      }

      previousPosts.current = currentPosts;
    }, 60000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [dispatch, currentPosts]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryTitle" element={<Category />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/edit-post/:postId" element={<EditPostPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
