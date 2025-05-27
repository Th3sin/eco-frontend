import React, { useState, useEffect } from "react";
import { pedidosDados } from "../../../data/coleta"
import "./painel.css";
 
function formatarData(dataISO) {
  if (!dataISO) return "-";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}
 
function formatarHora(hora) {
  return hora ? hora.substring(0, 5) : "-";
}
 
function getStatusInfo(status) {
  switch (status) {
    case "pendente":
      return { text: "Pendente", className: "status-pendente" };
    case "aceito":
      return { text: "Aceito", className: "status-aceito" };
    case "em andamento":
      return { text: "Em Andamento", className: "status-em-andamento" };
    case "concluido":
      return { text: "Concluído", className: "status-concluido" };
    case "cancelado":
      return { text: "Cancelado", className: "status-cancelado" };
    default:
      return { text: status, className: "status-default" };
  }
}
 
function PainelColeta() {
  const [pedidos, setPedidos] = useState(pedidosDados);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [mostraInputCancelamento, setMostraInputCancelamento] = useState(false);
 
  // Filtra os pedidos conforme filtro selecionado
  const pedidosFiltrados = pedidos.filter(
    (p) => statusFilter === "todos" || p.Status_Pedido === statusFilter
  );
 
  // Atualiza o status do pedido, incluindo motivo se cancelar
  function atualizarStatus(idPedido, novoStatus, motivo = null) {
    setPedidos((old) =>
      old.map((p) =>
        p.ID_Pedido === idPedido
          ? {
              ...p,
              Status_Pedido: novoStatus,
              Motivo_Cancelamento: novoStatus === "cancelado" ? motivo : null,
            }
          : p
      )
    );
    fecharModal();
  }
 
  // Abre o modal para um pedido
  function abrirModal(pedido) {
    setPedidoSelecionado(pedido);
    setMotivoCancelamento("");
    setMostraInputCancelamento(false);
  }
 
  // Fecha o modal
  function fecharModal() {
    setPedidoSelecionado(null);
    setMotivoCancelamento("");
    setMostraInputCancelamento(false);
  }
 
  // Inicia a ação de cancelamento
  function iniciarCancelamento() {
    setMostraInputCancelamento(true);
  }
 
  // Confirma o cancelamento com motivo
  function confirmarCancelamento() {
    if (!motivoCancelamento.trim()) {
      alert("Por favor, informe o motivo do cancelamento.");
      return;
    }
    if (pedidoSelecionado) {
      atualizarStatus(pedidoSelecionado.ID_Pedido, "cancelado", motivoCancelamento.trim());
    }
  }
 
  // Cancela a ação de cancelamento
  function cancelarAcaoCancelamento() {
    setMotivoCancelamento("");
    setMostraInputCancelamento(false);
  }
 
  return (
    <div className="painel-destinadora">
      <div className="container bg-white p-6 rounded-lg shadow-md">
        <h1 className="titulo">Painel de Coletas</h1>
 
        <div className="filtro-container">
          <label htmlFor="statusFilter" className="filtro-label">
            Filtrar por Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="aceito">Aceito</option>
            <option value="em andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
 
        <div className="tabela-wrapper">
          <table className="tabela-pedidos">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Geradora</th>
                <th>Data Agendada</th>
                <th>Endereço (Resumo)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="sem-resultados">
                    Nenhum pedido encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
              {pedidosFiltrados.map((pedido) => {
                const statusInfo = getStatusInfo(pedido.Status_Pedido);
                const enderecoResumido = pedido.Endereco_Coleta.split(",").slice(0, 3).join(",");
                return (
                  <tr key={pedido.ID_Pedido}>
                    <td data-label="ID Pedido">{pedido.ID_Pedido}</td>
                    <td data-label="Geradora">
                      {pedido.Geradora_Identificacao.split("(")[0].trim()}
                    </td>
                    <td data-label="Data Agendada">
                      {formatarData(pedido.Data_Agendamento_Coleta)} {formatarHora(pedido.Hora_Agendamento_Coleta)}
                    </td>
                    <td data-label="Endereço">{enderecoResumido}...</td>
                    <td data-label="Status">
                      <span className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</span>
                    </td>
                    <td data-label="Ações">
                      <button
                        className="btn-detalhes"
                        onClick={() => abrirModal(pedido)}
                        type="button"
                      >
                        Detalhes/Ações
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
 
        {/* Modal de detalhes */}
        {pedidoSelecionado && (
          <div className="modal-backdrop" onClick={fecharModal}>
            <div
              className="modal-conteudo"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modalTitulo"
            >
              <h2 id="modalTitulo">Detalhes do Pedido {pedidoSelecionado.ID_Pedido}</h2>
              <button className="btn-fechar" onClick={fecharModal} aria-label="Fechar modal">
                &times;
              </button>
 
              <div className="detalhes-info">
                <p>
                  <strong>Geradora:</strong> {pedidoSelecionado.Geradora_Identificacao}
                </p>
                <p>
                  <strong>Contato:</strong> {pedidoSelecionado.Geradora_Contato}
                </p>
                <p>
                  <strong>Endereço Completo:</strong> {pedidoSelecionado.Endereco_Coleta}
                </p>
                <p>
                  <strong>Informações do Resíduo:</strong> {pedidoSelecionado.Residuo_Informacoes}
                </p>
                <p>
                  <strong>Data da Solicitação:</strong>{" "}
                  {formatarData(pedidoSelecionado.Data_Solicitacao)} {formatarHora(pedidoSelecionado.Hora_Solicitacao)}
                </p>
                <p>
                  <strong>Data Agendada:</strong>{" "}
                  {formatarData(pedidoSelecionado.Data_Agendamento_Coleta)} {formatarHora(pedidoSelecionado.Hora_Agendamento_Coleta)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${getStatusInfo(pedidoSelecionado.Status_Pedido).className}`}>
                    {getStatusInfo(pedidoSelecionado.Status_Pedido).text}
                  </span>
                </p>
 
                {pedidoSelecionado.Status_Pedido === "cancelado" && (
                  <p>
                    <strong>Motivo do Cancelamento:</strong> {pedidoSelecionado.Motivo_Cancelamento}
                  </p>
                )}
              </div>
 
              {/* Ações possíveis conforme status */}
              <div className="acoes-container">
                {pedidoSelecionado.Status_Pedido === "pendente" && (
                  <>
                    <button
                      className="btn-aceitar"
                      onClick={() => atualizarStatus(pedidoSelecionado.ID_Pedido, "aceito")}
                    >
                      Aceitar
                    </button>
                    {!mostraInputCancelamento && (
                      <button className="btn-cancelar" onClick={iniciarCancelamento}>
                        Cancelar
                      </button>
                    )}
                  </>
                )}
 
                {mostraInputCancelamento && (
                  <div className="cancelamento-form">
                    <textarea
                      placeholder="Informe o motivo do cancelamento"
                      value={motivoCancelamento}
                      onChange={(e) => setMotivoCancelamento(e.target.value)}
                      rows={3}
                    />
                    <div className="botoes-cancelamento">
                      <button className="btn-confirmar-cancelamento" onClick={confirmarCancelamento}>
                        Confirmar Cancelamento
                      </button>
                      <button className="btn-voltar" onClick={cancelarAcaoCancelamento}>
                        Voltar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default PainelColeta;