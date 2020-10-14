import React, {useState} from "react";

const AddTodo = ({onTodoAdd}) => {
  const [title, setTitle] = useState('');

  return <div>
    <div className="input-group mb-2">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="form-control"
        placeholder="Something to do..."/>
      <div style={{cursor: "pointer"}} className="input-group-append">
        <span
          style={{background: "#007BE0"}}
          className="input-group-text"
          onClick={() => {
            if (title !== "") {
              onTodoAdd(title);
              setTitle('');
            }
          }}>
          <i className="fas fa-plus" style={{color:"white"}}/>
        </span>
      </div>
    </div>
  </div>;
}

export default AddTodo;
