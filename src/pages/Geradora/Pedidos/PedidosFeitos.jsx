import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Destinadora/Pedidos/recebidos.css";
import HeaderGerador from "../../../components/Header/Gerador/HeaderGerador";
import Footer from "../../../components/Layout/Footer";

function PedidosFeitos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Usar a URL do endpoint DTO
  const API_BASE_URL = "http://localhost:8080/api/v1/geradora/coleta/dto";

  async function fetchPedidos() {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao carregar seus pedidos.");
      setPedidos([]);
    } finally {
      setLoading(false);
      setTimeout(() => setMensagem(null), 3000);
    }
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

  function renderBadge(status) {
    return (
      <span className={`badge ${status.toLowerCase()}`}>
        {status.replace("-", " ")}
      </span>
    );
  }

  return (
    <div className="container-home">
      <HeaderGerador />

      <div className="pedidos-container">
        <h1>Minhas Solicitações de Coleta</h1>

        {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}

        {loading ? (
          <p>Carregando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p className="sem-pedidos">Nenhuma solicitação realizada até agora.</p>
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
                  <th>Data</th>
                  <th>Endereço</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.geradora?.nome || "N/D"}</td>
                    <td>{pedido.material || "N/D"}</td>
                    {/* No DTO, a quantidade provavelmente está em 'qt' */}
                    <td>{pedido.qt ?? pedido.quantidade} kg</td>
                    <td>{renderBadge(pedido.status)}</td>
                    {/* Ajuste na data - se seu DTO tem dataColeta */}
                    <td>{pedido.dataColeta ? new Date(pedido.dataColeta).toLocaleDateString() : "N/D"}</td>
                    <td>
                      {pedido.geradora
                        ? `${pedido.geradora.logradouro}, ${pedido.geradora.numero} - ${pedido.geradora.bairro}, ${pedido.geradora.cidade}/${pedido.geradora.uf}`
                        : "N/D"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default PedidosFeitos;
