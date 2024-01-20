import React, { useEffect, useState } from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import { getAllTodos } from "./api/todoApi";
import { Todo } from "./types/todo";
import ToDoForm from "./components/shared/ToDoForm";
import TodoList from "./components/shared/ToDoList/ToDoList";

const NoteApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [favoriteTodos, setFavoriteTodos] = useState<Todo[]>([]);
  const [nonFavoriteTodos, setNonFavoriteTodos] = useState<Todo[]>([]);
  const [todoCreated, setTodoCreated] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce time

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    refreshTodos();
  }, [todoCreated, debouncedSearchTerm]); // Added debouncedSearchTerm as a dependency

  const refreshTodos = async () => {
    getAllTodos()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const filteredTodos = filterTodosBySearchTerm(response.data);
          setTodos(filteredTodos);
          setFavoriteTodos(filteredTodos.filter((todo) => todo.isFavorite));
          setNonFavoriteTodos(filteredTodos.filter((todo) => !todo.isFavorite));
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

  const filterTodosBySearchTerm = (todos: Todo[]) => {
    if (!debouncedSearchTerm) {
      return todos;
    }
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        todo.backgroundColor
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );
  };

  const handleTodoDeletion = () => {
    refreshTodos();
  };

  const handleTodoCreation = () => {
    setTodoCreated((prev) => !prev);
  };

  const updateTodoInList = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );

    setTodos((prevTodos) => {
      const updatedFavoriteTodos = prevTodos.filter((todo) => todo.isFavorite);
      const updatedNonFavoriteTodos = prevTodos.filter(
        (todo) => !todo.isFavorite
      );
      setFavoriteTodos(updatedFavoriteTodos);
      setNonFavoriteTodos(updatedNonFavoriteTodos);
      return prevTodos;
    });
  };

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
      <div className="create-note-container">
        <ToDoForm
          mode="create"
          onUpdateTodoInList={updateTodoInList}
          onTodoCreated={handleTodoCreation}
        />
      </div>
      <div className="note-container">
        {!loadError && (
          <TodoList
            todos={favoriteTodos}
            onTodoDeleted={handleTodoDeletion}
            onUpdateTodoInList={updateTodoInList}
          />
        )}
      </div>
      <div className="note-container">
        {!loadError && (
          <TodoList
            todos={nonFavoriteTodos}
            onTodoDeleted={handleTodoDeletion}
            onUpdateTodoInList={updateTodoInList}
          />
        )}
      </div>
    </div>
  );
};

export default NoteApp;
