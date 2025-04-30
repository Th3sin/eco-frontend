import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css';
import logoLogin from '../../img/icon-ecoplus-login.png';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visualização de senha
  const navigate = useNavigate();

  // VALIDAÇÃO DADOS FIXOS
  const fixedUsername = "admin@admin.com.br";
  const fixedPassword = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "" || password === "") {
      alert("Por favor, preencha todos os campos");

    } else if (username === fixedUsername && password === fixedPassword) {
      navigate("/Home");

    } else {
      alert("Usuário ou senha incorretos!"); // ou seterror
    }
  };

  //npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
  //npm install --save @fortawesome/fontawesome-free

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna o estado entre verdadeiro e falso
  };

  return (
    <div className={styles.containerElementosLogin}>

      <div className={styles.containerLogin}>
        <form onSubmit={handleSubmit}>

          <div className={styles.logoEcoplus}>
            <Link to={"/Home"}><img src={logoLogin} alt="Logo eco+" title="Eco+" className={styles.logoImg} /></Link>
          </div>

          <h1>Login</h1>

          <div className={styles.userContainer}>

            <label htmlFor="email">Usuário</label>
            <input type="email" placeholder="Digite seu e-mail" value={username} onChange={(e) => setUsername(e.target.value)} 
            required />

          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
              
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Digite a sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.inputSenha} />

              <i className={`fas fa-eye${showPassword ? "-slash" : ""} ${styles.eyeIcon}`} onClick={togglePasswordVisibility}> </i>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className={styles.recallForget}>
            
            <label htmlFor="checkbox">
              <input type="checkbox" />
              Lembre de mim
            </label>

            <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
          </div>

          <button type="submit">Entrar</button>

          <div className={styles.signupLink}>
            <p>Não tem uma conta?
              <Link to="/Registro">Cadastre-se</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;