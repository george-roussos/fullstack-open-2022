import React from "react";

const Search = (props) => {
  const handleSearch = (event) => {
    props.setSearch(event.target.value);
  };

  return (
    <div>
      <div className="ui button">
        Search:&nbsp;
        <input value={props.search} onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
