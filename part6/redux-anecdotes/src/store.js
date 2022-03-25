import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import searchReducer from "./reducers/searchReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: messageReducer,
    search: searchReducer,
  },
});
