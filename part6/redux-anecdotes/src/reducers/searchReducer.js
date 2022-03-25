import { createSlice } from "@reduxjs/toolkit";

let initialState = "";

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
