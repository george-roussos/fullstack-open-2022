import React from "react";
import blogService from "../services/blogs";
import { useState } from "react";

const BlogForm = (props) => {
  const [newEntry, setNewEntry] = useState({ title: "", author: "", url: "" });
  const [visible, setVisible] = useState(false);

  const setFormVisibility = () => {
    setVisible(!visible);
  };

  const addEntry = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newEntry.title,
      author: newEntry.author,
      url: newEntry.url,
    };

    try {
      await blogService.create(blogObject);
      await blogService.getAll().then((blogs) => props.setBlogs(blogs));
      props.setType("notification");
      props.setMessage("Created blog succesfully");
      setTimeout(() => {
        props.setMessage(null);
        props.setType(null);
      }, 3000);
    } catch (exception) {
      props.setType("error");
      props.setMessage("Wrong credentials");
      setTimeout(() => {
        props.setMessage(null);
      }, 3000);
    }
  };

  const handleNewEntry = (event) => {
    const value = event.target.value;
    setNewEntry({
      ...newEntry,
      [event.target.name]: value,
    });
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
            <input
              id="title"
              value={newEntry.title}
              name="title"
              onChange={handleNewEntry}
              style={{ marginTop: 10 }}
            />
          </div>
          <div className="ui button">
            author:&nbsp;
            <input
              id="author"
              value={newEntry.author}
              name="author"
              onChange={handleNewEntry}
              style={{ marginTop: 10 }}
            />
          </div>
          <div className="ui button">
            url:&nbsp;
            <input
              id="url"
              value={newEntry.url}
              name="url"
              onChange={handleNewEntry}
              style={{ marginTop: 10 }}
            />
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
