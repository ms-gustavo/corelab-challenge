import api from "./axiosInstance";
import { Todo, TodoCreateData } from "../types/todo";

export const createTodo = (todoData: TodoCreateData) =>
  api.post<Todo>("/todos", todoData);

export const getAllTodos = () => api.get<Todo[]>("/todos");

export const getTodoById = (todoId: string) =>
  api.get<Todo>(`/todos/${todoId}`);

export const updateTodo = (todoId: string, updateData: Partial<Todo>) =>
  api.put<Todo>(`/todos/${todoId}`, updateData);

export const deleteTodo = (todoId: string) =>
  api.delete<void>(`/todos/${todoId}`);

export const markTodoAsFavorite = (todoId: string) =>
  api.put<Todo>(`/todos/${todoId}/favorite`);

export const setBackgroundColor = (todoId: string, color: string) =>
  api.put<Todo>(`/todos/${todoId}/color`, { backgroundColor: color });
export const getAllFavoriteTodos = () => api.get<Todo[]>("/todos/favorites");

export const getTodosByColor = (color: string) =>
  api.get<Todo[]>(`/todos/color/${color}`);
