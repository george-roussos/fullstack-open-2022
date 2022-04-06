import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./Message";

const UserStats = ({ blogs }) => {
  let histogram = {};
  blogs.forEach((element) => {
    if (element.user) {
      const username = element.user.username;
      if (!Object.prototype.hasOwnProperty.call(histogram, username)) {
        histogram = { ...histogram, [username]: 1 };
      } else {
        histogram = { ...histogram, [username]: histogram[username] + 1 };
      }
    }
  });
  let arr = [];
  for (const key in histogram) {
    arr.push({ user: key, posts: histogram[key] });
  }
  return (
    <div>
      <h2>User stats</h2>
      {arr.map((user) => (
        <p key={user.user}>
          {user.user} has {user.posts} posts
        </p>
      ))}
    </div>
  );
};

const UserView = ({ blogs }) => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserStats blogs={blogs} />} />
        <Route path="/" element={<Message />} />
      </Routes>
    </Router>
  );
};

export default UserView;
