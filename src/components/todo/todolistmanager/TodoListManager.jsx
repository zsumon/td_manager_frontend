import React, {useEffect, useState} from "react";
import TodoList from "../TodoList";
import AddTodo from "../AddTodo";
import {
  addTodo,
  deleteTodoItem,
  getCurrentUserTodos,
  getPublicTodos,
  isLoggedIn,
  updateTodoItem
} from "../../../service/HttpService";
import {Redirect} from "react-router-dom";
import styles from './TodoListManager.module.css';

const TodoListManager = () => {
  const [todos, setTodos] = useState([]);
  const [publicTodos, setPublicTodos] = useState([]);
  const [loadingPublicTodos, setLoadingPublicTodos] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      loadTodos();
      loadPublicTodos();
    }
  }, []);

  const loadTodos = () => {
    getCurrentUserTodos().then(res => setTodos(res.data)).catch(err => console.log(err));
  }

  const loadPublicTodos = (callbackFn) => {
    getPublicTodos().then(res => {
      setPublicTodos(res.data);
    }).catch(err => console.log(err))
      .finally(() => {
        if (callbackFn) setTimeout(callbackFn, 500);
      });
  }

  if (!isLoggedIn()) {
    return <Redirect to={"/login"}/>
  }

  return <>
    <div className={"container mt-4"} style={{maxWidth: "920px"}}>
      <div className="row">
        <div className="col-md-7">

          <AddTodo onTodoAdd={async (title) => {
            await addTodo({
              title,
              isPublic: false,
              isDone: false
            });
            loadTodos();
          }}/>

          <TodoList
            todos={todos}
            onTodoDelete={async (item) => {
              try {
                await deleteTodoItem(item.id)
                const currentTodos = (await getCurrentUserTodos()).data;
                setTodos(currentTodos);
                if (item.isPublic) {
                  setLoadingPublicTodos(true);
                  const publicTodos = (await getPublicTodos()).data;
                  setPublicTodos(publicTodos);
                }
              } catch (err) {
                console.log(err);
              } finally {
                if (item.isPublic)
                  setTimeout(() => setLoadingPublicTodos(false), 500);
              }
            }}
            onTodoEdit={async (prevTodo, editedTodo) => {
              try {
                await updateTodoItem(editedTodo);
                const currentTodos = (await getCurrentUserTodos()).data;
                setTodos(currentTodos);
                if (prevTodo.isPublic !== editedTodo.isPublic || editedTodo.isPublic) {
                  setLoadingPublicTodos(true);
                  const publicTodos = (await getPublicTodos()).data;
                  setPublicTodos(publicTodos);
                }
              } catch (err) {
                console.log(err);
              } finally {
                if (prevTodo.isPublic !== editedTodo.isPublic || editedTodo.isPublic)
                  setTimeout(() => setLoadingPublicTodos(false), 500);
              }
            }}
          />
        </div>

        <div className="col-md-5">
          <div className="border rounded mb-2 p-2 d-flex justify-content-between align-items-center"
               style={{backgroundColor: "#9ab3f5", color: "honeydew"}}>
            <span className={"mr-2"}>Public list</span>
            <i onClick={() => {
              setLoadingPublicTodos(true);
              loadPublicTodos(() => setLoadingPublicTodos(false));
            }} className={"mr-2 fas fa-sync " + (loadingPublicTodos ? " fa-spin " : "")}/>
          </div>
          <div className="card">
            <div className="card-body">
              {!publicTodos.length && "Public list is empty"}
              {publicTodos.map((it, idx) => (<div className="mb-2" key={idx}>
                <div className="d-flex justify-content-between align-items-center pt-1 pb-1"
                     style={{borderLeft: "5px solid #7579e7", backgroundColor: "#D6E3F3"}}>
                  <p className={"ml-2 mb-0"}>{it.title} <sub>by {it.todoUser.userName}</sub></p>
                  <p className="mb-0 mr-2 " style={{fontSize: "75%"}}>{new Date(it.createdAt).toLocaleDateString()}</p>
                </div>
              </div>))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </>;
}

export default TodoListManager;
