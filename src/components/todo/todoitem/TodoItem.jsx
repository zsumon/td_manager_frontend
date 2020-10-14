import React from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({item, onTodoEdit, onTodoDelete}) => {

  return <div className="list-group-item">
    <div className="d-flex align-items-baseline justify-content-between ">
      <div className="d-flex align-items-center">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={"todo_" + item.id} checked={item.isDone}
                 onChange={() => onTodoEdit(item, {...item, isDone: !item.isDone})}/>
          <label className="custom-control-label" htmlFor={"todo_" + item.id}>{item.isDone ? <del>{item.title}</del> :
            <span>{item.title}</span>}</label>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <i className="fas fa-edit mr-2" style={{color: "green"}}/>
        <i
          onClick={() => onTodoEdit(item, {...item, isPublic: !item.isPublic})}
          className={"mr-2 text-primary " + (item.isPublic ? "fas fa-eye" : "fas fa-eye-slash")} style={{color: ""}}/>

        <i onClick={() => onTodoDelete(item)} className="fas fa-trash text-danger" style={{color: ""}}/>
      </div>

    </div>
  </div>
}

export default TodoItem;
