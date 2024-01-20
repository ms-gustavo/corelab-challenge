import React from "react";
import TodoList from "../shared/ToDoList/ToDoList";
import { Todo } from "../../types/todo";

type TodoListContainerProps = {
  todos: Todo[];
  onTodoDeleted: () => void;
  onUpdateTodoInList: (updatedTodo: Todo) => void;
};

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
