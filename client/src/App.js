import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Account from "./pages/Account";
import SinglePostPage from "./pages/SinglePostPage";
import AddPostPage from "./pages/AddPostPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsThunks";
import AddPost from "./features/posts/AddPost";

function App() {
  const dispatch = useDispatch();
  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add-post" element={<AddPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
