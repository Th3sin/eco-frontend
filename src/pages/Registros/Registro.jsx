import React, { useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoEco from "../../img/novo-logo.png";
import background from "../../img/trabalhadores-residuos.png";
 
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
 
  // Validação de senha
  const validarSenha = (senha) => {
    const temMinimo8 = senha.length >= 8;
    const temLetra = /[a-zA-Z]/.test(senha);
    const temNumero = /\d/.test(senha);
    return temMinimo8 && temLetra && temNumero;
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validarSenha(password)) {
    alert(
      "A senha deve ter no mínimo 8 caracteres, contendo letras e números."
    );
    return; 
  }

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
        navigate("/Login");
      } else if (perfil === "REPRESENTANTEDESTINADORA") {
        // navigate("/CadastroDestinador", { state: { usuario_id } });
        navigate("/Login");
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
      <div className="container-registro">
        <div className="logo-registro">
          <Link to="/"><img src={logoEco} alt="logo-eco-plus" /></Link>
        </div>

       <div className="registro-form">
        <h1 className="h1-registro">
          {/* <Link to="/Login" className="voltar-link">
            <i className="fas fa-long-arrow-alt-left"></i>
          </Link> */}
          Gera ou destina resíduos? Crie sua conta!
        </h1>

        <form className="registro-campos" onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="perfil">Perfil de usuário</label>
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
          </div>

          <div className="campo-formulario">
            <label htmlFor="senha">Senha</label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
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
          </div>

          <div className="campo-formulario">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <i
                className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          <small className="password-hint">
            A senha deve ter no mínimo 8 caracteres, incluindo letras e números.
          </small>

          <button type="submit" className="registro-submit-button">
            Cadastrar
          </button>

          <div className="sign-in-link">
            Já possui uma conta? <Link to="/Login">Faça login</Link>
          </div>
        </form>
        </div>
      </div>

      <div className="background-registro">
        <img src={background} title="" alt="Coleta de resíduos" />
      </div>
    </div>
  );
};

export default Registro;