import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  let response_username,
    response_email,
    response_first_name,
    response_last_name;
  let user = localStorage.getItem("id_user");
  let token = localStorage.getItem("token");
  let profile_img = "";

  const upload_img = () => {
    let postData = new FormData();
    let fileImage = document.getElementById("file").files[0];
    postData.append("id_user", user);
    postData.append("url_img", fileImage);

    axios
      .post("http://localhost:8000/api/v1/profile/list", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        if (fileImage != null) {
          if (response.data === "put_img") {
            put_img();
          } else {
            profile_img = "http://localhost:8000" + response.data.url_img;
            document.getElementById("img").src = profile_img;
            window.location.reload();
          }
        } else {
          delete_img();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  let put_img = () => {
    let putData = new FormData();
    putData.append("url_img", document.getElementById("file").files[0]);

    axios
      .put("http://localhost:8000/api/v1/profile/user/" + user + "/", putData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        profile_img = "http://localhost:8000" + response.data.url_img;
        document.getElementById("img").src = profile_img;
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  let delete_img = () => {
    axios
      .delete("http://localhost:8000/api/v1/profile/user/" + user + "/", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        profile_img =
          "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM=";
        document.getElementById("img").url = profile_img;
        window.location.reload();
      });
  };

  window.onload = function visualize_data() {
    axios
      .get("http://localhost:8000/api/v1/profile/user/" + user + "/", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        if (response.data.url_img != null) {
          profile_img = "http://localhost:8000" + response.data.url_img;
          document.getElementById("img").src = profile_img;
        } else {
          document.getElementById("img").src =
            "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM=";
        }
      })
      .catch((error) => {
        document.getElementById("img").src =
          "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM=";
      });

    axios
      .get("http://localhost:8000/api/v1/profile/update/" + user + "/", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        response_username = response.data.username;
        response_email = response.data.email;
        response_first_name = response.data.first_name;
        response_last_name = response.data.last_name;
        document.getElementById("username").placeholder = response_username;
        document.getElementById("email").placeholder = response_email;
        document.getElementById("first_name").placeholder = response_first_name;
        document.getElementById("last_name").placeholder = response_last_name;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  let edit_user = () => {
    let putData = new FormData();
    let input_username = document.getElementById("username").value;
    let input_email = document.getElementById("email").value;
    let input_first_name = document.getElementById("first_name").value;
    let input_last_name = document.getElementById("last_name").value;

    if (input_username === "") {
      input_username = response_username;
    }
    if (input_email === "") {
      input_email = response_email;
    }
    if (input_first_name === "") {
      input_first_name = response_first_name;
    }
    if (input_last_name === "") {
      input_last_name = response_last_name;
    }
    putData.append("username", input_username);
    putData.append("email", input_email);
    putData.append("first_name", input_first_name);
    putData.append("last_name", input_last_name);

    axios
      .put(
        "http://localhost:8000/api/v1/profile/update/" + user + "/",
        putData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + token,
          },
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const navigate = useNavigate();

  let log_out = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="Profile-container">
      <div className="Profile-left">
        <div className="Profile-image">
          <img alt="img" id="img" />
        </div>
        <div className="Profile-image-options">
          <label id="Profile-image-submit1">
            Subir
            <input accept="image/*" type="file" id="file"></input>
          </label>
          <button id="Profile-image-submit2" onClick={upload_img}>
            Cambiar Imagen
          </button>
          <button id="Profile-image-submit2" onClick={delete_img}>
            Eliminar Imagen
          </button>
        </div>
      </div>
      <div className="Profile-right">
        <div className="Profile-flexbox">
          <div className="Profile-item" id="Profile-margin">
            <label>Usuario</label>
            <input type="text" id="username" required />
          </div>
          <div className="Profile-item">
            <label>Correo</label>
            <input type="email" id="email" required />
          </div>
          <div className="Profile-item">
            <label>Nombres</label>
            <input type="text" id="first_name" required />
          </div>
          <div className="Profile-item">
            <label>Apellidos</label>
            <input type="text" id="last_name" required />
          </div>
          <div className="Profile-item">
            <button onClick={edit_user} id="Profile-submit1">
              ACTUALIZAR
            </button>
          </div>
          <div className="Profile-item">
            <button id="Profile-submit2" onClick={log_out}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
