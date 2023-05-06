import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  let navigate = useNavigate();

  const consumir_register = () => {
    var postData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      password2: document.getElementById("password2").value,
      email: document.getElementById("email").value,
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
    };

    axios
      .post("http://localhost:8000/api/v1/registro/crear/", postData, {
        Headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        alert("Usuario creado exitosamente");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("No se pudo crear el usuario");
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
    <div className="Register-container">
      <div className="Register-left">
        <div className="Register-title">Register</div>
        <div className="Register-eula">
          Si aún no tienes una cuenta, puedes ingresar tus datos para
          registrarte como un nuevo usuario.
        </div>
      </div>
      <div className="Register-right">
        <button onClick={togglePassword} id="Register-show">
          {eye}
        </button>
        <div className="Register-flexbox">
          <div className="Register-item" id="Register-margin">
            <label>Usuario</label>
            <input type="text" id="username" required />
          </div>
          <div className="Register-item">
            <label>Contraseña</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              required
            />
          </div>
          <div className="Register-item">
            <label>Confirmar contraseña</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password2"
              required
            />
          </div>
          <div className="Register-item">
            <label>Correo</label>
            <input type="email" id="email" required />
          </div>
          <div className="Register-item">
            <label>Nombres</label>
            <input type="text" id="first_name" required />
          </div>
          <div className="Register-item">
            <label>Apellidos</label>
            <input type="text" id="last_name" required />
          </div>
          <div className="Register-item">
            <button onClick={consumir_register} id="Register-submit1">
              REGISTRARME
            </button>
          </div>
          <div className="Register-item">
            <NavLink to="/login">
              <button id="Register-submit2">Ya tengo cuenta</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
