import React from "react";
import PostOverview from "./PostOverview";

function PostList({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostOverview post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostList;
