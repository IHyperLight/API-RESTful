import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="*"
                    element={
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            backgroundColor: '#1a1a1a',
                            color: 'white',
                            fontFamily: 'Arial, sans-serif'
                        }}>
                            <h1>404 - Página no encontrada</h1>
                            <p>La página que buscas no existe.</p>
                            <button 
                                onClick={() => window.location.href = '/'}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '20px'
                                }}
                            >
                                Ir al inicio
                            </button>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
