import React, { useEffect } from "react";
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
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const postsStatus = useSelector((state) => state.posts.status);
  const usersStatus = useSelector((state) => state.users.status);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    dispatch(fetchCurrUser())
  }, [usersStatus, dispatch]);

  useEffect(() => {
    console.log("Users fetched from server : ", users);
  }, [users]);

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;