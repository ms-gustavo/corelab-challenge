import React from "react";
import "../styles/main.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import ToDoForm from "../components/shared/ToDoForm/ToDoForm";
import useTodoManager from "../hooks/useTodoManager";
import useSearch from "../hooks/useSearch";
import TodoListContainer from "../components/TodoListContainer/TodoListContainer";

const NoteApp: React.FC = () => {
  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useSearch("");
  const {
    todos,
    favoriteTodos,
    nonFavoriteTodos,
    refreshTodos,
    updateTodoInList,
  } = useTodoManager(debouncedSearchTerm);

  const handleSearchTermChange = (
    e: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof e === "string") {
      setSearchTerm(e);
    } else {
      setSearchTerm(e.target.value);
    }
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
          onTodoCreated={refreshTodos}
        />
      </div>
      <TodoListContainer
        todos={favoriteTodos}
        onTodoDeleted={refreshTodos}
        onUpdateTodoInList={updateTodoInList}
      />
      <TodoListContainer
        todos={nonFavoriteTodos}
        onTodoDeleted={refreshTodos}
        onUpdateTodoInList={updateTodoInList}
      />
    </div>
  );
};

export default NoteApp;
