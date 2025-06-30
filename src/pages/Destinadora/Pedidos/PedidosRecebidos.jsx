import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderDestinador from "../../../components/Header/Destinador/HeaderDestinador";
import "./recebidos.css";
// import Footer from "../../../components/Layout/Footer";

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
    return <span className={`badge ${status.toLowerCase()}`}>{status.replace("-", " ")}</span>;
  }

  return (
    <div className="pedidos-container">
      <HeaderDestinador />
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
      <th>Telefone</th> {/* NOVA COLUNA */}
      <th>Material</th>
      <th>Quantidade</th>
      <th>Data Pedido</th>
      <th>Endereço da Empresa</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {pedidos.map((pedido) => (
      <tr key={pedido.id}>
        <td>{pedido.id}</td>
        <td>{pedido.geradora?.nome || "N/D"}</td>
        <td>{pedido.geradora?.telefone || "N/D"}</td> {/* NOVA CÉLULA */}
        <td>{pedido.material}</td>
        <td>{pedido.quantidade} kg</td>
        <td>{new Date(pedido.dataPedido || pedido.dataColeta).toLocaleDateString()}</td>
        <td>
          {pedido.geradora
            ? `${pedido.geradora.logradouro}, ${pedido.geradora.numero} - ${pedido.geradora.bairro}, ${pedido.geradora.cidade}/${pedido.geradora.uf}`
            : "N/D"}
        </td>
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

      {/* <Footer /> */}
    </div>
  );
}

export default PedidosRecebidos;
