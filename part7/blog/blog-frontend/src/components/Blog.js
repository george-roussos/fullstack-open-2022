import React from "react";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const likeButton = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    try {
      dispatch(likeBlog(blogObject, blog.id));
    } catch (exception) {
      console.log(exception);
    }
  };

  const removeEntry = async (event) => {
    event.preventDefault();
    try {
      dispatch(removeBlog(blog.id));
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="blog-info">
      {blog.title}: {blog.author}
      <Button visible={visible} setVisible={setVisible} />
      {visible ? (
        <div
          style={{
            paddingTop: 10,
            paddingLeft: 2,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5,
          }}
        >
          <p>{blog.url}</p>{" "}
          <p>
            {blog.likes} <button onClick={likeButton}>like</button>
          </p>
          <p>{blog.user.username ? blog.user.username : "no user"}</p>
          {blog.user.username === username ? (
            <p>
              <button onClick={removeEntry}>remove entry from database</button>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
