import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
    history.push("/")
  };

  const demoLogin = () => {
    // e.preventDefault();
setErrors([]);
dispatch(sessionActions.login({ credential: "demo@user.com", password: "DemoUser" }))
    history.push("/")
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login pure-form-stacked" onSubmit={handleSubmit}>
      <label>
          Username or Email

        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        </label>
      <label>
          Password

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </label>
    <div className="buttons">
      <button className="login-button" type="submit">Log In</button>
          <button className="login-button" type="button" onClick={()=>demoLogin()}>Demo</button>
    </div>
    </form>
      <ul className="errorList-login">
        {errors.map((error, idx) => (
          <li className="errors-login" key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export default LoginForm;
