import { useDispatch, useSelector } from "react-redux";
import { filterAnecdote } from "../reducers/anecdoteReducer";
import React from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  return;
};

export default Filter;
