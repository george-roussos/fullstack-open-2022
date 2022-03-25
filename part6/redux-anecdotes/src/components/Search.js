import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../reducers/searchReducer";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((store) => store.search);

  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }} className="ui button">
        Search:&nbsp;
        <input value={search} onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
