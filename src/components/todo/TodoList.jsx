import React from "react";
import TodoItem from "./todoitem/TodoItem";

const TodoList = ({todos, onTodoEdit, onTodoDelete}) => {

  return (
    <div className="list-group mb-3">
      {todos.map((item, index) =>
        <TodoItem key={index} item={item} onTodoEdit={onTodoEdit} onTodoDelete={onTodoDelete}/>
      )}
    </div>
  );
}

export default TodoList;
