import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/messageReducer";
import { setStyle } from "../reducers/messageStyleReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const setFormVisibility = () => {
    setVisible(!visible);
  };

  const addEntry = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    try {
      dispatch(createBlog(blogObject));
      dispatch(setNotification("Created blog successfully!", 2));
      dispatch(setStyle("notification", 2));
    } catch (exception) {
      dispatch(setNotification(exception, 2));
      dispatch(setStyle("error", 2));
    }
  };

  return (
    <>
      <div>
        <button style={{ marginTop: "10px" }} onClick={setFormVisibility}>
          {visible ? "hide form" : "add new blog"}
        </button>
      </div>
      <div style={!visible ? { display: "none" } : null}>
        <h2>add new blog</h2>
        <form onSubmit={addEntry}>
          <div className="ui button">
            title:&nbsp;
            <input id="title" name="title" style={{ marginTop: 10 }} />
          </div>
          <div className="ui button">
            author:&nbsp;
            <input id="author" name="author" style={{ marginTop: 10 }} />
          </div>
          <div className="ui button">
            url:&nbsp;
            <input id="url" name="url" style={{ marginTop: 10 }} />
          </div>
          <div>
            <button
              id="add-button"
              className="ui button"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
