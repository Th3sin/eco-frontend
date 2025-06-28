import React, { useEffect, useState } from "react";
import axios from "axios";
import "./recebidos.css";

function PedidosRecebidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/v1/auth/pedidos";

  async function fetchPedidos() {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao carregar pedidos.");
      setPedidos([]);
    } finally {
      setLoading(false);
      setTimeout(() => setMensagem(null), 3000);
    }
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

  async function alterarStatusPedido(id, novoStatus) {
    try {
      await axios.put(`${API_BASE_URL}/${id}/status`, { status: novoStatus });
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === id ? { ...pedido, status: novoStatus } : pedido
        )
      );
      setMensagem(`Pedido ${id} atualizado para "${novoStatus}".`);
    } catch (error) {
      console.error(error);
      setMensagem(`Falha ao atualizar pedido ${id}.`);
    } finally {
      setTimeout(() => setMensagem(null), 3000);
    }
  }

  function renderBadge(status) {
    return <span className={`badge ${status}`}>{status.replace("-", " ")}</span>;
  }

  return (
    <div className="pedidos-container">
      <h1>Pedidos Recebidos</h1>

      {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}

      {loading ? (
        <p>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="sem-pedidos">Nenhum pedido recebido no momento.</p>
      ) : (
        <div className="tabela-wrapper">
          <table className="tabela-pedidos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa Geradora</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Data Pedido</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.empresaGeradora}</td>
                  <td>{pedido.material}</td>
                  <td>{pedido.quantidade}kg</td>
                  <td>{renderBadge(pedido.status)}</td>
                  <td>{pedido.dataPedido}</td>
                  <td>
                    {pedido.status === "PENDENTE" ? (
                      <>
                        <button
                          className="btn-aceitar"
                          onClick={() => alterarStatusPedido(pedido.id, "aceito")}
                        >
                          Aceitar
                        </button>
                        <button
                          className="btn-recusar"
                          onClick={() => alterarStatusPedido(pedido.id, "cancelado")}
                        >
                          Recusar
                        </button>
                      </>
                    ) : (
                      <em className="sem-acoes">Sem ações</em>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PedidosRecebidos;