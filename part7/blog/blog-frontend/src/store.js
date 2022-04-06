import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogsReducer";
import messageReducer from "./reducers/messageReducer";
import messageStyleReducer from "./reducers/messageStyleReducer";
import userReducer from "./reducers/usersReducer";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    messageStyle: messageStyleReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});
