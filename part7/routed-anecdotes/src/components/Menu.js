import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./About";
import Anecdote from "./Anecdote";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import MenuBar from "./MenuBar";

const Menu = ({ anecdotes, addNew, notification, setNotification }) => {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes"
          element={
            <AnecdoteList
              anecdotes={anecdotes}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path="/create-new"
          element={
            <CreateNew
              addNew={addNew}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    </Router>
  );
};

export default Menu;
