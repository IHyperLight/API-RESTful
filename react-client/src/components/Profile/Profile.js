import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Profile.css";
import API_BASE_URL from "../../config/api";

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    const [profileImg, setProfileImg] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const user = localStorage.getItem("id_user");
    const token = localStorage.getItem("token");

    // Función para manejar la selección de archivo
    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    // Función para cargar datos del usuario
    const loadUserData = useCallback(() => {
        // Cargar datos básicos del usuario (username, email, etc.)
        axios
            .get(`${API_BASE_URL}/api/v1/profile/update/` + user + "/", {
                headers: {
                    Authorization: "Token " + token,
                },
            })
            .then((response) => {
                setUserData({
                    username: response.data.username,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                });
            })
            .catch((error) => {
                console.log("Error al cargar datos del usuario:", error);
            });

        // Cargar imagen del perfil
        axios
            .get(`${API_BASE_URL}/api/v1/profile/user/` + user + "/", {
                headers: {
                    Authorization: "Token " + token,
                },
            })
            .then((response) => {
                if (response.data.url_img) {
                    setProfileImg(`${API_BASE_URL}` + response.data.url_img);
                } else {
                    setProfileImg(
                        "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM="
                    );
                }
            })
            .catch((error) => {
                // Usar imagen por defecto si no hay imagen de perfil
                setProfileImg(
                    "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM="
                );
            });
    }, [user, token]);

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }

        // Cargar datos del usuario
        loadUserData();
    }, [user, token, navigate, loadUserData]);

    const upload_img = () => {
        let postData = new FormData();
        let fileImage = selectedFile;
        postData.append("id_user", user);
        postData.append("url_img", fileImage);

        axios
            .post(`${API_BASE_URL}/api/v1/profile/list`, postData, {
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
                        const newProfileImg =
                            `${API_BASE_URL}` + response.data.url_img;
                        setProfileImg(newProfileImg);
                        // Recargar datos del usuario
                        loadUserData();
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
        putData.append("url_img", selectedFile);

        axios
            .put(`${API_BASE_URL}/api/v1/profile/user/` + user + "/", putData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Token " + token,
                },
            })
            .then((response) => {
                const newProfileImg = `${API_BASE_URL}` + response.data.url_img;
                setProfileImg(newProfileImg);
                // Recargar datos del usuario
                loadUserData();
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    let delete_img = () => {
        axios
            .delete(`${API_BASE_URL}/api/v1/profile/user/` + user + "/", {
                headers: {
                    Authorization: "Token " + token,
                },
            })
            .then((response) => {
                const defaultImg =
                    "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM=";
                setProfileImg(defaultImg);
                // Recargar datos del usuario
                loadUserData();
            });
    };

    let edit_user = () => {
        let putData = new FormData();

        // Usar los valores del estado de React
        putData.append("username", userData.username || "");
        putData.append("email", userData.email || "");
        putData.append("first_name", userData.first_name || "");
        putData.append("last_name", userData.last_name || "");

        axios
            .put(
                `${API_BASE_URL}/api/v1/profile/update/` + user + "/",
                putData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Token " + token,
                    },
                }
            )
            .then((response) => {
                // Recargar datos del usuario en lugar de recargar la página
                loadUserData();
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    let log_out = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="Profile-container">
            <div className="Profile-left">
                <div className="Profile-image">
                    <img
                        alt="img"
                        src={
                            profileImg ||
                            "https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM="
                        }
                    />
                </div>
                <div className="Profile-image-options">
                    <label id="Profile-image-submit1">
                        Subir
                        <input
                            accept="image/*"
                            type="file"
                            onChange={(e) =>
                                handleFileSelect(e.target.files[0])
                            }
                        />
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
                        <input
                            type="text"
                            value={userData.username}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    username: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="Profile-item">
                        <label>Correo</label>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    email: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="Profile-item">
                        <label>Nombres</label>
                        <input
                            type="text"
                            value={userData.first_name}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    first_name: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="Profile-item">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            value={userData.last_name}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    last_name: e.target.value,
                                })
                            }
                            required
                        />
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
