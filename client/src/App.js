import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import SinglePostPage from "./pages/SinglePostPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsThunks";
import { fetchUsers } from "./features/users/userThunks";
import { selectAllUsers } from "./features/users/userSlice";

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
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
