import React, { useState, useEffect } from 'react'; //http://localhost:5173/Admin
import axios from 'axios'; 
import './adminPage.css'; 

function AdminPage() {
  const [residuo, setResiduo] = useState({ nome: '', tipo: '', descricao: '' });
  const [usuario, setUsuario] = useState({ nome: '', email: '', senha: '', tipoUsuario: '' });
  const [residuosList, setResiduosList] = useState([]);

  useEffect(() => {
    fetchResiduos();
  }, []);

  const fetchResiduos = async () => {
    try {
      const res = await axios.get('/api/residuos');
      const lista = Array.isArray(res.data) ? res.data : res.data.residuos || [];
      setResiduosList(lista);
    } catch (err) {
      console.error('Erro ao buscar resíduos:', err);
    }
  };

  const handleResiduoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/residuos', residuo);
      fetchResiduos();
      setResiduo({ nome: '', tipo: '', descricao: '' });
    } catch (err) {
      console.error('Erro ao cadastrar resíduo:', err);
    }
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/usuarios', usuario);
      setUsuario({ nome: '', email: '', senha: '', tipoUsuario: '' });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
    }
  };

  const handleEditarResiduo = (r) => {
    setResiduo(r);
  };

  const handleExcluirResiduo = async (id) => {
    try {
      await axios.delete(`/api/residuos/${id}`);
      fetchResiduos();
    } catch (err) {
      console.error('Erro ao excluir resíduo:', err);
    }
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>Cadastrar Resíduo</h2>
        <form onSubmit={handleResiduoSubmit}>
          <input
            type="text"
            placeholder="Nome do resíduo"
            value={residuo.nome}
            onChange={(e) => setResiduo({ ...residuo, nome: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tipo (Classe I, IIA...)"
            value={residuo.tipo}
            onChange={(e) => setResiduo({ ...residuo, tipo: e.target.value })}
            required
          />
          <textarea
            placeholder="Descrição"
            value={residuo.descricao}
            onChange={(e) => setResiduo({ ...residuo, descricao: e.target.value })}
            required
          />
          <button type="submit">Cadastrar/Atualizar Resíduo</button>
        </form>

        <h3>Lista de Resíduos</h3>
        <ul>
          {Array.isArray(residuosList) && residuosList.map((r) => (
            <li key={r.id}>
              <strong>{r.nome}</strong> - {r.tipo}
              <button onClick={() => handleEditarResiduo(r)}>Editar</button>
              <button onClick={() => handleExcluirResiduo(r.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-container">
        <h2>Cadastrar Usuário</h2>
        <form onSubmit={handleUsuarioSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
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
            <option value="GERADORA">Geradora</option>
            <option value="DESTINADORA">Destinadora</option>
          </select>
          <button type="submit">Cadastrar Usuário</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;