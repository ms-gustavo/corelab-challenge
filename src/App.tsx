import React, { useEffect, useState } from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import { getAllTodos } from "./api/todoApi";
import { Todo } from "./types/todo";
import ToDoForm from "./components/shared/ToDoForm";

const NoteApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [favoriteTodos, setFavoriteTodos] = useState<Todo[]>([]);
  const [todoCreated, setTodoCreated] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const refreshTodos = async () => {
    getAllTodos()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setTodos(response.data);
          setFavoriteTodos(response.data.filter((todo) => todo.isFavorite));
          setLoadError(false);
        } else {
          setLoadError(true);
        }
      })
      .catch((error) => {
        console.error(`Error fetching ToDos: ${error}`);
        setLoadError(true);
      });
  };

  useEffect(() => {
    refreshTodos();
  }, [todoCreated]);

  const handleTodoCreation = () => {
    setTodoCreated((prev) => !prev);
  };

  useEffect(() => {
    console.log(todos);
    console.log(favoriteTodos);
  }, [todos, favoriteTodos]);

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
        <ToDoForm mode="create" onTodoCreated={handleTodoCreation} />
      </div>
      <div className="favorite-container">
        {!loadError &&
          favoriteTodos.map((todo) => (
            <ToDoForm
              key={todo._id}
              mode="update"
              todoId={todo._id}
              initialValues={{
                title: todo.title,
                description: todo.description,
                isFavorite: todo.isFavorite,
                backgroundColor: todo.backgroundColor,
                textColor: todo.textColor,
              }}
            />
          ))}
      </div>
      {/* Notes List */}
      {/* Favorites Section */}
      {/* Note Upload Area */}
    </div>
  );
};

export default NoteApp;
