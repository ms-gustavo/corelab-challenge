import { useState, useEffect } from "react";
import { getAllTodos } from "../api/todoApi";
import { Todo } from "../types/todo";

const useTodoManager = (debouncedSearchTerm: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [favoriteTodos, setFavoriteTodos] = useState<Todo[]>([]);
  const [nonFavoriteTodos, setNonFavoriteTodos] = useState<Todo[]>([]);
  const [todoCreated, setTodoCreated] = useState<boolean>(false);

  useEffect(() => {
    refreshTodos();
  }, [debouncedSearchTerm, todoCreated]);

  const refreshTodos = async () => {
    try {
      const response = await getAllTodos();
      if (Array.isArray(response.data)) {
        const filteredTodos = filterTodosBySearchTerm(response.data);
        setTodos(filteredTodos);
        setFavoriteTodos(filteredTodos.filter((todo) => todo.isFavorite));
        setNonFavoriteTodos(filteredTodos.filter((todo) => !todo.isFavorite));
      }
    } catch (error) {
      console.error(`Error fetching ToDos: ${error}`);
      setTodos([]);
      setFavoriteTodos([]);
      setNonFavoriteTodos([]);
    }
  };

  useEffect(() => {
    console.log("nonFavoriteTodos", nonFavoriteTodos);
    console.log("favoriteTodos", favoriteTodos);
  }, [nonFavoriteTodos, favoriteTodos]);

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

  const handleTodoCreation = () => {
    setTodoCreated((prev) => !prev);
  };

  const handleTodoDeletion = (todoId: string) => {
    refreshTodos();
  };

  const updateTodoInList = (updatedTodo: Todo) => {
    const newTodos = todos.map((todo) =>
      todo._id === updatedTodo._id ? { ...updatedTodo } : todo
    );

    setTodos(newTodos);
    setFavoriteTodos(newTodos.filter((todo) => todo.isFavorite));
    setNonFavoriteTodos(newTodos.filter((todo) => !todo.isFavorite));
  };

  return {
    todos,
    favoriteTodos,
    nonFavoriteTodos,
    refreshTodos,
    updateTodoInList,
    handleTodoCreation,
    handleTodoDeletion,
  };
};

export default useTodoManager;
