import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.scss";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/color-search.svg";
import ColorPicker from "../ColorPicker/ColorPicker";
import { SearchBarProps } from "../../types/todo";

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  handleSearchTermChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setShowColorPicker(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchTermChange(event);
  };

  const handleColorSelect = (color: string) => {
    handleSearchTermChange(color);
    console.log(color);
    setShowColorPicker(false);
  };

  return (
    <div className="search-bar-container">
      <img src={logo} alt="Logo" className="search-bar-logo" />
      <span className="search-bar-text">CoreNotes</span>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar notas"
          value={searchTerm}
          onChange={handleChange}
          className="search-bar-input"
        />
        <div className="search-icon-wrapper" ref={wrapperRef}>
          <button className="search-bar-button" onClick={toggleColorPicker}>
            <img src={searchIcon} alt="SearchIcon" />
          </button>
          {showColorPicker && <ColorPicker onSelect={handleColorSelect} />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
