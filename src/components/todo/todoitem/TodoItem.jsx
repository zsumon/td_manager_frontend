import React, {useState} from "react";
import styles from "./TodoItem.module.css";
import Editor from "./Editor";

const TodoItem = ({item, onTodoEdit, onTodoDelete}) => {

  const [editing, setEditing] = useState(false);

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
        <i onClick={() => {
          setEditing(true);
        }} className="fas fa-edit mr-2" style={{color: "green"}}/>
        <i
          onClick={() => onTodoEdit(item, {...item, isPublic: !item.isPublic})}
          className={"mr-2 text-primary " + (item.isPublic ? "fas fa-eye" : "fas fa-eye-slash")} style={{color: ""}}/>

        <i onClick={() => onTodoDelete(item)} className="fas fa-trash text-danger" style={{color: ""}}/>
      </div>

    </div>
    <Editor text={item.title}
            visible={editing}
            close={() => setEditing(false)}
            onEdit={(editedText) => {
              onTodoEdit(item, {...item, title: editedText});
              setEditing(false);
            }}/>
  </div>
}

export default TodoItem;
