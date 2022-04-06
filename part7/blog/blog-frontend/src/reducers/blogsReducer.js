import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      const content = action.payload;
      state.push(content);
    },
    setBlogs(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const createBlog = (content) => {
  return async (dispatch) => {
    await blogsService.create(content);
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (content, id) => {
  return async (dispatch) => {
    await blogsService.setLike(content, id);
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id);
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
