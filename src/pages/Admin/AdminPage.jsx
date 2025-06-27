import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminPage.css";

function AdminPage() {
  const [residuosList, setResiduosList] = useState([]);
  const [residuo, setResiduo] = useState({ id: null, grupo: "", classe: "", descricao: "" });

  const [usuario, setUsuario] = useState({ nome: "", email: "", senha: "", tipoUsuario: "" });
  const [usuariosList, setUsuariosList] = useState([]);

  useEffect(() => {
    fetchResiduos();
    fetchUsuarios();
  }, []);

  // --- RESÍDUOS ---
  const fetchResiduos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/residuo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResiduosList(response.data);
    } catch (err) {
      console.error("Erro ao buscar resíduos:", err);
    }
  };

  const handleResiduoSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (residuo.id) {
        await axios.put(`http://localhost:8080/api/v1/admin/residuo/${residuo.id}`, residuo, { headers });
      } else {
        await axios.post("http://localhost:8080/api/v1/admin/residuo", residuo, { headers });
      }

      setResiduo({ id: null, grupo: "", classe: "", descricao: "" });
      fetchResiduos();
    } catch (err) {
      console.error("Erro ao cadastrar/atualizar resíduo:", err);
    }
  };

  const handleEditarResiduo = (r) => {
    setResiduo(r);
  };

  const handleExcluirResiduo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/admin/residuo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchResiduos();
    } catch (err) {
      console.error("Erro ao excluir resíduo:", err);
    }
  };

  // --- USUÁRIOS ---
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/admin/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuariosList(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.senha,
          role: usuario.tipoUsuario,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsuario({ nome: "", email: "", senha: "", tipoUsuario: "" });
      fetchUsuarios();
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  };

  return (
    <div className="admin-container">
      {/* RESÍDUOS */}
      <div className="form-container">
        <h2>{residuo.id ? "Editar Resíduo" : "Cadastrar Resíduo"}</h2>
        <form onSubmit={handleResiduoSubmit}>
          <input
            type="text"
            placeholder="Classe"
            value={residuo.classe}
            onChange={(e) => setResiduo({ ...residuo, classe: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Grupo (Químico, Orgânico...)"
            value={residuo.grupo}
            onChange={(e) => setResiduo({ ...residuo, grupo: e.target.value })}
            required
          />
          <textarea
            placeholder="Descrição do resíduo"
            value={residuo.descricao}
            onChange={(e) => setResiduo({ ...residuo, descricao: e.target.value })}
            required
          />
          <button type="submit">
            {residuo.id ? "Atualizar Resíduo" : "Cadastrar Resíduo"}
          </button>
        </form>

        <h3>Lista de Resíduos</h3>
        <ul>
          {residuosList.map((r) => (
            <li key={r.id}>
              <strong>{r.grupo}</strong> - {r.classe}
              <br />
              <em>{r.descricao}</em>
              <br />
              <button onClick={() => handleEditarResiduo(r)}>Editar</button>
              <button onClick={() => handleExcluirResiduo(r.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      {/* USUÁRIOS */}
      <div className="form-container">
        <h2>Cadastrar Usuário</h2>
        <form onSubmit={handleUsuarioSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
            required
          />
          <select
            value={usuario.tipoUsuario}
            onChange={(e) => setUsuario({ ...usuario, tipoUsuario: e.target.value })}
            required
          >
            <option value="">Selecione o tipo de usuário</option>
            <option value="REPRESENTANTECOLETORA">Representante Coletora</option>
            <option value="REPRESENTANTEDESTINADORA">Representante Destinadora</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button type="submit">Cadastrar Usuário</button>
        </form>

        <h3>Usuários Cadastrados</h3>
        <ul>
          {usuariosList.map((u) => (
            <li key={u.id}>
              <strong>{u.nome}</strong> — {u.email}
              <br />
              <span>Tipo: {u.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
