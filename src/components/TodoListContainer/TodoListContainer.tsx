import React from "react";
import TodoList from "../shared/ToDoList/ToDoList";
import { TodoListContainerProps } from "../../types/todo";

const TodoListContainer: React.FC<TodoListContainerProps> = ({
  todos,
  onTodoDeleted,
  onUpdateTodoInList,
}) => {
  return (
    <div className="note-container">
      <TodoList
        todos={todos}
        onTodoDeleted={onTodoDeleted}
        onUpdateTodoInList={onUpdateTodoInList}
      />
    </div>
  );
};

export default TodoListContainer;
