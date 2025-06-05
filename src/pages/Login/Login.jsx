import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css';
import logoLogin from '../../img/icon-ecoplus-login.png';
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
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: username,
        password: password
      });

      const { access_token, nome, role } = response.data;

      // Armazenamento local (opcional)
      // localStorage.setItem("token", access_token);
      // localStorage.setItem("nome", nome);
      // localStorage.setItem("role", role);

      navigate("/Home");

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Usuário ou senha incorretos.");
      } else {
        setError("Erro ao realizar login");
      }
      console.error("Erro de login:", err);
    }
  };

  return (
    <div className={styles.containerElementosLogin}>
      <div className={styles.containerLogin}>
        <form onSubmit={handleSubmit}>
          <div className={styles.logoEcoplus}>
            <Link to={"/Home"}>
              <img src={logoLogin} alt="Logo eco+" title="Eco+" className={styles.logoImg} />
            </Link>
          </div>

          <h1>Login</h1>

          <div className={styles.userContainer}>
            <label htmlFor="email">Usuário</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(""); // limpa erro ao digitar
              }}
              required
            />
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
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
                className={styles.inputSenha}
              />
              <i
                className={`fas fa-eye${showPassword ? "-slash" : ""} ${styles.eyeIcon}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit">Entrar</button>

          <div className={styles.signupLink}>
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