import React, { useState, useEffect } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao buscar usuários", err));
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/usuarios", {
        nome,
        email,
        senha,
      });

      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado com sucesso:", response.data);
      setUsuarios((prev) => [...prev, response.data]);
      
    } catch (error) {
      alert("Erro ao cadastrar. Verifique todos os campos!");
      console.log("Erro ao cadastrar usuário:", error); // mensagem no console f12
    }
  };

  return (
    <div className="registro-container">
      <div className="formulario-cadastro" id="formulario-cadastro">
        <h2>Seja bem-vindo!</h2>
        <form onSubmit={handleSubmit}>
          
          <label>Nome</label>
          <input 
            type="text" 
            placeholder="Digite o nome da sua empresa" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />

          <label>E-mail</label>
          <input 
            type="email" 
            placeholder="Digite o seu e-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label>Senha</label>
          <div className="input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Crie uma senha" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
            <i 
              className={`fas fa-eye${showPassword ? "-slash" : ""} eyeIcon`} 
              onClick={togglePasswordVisibility} 
            ></i>
          </div>

          <label>Confirmar senha</label>
          <div className="input-container">
            <input 
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
              title="Clique para finalizar seu cadastro" >
              Cadastrar
            </button>
          </div>
          
          <div className="sign-in-link">
            <p>Já possui uma conta?
              <Link to="/Login">Faça login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Registro;