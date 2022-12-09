import React, { useState,useContext } from "react";
import "../../../style/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "antd";
import { AuthContext } from "../../../Context/AuthContext";
import logo from '../../../Assets/logo.png';
axios.defaults.withCredentials=true;

const Login = () => {
  const { error, dispatch } = useContext(AuthContext);
  const history = useNavigate();
  const [values, setValues] = useState({ matricule: "", password: "" });
  const postdata = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axios
      .post("http://localhost:8800/api/login", {...values,withCredentials:true})
      .then((data) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.data.details });
        history("/autorisation_rebut")
      })
      .catch((err) => {
        setValues({ matricule: "", password: "" });
        console.log(err.response)
        dispatch({ type: "LOGIN_FAILURE", payload: "incorrect informations" });
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
      <div className="login-dark">
        <form method="post" onSubmit={postdata}>
          <h2 className="sr-only">connexion</h2>
          <div className="illustration">
            <img src={logo} alt="logo" style={{width:"170px"}}/>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="matricule"
              required
              placeholder="entrer votre matricule"
              value={values.matricule}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              required
              placeholder="entrer votre mot de passe"
              value={values.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              connecter
            </button>
          </div>
          {error && <Alert message={error} type="error" />}
        </form>
      </div>
  );
};

export default Login;