import React, { useEffect, useState } from "react";
import axios from "axios";
import "./configuracoes.css";

function Configuracoes() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  const API_BASE_URL = "https://sua-api.com/usuario";

  useEffect(() => {
    async function fetchUsuario() {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/me`);
        setUsuario(response.data);
      } catch (error) {
        setErro("Erro ao carregar dados do usuário.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuario();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);
    setErro(null);

    try {
      await axios.put(`${API_BASE_URL}/me`, usuario);
      setMensagem("Dados atualizados com sucesso.");
    } catch (error) {
      setErro("Falha ao atualizar dados.");
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMensagem(null);
        setErro(null);
      }, 4000);
    }
  }

  async function handleExcluirConta() {
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.")) {
      return;
    }
    setLoading(true);
    setMensagem(null);
    setErro(null);
    try {
      await axios.delete(`${API_BASE_URL}/me`);
      setMensagem("Conta excluída com sucesso. Você será redirecionado.");
      // Redirecione ou limpe dados aqui
      setTimeout(() => {
        // Exemplo: window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setErro("Falha ao excluir conta.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pagina-configuracoes">
        <button
        className="btn-voltar"
        onClick={() => window.history.back()}
        aria-label="Voltar"
      >
        ← Voltar
      </button>
    <div className="configuracoes-container">
      

      <h1>Configurações da Conta</h1>

      {loading && <p>Carregando...</p>}
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div className="campo-form">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-form">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={usuario.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
          />
        </div>

        <button type="submit" disabled={loading}>
          Salvar Alterações
        </button>
      </form>

      <hr />

      <section className="excluir-conta">
        <h2>Excluir Conta</h2>
        <p>Esta ação é irreversível. Todos os seus dados serão apagados.</p>
        <button onClick={handleExcluirConta} disabled={loading} className="btn-excluir">
          Excluir Conta
        </button>
      </section>
    </div>
    </div>
  );
}

export default Configuracoes;
