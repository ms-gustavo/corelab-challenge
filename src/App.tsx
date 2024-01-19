import React, { useState } from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import NoteCreation from "./components/NoteCreation/NoteCreation";
import NoteItem from "./components/NoteItem/NoteItem";

const NoteApp: React.FC = () => {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //TODO: Function to handle note title input changes
  const handleNoteTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNoteTitle(event.target.value);
  };

  //TODO: Function to handle search term changes
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="note-app">
      <SearchBar
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <div className="note-container">
        <NoteCreation />
      </div>
      <div className="favorite-container">
        <NoteItem />
      </div>
      {/* Notes List */}
      {/* Favorites Section */}
      {/* Note Upload Area */}
    </div>
  );
};

export default NoteApp;
