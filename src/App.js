import React, {useState} from 'react';
import TodoListManager from "./components/todo/todolistmanager/TodoListManager";
import Login from "./components/Login";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Register from "./components/Register";
import NavBar from "./components/navbar/NavBar";
import {isLoggedIn} from "./service/HttpService";
import Profile from "./components/Profile";

function App() {

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  return (
    <>
      <Router>
        <NavBar isLoggedIn={loggedIn} onLogout={() => {
          localStorage.removeItem("jwt");
          setLoggedIn(false);
        }}/>
        <Switch>
          <Route exact path={"/"}><TodoListManager/></Route>
          <Route exact path={"/login"}><Login onLoginSuccess={(jwt) => setLoggedIn(true)}/></Route>
          <Route exact path={"/register"}><Register/></Route>
          <Route exact path={"/profile"}><Profile/></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
