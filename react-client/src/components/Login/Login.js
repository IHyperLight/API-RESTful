import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const consumir_login = () => {
    var postData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    axios
      .post("http://localhost:8000/api/v1/login", postData, {
        Headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("id_user", response.data["user_id"]);
        window.location = "/profile";
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown, setEyeShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setEyeShown(!eyeShown);
  };

  var eye;
  if (eyeShown) eye = "( ● )";
  else eye = "( − )";

  return (
    <div className="Login-container">
      <div className="Login-left">
        <div className="Login-title">Login</div>
        <div className="Login-eula">
          Si ya tienes una cuenta, usa tu usuario y contraseña para iniciar
          sesión.
        </div>
      </div>
      <div className="Login-right">
        <button onClick={togglePassword} id="Register-show">
          {eye}
        </button>
        <div className="Login-flexbox">
          <div className="Login-item" id="Login-margin">
            <label>Usuario</label>
            <input type="text" id="username" required />
          </div>
          <div className="Login-item">
            <label>Contraseña</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              required
            />
          </div>
          <div className="Login-item">
            <button onClick={consumir_login} id="Login-submit1">
              INICIAR SESIÓN
            </button>
          </div>
          <div className="Login-item">
            <NavLink to="/register">
              <button id="Login-submit2">No tengo cuenta</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
