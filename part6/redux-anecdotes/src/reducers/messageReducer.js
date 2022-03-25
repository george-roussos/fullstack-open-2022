import { createSlice } from "@reduxjs/toolkit";
import { async } from "regenerator-runtime";

let initialState = null;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    createMessage(state, action) {
      const content = action.payload;
      state = `Added anecdote: ${content}`;
      return state;
    },
    voteMessage(state, action) {
      const content = action.payload;
      state = `Voted anecdote: ${content}`;
      return state;
    },
    clearMessage(state) {
      state = null;
      return state;
    },
  },
});

export const { createMessage, voteMessage, clearMessage, setMessage } =
  messageSlice.actions;

export const setNotification = (text, timeout) => {
  return (dispatch) => {
    dispatch(setMessage(text));
    setTimeout(() => {
      dispatch(clearMessage(text));
    }, timeout * 1000);
  };
};

export default messageSlice.reducer;
