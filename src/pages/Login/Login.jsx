import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import logoEco from "../../img/novo-logo.png";
import background from "../../img/entulho-foda-login.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      // Autenticação para obter token
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: username,
          password: password,
        }
      );

      const { access_token } = response.data;

      // Salva token no localStorage
      localStorage.setItem("token", access_token);

      // Cria instância axios com token para buscar dados do usuário logado
      const api = axios.create({
        headers: { Authorization: `Bearer ${access_token}` },
      });

      // Busca dados do usuário para obter role real
      const userResponse = await api.get("http://localhost:8080/api/v1/usuario/logado");
      const usuario = userResponse.data;
      const role = usuario.role;

      console.log("Role do usuário:", role);

      // Redireciona conforme role
      // Redireciona conforme role
if (role === "REPRESENTANTECOLETORA") {
  navigate("/HomeGerador");
} else if (role === "REPRESENTANTEDESTINADORA") {
  navigate("/HomeDestinador");
} else if (role === "ADMIN") {
  navigate("/AdminPage"); // Ou a rota que seu admin usa
} else {
  navigate("/Home"); // fallback para qualquer outro caso
}


    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert("Usuário ou senha incorretos.");
        } else if (err.response.status === 400) {
          alert("Dados enviados estão incorretos.");
        } else if (err.response.status === 500) {
          alert("Erro interno no servidor, tente mais tarde.");
        } else {
          alert("Erro ao realizar login.");
        }
      } else {
        alert("Erro de conexão ou desconhecido.");
      }
      console.error("Erro de login:", err);
    }
  };

return (
    <div className="container-elementos-login">
      <div className="container-login">
        <div className="logo-login"><Link to="/"><img src={logoEco} title="Área do cliente" alt="logo-eco-plus"/></Link></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="h1-login" alt="Entrar">Login</h1>

          <div className="user-container">
            <label htmlFor="email">Usuário</label>
            <input
              type="text"
              id="email"
              placeholder="Digite seu e-mail"
              className="input-email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fas fa-eye${showPassword ? "-slash" : ""} eye-icon`}
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

      <div className="background-login">
        <img src={background} alt="Fundo do login" />
      </div>
    </div>
  );
}

export default Login;