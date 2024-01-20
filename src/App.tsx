import React from "react";
import "./styles/main.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import ToDoForm from "./components/shared/ToDoForm/ToDoForm";
import useTodoManager from "./hooks/useTodoManager";
import useSearch from "./hooks/useSearch";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import TodoListContainer from "./components/TodoListContainer/TodoListContainer";

const NoteApp: React.FC = () => {
  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useSearch("");
  const {
    todos,
    favoriteTodos,
    nonFavoriteTodos,
    loadError,
    refreshTodos,
    updateTodoInList,
  } = useTodoManager(debouncedSearchTerm);

  return (
    <div className="note-app">
      <SearchBar
        searchTerm={searchTerm}
        handleSearchTermChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="create-note-container">
        <ToDoForm
          mode="create"
          onUpdateTodoInList={updateTodoInList}
          onTodoCreated={refreshTodos}
        />
      </div>
      <ErrorDisplay showError={loadError} />
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
