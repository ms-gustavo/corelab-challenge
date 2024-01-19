import React, { useEffect, useState } from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import ToDoCreation from "./components/ToDoCreation/ToDoCreation";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import { getAllTodos } from "./api/todoApi";
import { Todo } from "./types/todo";

const NoteApp: React.FC = () => {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoCreated, setTodoCreated] = useState(false);

  const refreshTodos = async () => {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error(`Error fetching ToDos: ${error}`));
  };

  useEffect(() => {
    refreshTodos();
  }, [todoCreated]);

  const handleTodoCreation = () => {
    setTodoCreated((prev) => !prev);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

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
        <ToDoCreation onTodoCreated={handleTodoCreation} />
      </div>
      <div className="favorite-container">
        <ToDoItem />
      </div>
      {/* Notes List */}
      {/* Favorites Section */}
      {/* Note Upload Area */}
    </div>
  );
};

export default NoteApp;
