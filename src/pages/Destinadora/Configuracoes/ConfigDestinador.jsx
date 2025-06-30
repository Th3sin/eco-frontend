import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/telaConfiguracoes.css";

function ConfigDestinador() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cnpj: "",
    residuoAceito: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado.");

        const resUser = await axios.get("http://localhost:8080/api/v1/usuario/logado", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Buscar dados da empresa destinadora pelo usuário logado
        const resDestinador = await axios.get(
          `http://localhost:8080/api/v1/usuario/destinadora/${resUser.data.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData({
          nome: resDestinador.data.nome || "",
          telefone: resDestinador.data.telefone || "",
          cnpj: resDestinador.data.cnpj || "",
          residuoAceito: resDestinador.data.residuoAceito || "",
          cep: resDestinador.data.cep || "",
          logradouro: resDestinador.data.logradouro || "",
          numero: resDestinador.data.numero || "",
          bairro: resDestinador.data.bairro || "",
          cidade: resDestinador.data.cidade || "",
          uf: resDestinador.data.uf || "",
        });
      } catch (error) {
        setMensagem("Erro ao carregar dados: " + (error.response?.data?.mensagemErro || error.message));
      } finally {
        setLoading(false);
      }
    }
    fetchDados();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/v1/usuario/destinadora/${formData.cnpj}`, // assumindo cnpj como id
        {
          nome: formData.nome,
          telefone: formData.telefone,
          residuoAceito: formData.residuoAceito,
          cep: formData.cep,
          logradouro: formData.logradouro,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.uf,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem("Dados atualizados com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar: " + (error.response?.data?.mensagemErro || error.message));
    }
  }

  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja excluir sua empresa? Esta ação é irreversível.")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/usuario/destinadora/${formData.cnpj}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Empresa excluída com sucesso.");
      window.location.href = "/Login";
    } catch (error) {
      setMensagem("Erro ao excluir: " + (error.response?.data?.mensagemErro || error.message));
    }
  }

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="config-empresa-container">
      <h1>Configurações do Perfil</h1>

      {mensagem && <div className="mensagem">{mensagem}</div>}

      <form onSubmit={handleSubmit} className="config-empresa-form">
        <label>
          Nome da Empresa
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>

        <label>
          Telefone
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </label>

        <label>
          CNPJ (não editável)
          <input type="text" name="cnpj" value={formData.cnpj} readOnly />
        </label>

        <label>
          Resíduo Aceito
          <input type="text" name="residuoAceito" value={formData.residuoAceito} onChange={handleChange} required />
        </label>

        <label>
          CEP (não editável)
          <input type="text" name="cep" value={formData.cep} readOnly />
        </label>

        <label>
          Logradouro
          <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} required />
        </label>

        <label>
          Número
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} required />
        </label>

        <label>
          Bairro
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} required />
        </label>

        <label>
          Cidade
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />
        </label>

        <label>
          UF
          <input
            type="text"
            name="uf"
            value={formData.uf}
            onChange={handleChange}
            maxLength={2}
            required
          />
        </label>

        <div className="botoes">
          <button type="submit" className="btn-salvar">Salvar Alterações</button>
          <button type="button" onClick={handleDelete} className="btn-excluir">Excluir Empresa</button>
        </div>
      </form>
    </div>
  );
}

export default ConfigDestinador;
