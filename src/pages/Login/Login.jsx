import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ✅ Validação de senha
  const validarSenha = (senha) => {
    const temMinimo8 = senha.length >= 8;
    const temLetra = /[a-zA-Z]/.test(senha);
    const temNumero = /\d/.test(senha);
    return temMinimo8 && temLetra && temNumero;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // 🔒 Validação da senha antes de enviar
    if (!validarSenha(password)) {
      alert(
        "A senha deve ter no mínimo 8 caracteres, contendo letras e números."
      );
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
          <Link to={"/Home"}>HOME</Link>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="h1-login" title="Acesse sua conta" alt="Entrar">
            Login
          </h1>

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
                className="input-senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <i
                className={`fas fa-eye${showPassword ? "-slash" : ""} eye-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <small className="password-hint">
              A senha deve ter no mínimo 8 caracteres, incluindo letras e números.
            </small>
          </div>

          <button className="login-submit-button" type="submit">
            Entrar
          </button>

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