import React, { useEffect, useState } from "react";
import axios from "axios";
import "./painelAcompanhamento.css";
import {
  Eye,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  Factory,
  Phone,
  MapPin,
  Recycle,
  CalendarPlus,
  CalendarCheck,
  Activity,
  MessageSquareWarning,
  X,
  CheckCircle,
  CheckCheck,
  Truck,
} from "lucide-react";

export default function PainelAcompanhamento() {
  const [coletas, setColetas] = useState([]);
  const [filtros, setFiltros] = useState({
    status: "todos",
    geradora: "",
    dataInicio: "",
    dataFim: "",
    busca: "",
  });
  const [coletaSelecionada, setColetaSelecionada] = useState(null);
  const [showMotivoCancelamento, setShowMotivoCancelamento] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const apiUrl = "http://localhost:8080/api/coletas";

  const statusList = ["pendente", "aceito", "em andamento", "concluido", "cancelado"];

  const statusInfo = {
    pendente: { label: "Pendente", color: "pendente", icon: <Activity size={14} /> },
    aceito: { label: "Aceito", color: "aceito", icon: <CheckCircle size={14} /> },
    "em andamento": { label: "Em Andamento", color: "em-andamento", icon: <Truck size={14} /> },
    concluido: { label: "Concluído", color: "concluido", icon: <CheckCheck size={14} /> },
    cancelado: { label: "Cancelado", color: "cancelado", icon: <X size={14} /> },
  };

  useEffect(() => {
    carregarColetas();
  }, []);

  const carregarColetas = async () => {
    try {
      const response = await axios.get(apiUrl);
      setColetas(response.data);
    } catch (error) {
      console.error("Erro ao carregar coletas:", error);
      showToast("Erro ao carregar coletas", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFilterChange = (key, value) => {
    setFiltros({ ...filtros, [key]: value });
    setPage(1);
  };

  const limparFiltros = () => {
    setFiltros({
      status: "todos",
      geradora: "",
      dataInicio: "",
      dataFim: "",
      busca: "",
    });
    setPage(1);
    showToast("Filtros limpos.");
  };

  const atualizarStatus = async (id, novoStatus, motivo = null) => {
    try {
      await axios.put(`${apiUrl}/${id}/status`, {
        status: novoStatus,
        motivoCancelamento: motivo,
      });
      showToast(`Coleta ${id} atualizada para ${statusInfo[novoStatus].label}`);
      carregarColetas();
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      showToast("Erro ao atualizar status", "error");
    }
  };

  const abrirModal = (coleta) => {
    setColetaSelecionada(coleta);
    setShowMotivoCancelamento(false);
    setMotivoCancelamento("");
  };

  const fecharModal = () => {
    setColetaSelecionada(null);
    setShowMotivoCancelamento(false);
    setMotivoCancelamento("");
  };

  const exportarCSV = (dados) => {
    if (dados.length === 0) {
      showToast("Nenhum dado para exportar.", "error");
      return;
    }

    const header = [
      "ID",
      "Geradora",
      "Residuo",
      "Data Coleta",
      "Endereco",
      "Status",
      "Descricao",
      "Quantidade",
      "Motivo Cancelamento",
    ];

    const rows = dados.map((p) => [
      p.id,
      p.geradora?.nome,
      p.residuo?.descricao,
      p.dataColeta,
      `${p.geradora?.logradouro}, ${p.geradora?.num}, ${p.geradora?.bairro} - ${p.geradora?.cidade}/${p.geradora?.uf}`,
      p.status,
      p.descricao,
      p.quantidade,
      p.motivoCancelamento || "",
    ]);

    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `coletas_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exportação CSV iniciada.");
  };

  const coletasFiltradas = coletas.filter((p) => {
    const statusMatch = filtros.status === "todos" || p.status === filtros.status;
    const geradoraMatch = p.geradora?.nome?.toLowerCase().includes(filtros.geradora.toLowerCase());
    const dataInicioMatch = !filtros.dataInicio || p.dataColeta >= filtros.dataInicio;
    const dataFimMatch = !filtros.dataFim || p.dataColeta <= filtros.dataFim;
    const buscaMatch =
      filtros.busca === "" ||
      p.id.toString().includes(filtros.busca) ||
      p.geradora?.nome?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      p.geradora?.logradouro?.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      p.residuo?.descricao?.toLowerCase().includes(filtros.busca.toLowerCase());

    return statusMatch && geradoraMatch && dataInicioMatch && dataFimMatch && buscaMatch;
  });

  const totalPages = Math.ceil(coletasFiltradas.length / itemsPerPage);
  const coletasPaginadas = coletasFiltradas.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const resumoStatus = statusList.reduce((acc, status) => {
    acc[status] = coletas.filter((p) => p.status === status).length;
    return acc;
  }, {});

  return (
    <div className="painel-container">
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <h2 className="painel-title">Resumo das Coletas</h2>
      <div className="dashboard">
        {statusList.map((status) => (
          <div className={`dashboard-card ${statusInfo[status].color}`} key={status}>
            <div className="count">{resumoStatus[status] || 0}</div>
            <div className="label">
              {statusInfo[status].icon} {statusInfo[status].label}
            </div>
          </div>
        ))}
      </div>

      <h2 className="painel-title">Filtros e Busca</h2>
      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar por ID, Geradora, Endereço..."
          value={filtros.busca}
          onChange={(e) => handleFilterChange("busca", e.target.value)}
        />
        <select
          value={filtros.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="todos">Todos</option>
          {statusList.map((s) => (
            <option key={s} value={s}>
              {statusInfo[s].label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Geradora"
          value={filtros.geradora}
          onChange={(e) => handleFilterChange("geradora", e.target.value)}
        />
        <input
          type="date"
          value={filtros.dataInicio}
          onChange={(e) => handleFilterChange("dataInicio", e.target.value)}
        />
        <input
          type="date"
          value={filtros.dataFim}
          onChange={(e) => handleFilterChange("dataFim", e.target.value)}
        />
        <div className="filtros-botoes">
          <button onClick={limparFiltros}>
            <RotateCcw size={14} /> Limpar
          </button>
          <button onClick={() => exportarCSV(coletasFiltradas)}>
            <Download size={14} /> Exportar CSV
          </button>
        </div>
      </div>

      <div className="tabela-coleta-container">
        <table className="pedidos-coleta-tabela">
          <thead>
            <tr>
              <th>ID Coleta</th>
              <th>Geradora</th>
              <th>Data Coleta</th>
              <th>Endereço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {coletasPaginadas.length === 0 ? (
              <tr>
                <td colSpan="6" className="sem-registros">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              coletasPaginadas.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.geradora?.nome}</td>
                  <td>{p.dataColeta?.split("T")[0]?.split("-").reverse().join("/")}</td>
                  <td>{`${p.geradora?.logradouro}, ${p.geradora?.num}, ${p.geradora?.bairro} - ${p.geradora?.cidade}/${p.geradora?.uf}`}</td>
                  <td>
                    <span className={`badge ${statusInfo[p.status].color}`}>
                      {statusInfo[p.status].icon} {statusInfo[p.status].label}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => abrirModal(p)}>
                      <Eye size={14} /> Detalhes
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="paginacao">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft size={14} /> Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Próxima <ChevronRight size={14} />
        </button>
      </div>

      {coletaSelecionada && (
        <div className="modal">
          <div className="modal-content">
            <button className="fechar" onClick={fecharModal}>
              <X />
            </button>
            <h2>
              <FileText size={18} /> Detalhes da Coleta {coletaSelecionada.id}
            </h2>
            <div className="detalhes">
              <p>
                <Factory size={14} /> Geradora: {coletaSelecionada.geradora?.nome}
              </p>
              <p>
                <Phone size={14} /> Contato: {coletaSelecionada.geradora?.telefone}
              </p>
              <p>
                <MapPin size={14} /> Endereço:{" "}
                {`${coletaSelecionada.geradora?.logradouro}, ${coletaSelecionada.geradora?.num}, ${coletaSelecionada.geradora?.bairro} - ${coletaSelecionada.geradora?.cidade}/${coletaSelecionada.geradora?.uf}`}
              </p>
              <p>
                <Recycle size={14} /> Resíduo: {coletaSelecionada.residuo?.descricao}
              </p>
              <p>
                <CalendarPlus size={14} /> Data Coleta:{" "}
                {coletaSelecionada.dataColeta?.split("T")[0]?.split("-").reverse().join("/")}
              </p>
              <p>
                <Activity size={14} /> Status:{" "}
                <span className={`badge ${statusInfo[coletaSelecionada.status].color}`}>
                  {statusInfo[coletaSelecionada.status].icon}{" "}
                  {statusInfo[coletaSelecionada.status].label}
                </span>
              </p>
              {coletaSelecionada.status === "cancelado" &&
                coletaSelecionada.motivoCancelamento && (
                  <p className="motivo-cancelamento">
                    <MessageSquareWarning size={14} /> Motivo Cancelamento:{" "}
                    {coletaSelecionada.motivoCancelamento}
                  </p>
                )}
            </div>

            {coletaSelecionada.status === "pendente" && !showMotivoCancelamento && (
              <div className="acoes">
                <button onClick={() => atualizarStatus(coletaSelecionada.id, "aceito")}>
                  <CheckCircle size={14} /> Aceitar
                </button>
                <button onClick={() => setShowMotivoCancelamento(true)}>
                  <X size={14} /> Cancelar
                </button>
              </div>
            )}

            {coletaSelecionada.status === "aceito" && !showMotivoCancelamento && (
              <div className="acoes">
                <button
                  onClick={() => atualizarStatus(coletaSelecionada.id, "em andamento")}
                >
                  <Truck size={14} /> Iniciar Coleta
                </button>
                <button onClick={() => setShowMotivoCancelamento(true)}>
                  <X size={14} /> Cancelar
                </button>
              </div>
            )}

            {coletaSelecionada.status === "em andamento" && !showMotivoCancelamento && (
              <div className="acoes">
                <button
                  onClick={() => atualizarStatus(coletaSelecionada.id, "concluido")}
                >
                  <CheckCheck size={14} /> Concluir
                </button>
              </div>
            )}

            {showMotivoCancelamento && (
              <div className="cancelamento">
                <textarea
                  rows="2"
                  placeholder="Motivo do cancelamento..."
                  value={motivoCancelamento}
                  onChange={(e) => setMotivoCancelamento(e.target.value)}
                />
                <div className="botoes">
                  <button onClick={() => setShowMotivoCancelamento(false)}>
                    <X size={14} /> Voltar
                  </button>
                  <button
                    onClick={() =>
                      atualizarStatus(
                        coletaSelecionada.id,
                        "cancelado",
                        motivoCancelamento
                      )
                    }
                    disabled={!motivoCancelamento}
                  >
                    <CheckCircle size={14} /> Confirmar Cancelamento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
