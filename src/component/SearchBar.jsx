import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/SearchBar.css";
import { searchImages } from "../redux/actions/imageActions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) dispatch(searchImages(query));
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
