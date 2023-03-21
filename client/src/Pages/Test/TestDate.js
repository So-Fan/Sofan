import React, { useState } from "react";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";

function TestDate() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", date: "2022-02-28T08:00:00Z" },
    { id: 2, title: "Post 2", date: "2022-03-01T12:00:00Z" },
    { id: 3, title: "Post 3", date: "2022-02-27T20:00:00Z" },
  ]);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      {sortedPosts.map((post) => (
        <PostsFeed key={post.id} title={post.title} date={post.date} />
      ))}
    </div>
  );
}
export default TestDate;