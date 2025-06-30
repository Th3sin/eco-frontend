import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderDestinador from "../../../components/Header/Destinador/HeaderDestinador";

function HistoricoColetas() {
  const [coletas, setColetas] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/v1/auth/coletas"; // Ajuste se necessário

  async function fetchColetas() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dados recebidos do backend:", response.data);

      // Filtra só os que tem status finalizado (case insensitive)
      const coletasFinalizadas = response.data.filter(
        (coleta) =>
          coleta.status &&
          coleta.status.toLowerCase() === "finalizado"
      );

      setColetas(coletasFinalizadas);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao carregar histórico de coletas.");
      setColetas([]);
    } finally {
      setLoading(false);
      setTimeout(() => setMensagem(null), 3000);
    }
  }

  useEffect(() => {
    fetchColetas();
  }, []);

  function renderBadge(status) {
    return <span className={`badge ${status.toLowerCase()}`}>{status}</span>;
  }

  return (
    <div className="historico-coletas-container">
      <HeaderDestinador />
      <h1>Histórico de Coletas Finalizadas</h1>

      {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}

      {loading ? (
        <p>Carregando histórico...</p>
      ) : coletas.length === 0 ? (
        <p>Nenhuma coleta finalizada encontrada.</p>
      ) : (
        <div className="tabela-wrapper">
          <table className="tabela-coletas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa Geradora</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Data Coleta</th>
              </tr>
            </thead>
            <tbody>
              {coletas.map((coleta) => (
                <tr key={coleta.id}>
                  <td>{coleta.id}</td>
                  <td>{coleta.empresaGeradora}</td>
                  <td>{coleta.material}</td>
                  <td>{coleta.quantidade}kg</td>
                  <td>{renderBadge(coleta.status)}</td>
                  <td>{new Date(coleta.dataColeta).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoricoColetas;
