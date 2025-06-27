import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import "../../Css/telaConfiguracoes.css";

function ConfigGerador() {
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    cnpj: "",
    ramo: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: "",
  });

  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const resUsuario = await axios.get("http://localhost:8080/api/v1/usuario/logado", { headers });
        const user = resUsuario.data;
        setUsuarioId(user.id);

        const resEmpresa = await axios.get("http://localhost:8080/api/v1/usuario/geradora/dados", { headers });
        setDados(resEmpresa.data);
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
        alert("Erro ao carregar dados. Faça login novamente.");
        navigate("/Login");
      }
    }
    buscarDados();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/v1/usuario/geradora/${usuarioId}`, dados, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar dados:", err);
      alert("Erro ao atualizar os dados.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir sua conta?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/usuario/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Conta excluída com sucesso.");
      localStorage.clear();
      navigate("/Login");
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      alert("Erro ao excluir conta.");
    }
  };

  return (
    <div className="config-empresa-container">
      <h1>Configurações do Perfil</h1>
      <form onSubmit={handleSubmit} className="config-empresa-form">
        <label>Nome</label>
        <input type="text" name="nome" value={dados.nome} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={dados.email} onChange={handleChange} required />

        <label>Telefone</label>
        <InputMask mask="(99) 99999-9999" name="telefone" value={dados.telefone} onChange={handleChange} required />

        <label>CNPJ</label>
        <InputMask mask="99.999.999/9999-99" name="cnpj" value={dados.cnpj} onChange={handleChange} required />

        <label>Ramo de Atuação</label>
        <select name="ramo" value={dados.ramo} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="industrial">Industrial</option>
          <option value="comercial">Comercial</option>
          <option value="servicos">Serviços</option>
        </select>

        <label>CEP</label>
        <InputMask mask="99999-999" name="cep" value={dados.cep} onChange={handleChange} required />

        <label>Logradouro</label>
        <input type="text" name="logradouro" value={dados.logradouro} onChange={handleChange} />

        <label>Bairro</label>
        <input type="text" name="bairro" value={dados.bairro} onChange={handleChange} />

        <label>Cidade</label>
        <input type="text" name="cidade" value={dados.cidade} onChange={handleChange} />

        <label>UF</label>
        <input type="text" name="uf" value={dados.uf} onChange={handleChange} maxLength={2} />

        <label>Número</label>
        <input type="text" name="numero" value={dados.numero} onChange={handleChange} required />

        <div className="botoes-config-gerador">
          <button type="submit" className="btn-atualizar">Atualizar Dados</button>
          <button type="button" onClick={handleDelete} className="btn-excluir">Excluir Conta</button>
        </div>
      </form>
    </div>
  );
}

export default ConfigGerador;
