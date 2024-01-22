import React from "react";
import { render, screen } from "@testing-library/react";
import TodoListContainer from "../TodoListContainer";

jest.mock("../../shared/ToDoList/ToDoList", () => (props) => (
  <div data-testid="todo-list-mock">
    Mocked TodoList with todos count: {props.todos.length}
  </div>
));

describe("TodoListContainer", () => {
  const mockTodos = [
    {
      _id: "1",
      title: "First Todo",
      description: "Description 1",
      isFavorite: false,
      backgroundColor: "white",
      textColor: "black",
    },
    {
      _id: "2",
      title: "Second Todo",
      description: "Description 2",
      isFavorite: true,
      backgroundColor: "blue",
      textColor: "white",
    },
  ];

  const mockOnTodoDeleted = jest.fn();
  const mockOnUpdateTodoInList = jest.fn();

  it("renders the TodoList with correct props", () => {
    render(
      <TodoListContainer
        todos={mockTodos}
        onTodoDeleted={mockOnTodoDeleted}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    const todoListMock = screen.getByTestId("todo-list-mock");
    expect(todoListMock).toBeInTheDocument();
    expect(todoListMock).toHaveTextContent(
      `Mocked TodoList with todos count: ${mockTodos.length}`
    );
  });
});
