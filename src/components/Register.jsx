import React, {useState} from "react";
import {isLoggedIn, register} from "../service/HttpService";
import {Redirect} from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    let err = false;
    if (!userName || !userName.length) {
      err = true;
    }
    if (!fullName || !fullName.length) {
      err = true;
    }
    if (!password || !password.length) {
      err = true;
    }
    if (err) {
      alert("Please fill up the form correctly");
      return;
    }

    try {
      const res = await register({userName, fullName, password});
      console.log(res.data);
      if (typeof res.data !== "object") {
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoggedIn()) return <Redirect to={"/"}/>

  return <div className="mt-4">
    <div className="card" style={{maxWidth: "25rem", margin: "0 auto"}}>
      <div className="card-header text-center">Register</div>
      <div className="card-body">

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-id-badge"/></span>
          </div>
          <input onChange={(e) => setFullName(e.target.value)} type="text" className="form-control"
                 placeholder="Full name"/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-user"/></span>
          </div>
          <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control"
                 placeholder="Username"/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-key"/></span>
          </div>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"
                 placeholder="Password"/>
        </div>

        <button style={{width: "100%"}} onClick={handleRegistration} className="btn btn-success">Register</button>

      </div>
    </div>
  </div>
}

export default Register;
