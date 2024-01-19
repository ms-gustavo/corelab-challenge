import React, { useState } from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";

type Note = {
  id: number;
  title: string;
  isFavorite: boolean;
};

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //TODO: Function to add a new note
  const addNote = (title: string) => {};

  //TODO: Function to toggle the favorite status of a note
  const toggleFavorite = (id: number) => {};

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

      <div className="note-creation">
        <input
          type="text"
          placeholder="Título"
          value={newNoteTitle}
          onChange={handleNoteTitleChange}
        />
        <button onClick={() => addNote(newNoteTitle)}>Criar nota</button>
      </div>

      {/* Notes List */}
      {/* Favorites Section */}
      {/* Note Upload Area */}
    </div>
  );
};

export default NoteApp;
