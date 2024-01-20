import React from "react";
import "./SearchBar.scss";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.svg";
import { SearchBarProps } from "../../types/todo";

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  handleSearchTermChange,
}) => {
  return (
    <div className="search-bar-container">
      <img src={logo} alt="Logo" className="search-bar-logo" />
      <span className="search-bar-text">CoreNotes</span>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar notas"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-bar-input"
        />
        <button className="search-bar-button">
          <img src={searchIcon} alt="SearchIcon" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
