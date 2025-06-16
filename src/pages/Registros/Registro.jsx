import React, { useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
const Registro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [perfil, setPerfil] = useState("");
 
  const navigate = useNavigate(); // Hook de navegação
 
  function getPayloadFromToken(token) {
    if (!token) return null;
 
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
 
    return JSON.parse(jsonPayload);
  }
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    console.log("Email: " + email);
 
    if (password !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
 
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          nome: nome,
          email: email,
          password: password,
          role: perfil,
        }
      );
 
      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado com sucesso:", response.data);
 
      // Decodifica token para pegar id do usuário
      const token = response.data.access_token;
      const emailUsuario = getPayloadFromToken(token).sub;
 
      localStorage.setItem("token", token); // Armazena o token no localStorage
      localStorage.setItem("email", email);
 
      console.log("Email :", emailUsuario);
 
      if (email != "") {
        setPerfil(perfil);
      }
 
      // Redireciona para o próximo passo com usuarioId no state
      if (perfil === "REPRESENTANTECOLETORA") {
        //navigate("/CadastroGerador", { state: { usuario_id } });
        navigate("/CadastroGerador");
      } else if (perfil === "REPRESENTANTEDESTINADORA") {
        // navigate("/CadastroDestinador", { state: { usuario_id } });
        navigate("/CadastroDestinador");
      }
 
      // Limpar formulário
      setNome("");
      setEmail("");
      setPassword("");
      setConfirmarSenha("");
      //setPerfil("REPRESENTANTEDESTINADORA", "REPRESENTANTECOLETORA");
    } catch (error) {
      alert(error.response.data.messages[0]);
      console.error(
        "Erro ao cadastrar usuário:",
        error.response ? error.response.data : error.message
      );
    }
  };
 
return (
  <div className="container-elementos-registro">
    <div className="container-registro"></div>

    <div className="registro-form">
      <h1 className="h1-registro" title="Faça seu primeiro acesso!" alt="Criar uma nova conta">Crie uma conta</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="perfil">Escolha seu perfil de usuário</label>
        <select
          id="perfil"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          <option value="REPRESENTANTECOLETORA">Gerador</option>
          <option value="REPRESENTANTEDESTINADORA">Destinador</option>
        </select>

        <label htmlFor="senha">Senha</label>
        <div className="input-container">
          <input
            id="senha"
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        <label htmlFor="confirmPassword">Confirmar senha</label>
        <div className="input-container">
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirme a sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <i
            className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        <button
          type="submit"
          className="registro-submit-button"
          alt="botão de cadastrar usuário no sistema"
          title="Clique para finalizar seu cadastro"
        >
          Cadastrar
        </button>

        <div className="sign-in-link">
          <p>
            Já possui uma conta? <Link to="/Login">Faça login</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);

};

export default Registro;