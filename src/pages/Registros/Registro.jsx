import React, { useState } from "react";
import "./registro.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [perfil, setPerfil] = useState("REPRESENTANTEDESTINADORA","REPRESENTANTECOLETORA");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado com sucesso:", response.data);

      setUsuarios((prev) => [...prev, response.data]);

      // Limpar formulário
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
      setPerfil("REPRESENTANTEDESTINADORA", "REPRESENTANTECOLETORA");

    } catch (error) {
      alert("Erro ao cadastrar. Verifique todos os campos!");
      console.error("Erro ao cadastrar usuário:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="registro-container">
      <div className="formulario-cadastro" id="formulario-cadastro">
        <h2>Acesse sua conta</h2>
        <form onSubmit={handleSubmit}>

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite o nome da sua empresa"
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

          <label htmlFor="perfil">Escolha seu perfil</label>
          <select 
            id="perfil"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            required
          >
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
              onChange={(e) => setSenha(e.target.value)}
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

          <div className="form-group">
            <button
              type="submit"
              alt="botão de cadastrar usuário no sistema"
              title="Clique para finalizar seu cadastro"
            >
              Cadastrar
            </button>
          </div>

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