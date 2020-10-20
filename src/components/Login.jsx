import React, {useState} from "react";
import {Redirect, Link} from "react-router-dom";
import {login} from "../service/HttpService";

const Login = ({onLoginSuccess}) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login({userName, password});
      console.log(res.data);
      if (res.data.jwt) {
        localStorage.jwt = res.data.jwt;
        onLoginSuccess(localStorage.jwt);
        setLoading(false);
        // we have to call setLoading(false) first before setJwt(...) call, to prevent redirection before the loading flag update,
        // else we'll be setting state variable while Login component is already unmounted, thus giving us an error likely can't perform state update in unmounted component
        setJwt(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  if (jwt) return <Redirect to={"/"}/>

  return <div className="container mt-4">
    <div className="card" style={{maxWidth: "25rem", margin: "0 auto"}}>
      <div className="card-header">Login</div>
      <div className="card-body">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-user"/></span>
          </div>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text" className="form-control" placeholder="Username"/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-key"/></span>
          </div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"
                 placeholder="Password"/>
        </div>
        <button style={{width: "100%"}}
                onClick={handleLogin}
                className="btn btn-primary d-flex align-items-center justify-content-center"
                type="button"
                disabled={loading}>
          {loading && <> <span className="spinner-border mr-2 spinner-border-sm"/>Logging in...</>}
          {!loading && "Login"}
        </button>

      </div>
    </div>
  </div>
}

export default Login;
