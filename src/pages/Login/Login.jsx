import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
 
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!username || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
 
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
 
        {
          email: username,
          password: password,
        }
       
      );
 
      const { access_token } = response.data;
 
      localStorage.setItem("token", access_token);
      // localStorage.setItem("nome", nome);
      // localStorage.setItem("role", role);
 
      navigate("/Home");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Usuário ou senha incorretos.");
      } else {
        alert("Erro ao realizar login.");
      }
      console.error("Erro de login:", err);
    }
  };
 
  return (
    <div className="container-elementos-login">
      <div className="container-login">
         <div className="">
            <Link to={"/Home"}>
            HOME
            </Link>
          </div>
        <form className="login-form" onSubmit={handleSubmit}>
 
          <h1 className="h1-login" title="Acesse sua conta" alt="Entrar">Login</h1>
 
          <div className="user-container">
            <label htmlFor="email">Usuário</label>
            <input
              type="text"
              id="email"
              placeholder="Digite seu e-mail"
              className="input-email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(""); // limpa erro ao digitar
              }}
              required
            />
          </div>
 
          <div className="password-container">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // limpa erro ao digitar
                }}
                required
                className="input-senha"
              />
              <i
                className={`fas fa-eye${showPassword ? "-slash" : ""} ${
                  "eye-icon"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
 
          <button className="login-submit-button" type="submit">Entrar</button>
 
          <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/Registro">Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default Login;