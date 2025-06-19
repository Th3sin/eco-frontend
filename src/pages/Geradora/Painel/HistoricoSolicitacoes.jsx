import React, { useEffect, useState } from "react";
import axios from "axios";
import "./historico.css";

function HistoricoSolicitacoes() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const API_BASE_URL = "https://sua-api.com/coletas";

  useEffect(() => {
    async function fetchPedidos() {
      setLoading(true);
      setErro(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/meus-pedidos`);
        setPedidos(response.data);
      } catch (error) {
        setErro("Erro ao carregar pedidos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  function renderStatusBadge(status) {
    return <span className={`badge ${status}`}>{status}</span>;
  }

  return (
    <div className="historico-container">
      <button
        className="btn-voltar"
        onClick={() => window.history.back()}
      >
        ← Voltar
      </button>

      <h1>Histórico de Pedidos</h1>

      {loading && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      {pedidos.length === 0 && !loading ? (
        <p className="sem-pedidos">Você não possui pedidos realizados.</p>
      ) : (
        <div className="tabela-wrapper">
          <table className="tabela-pedidos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Destinadora</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Data Pedido</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.destinadora}</td>
                  <td>{pedido.material}</td>
                  <td>{pedido.quantidade}</td>
                  <td>{renderStatusBadge(pedido.status)}</td>
                  <td>{new Date(pedido.dataPedido).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoricoSolicitacoes;