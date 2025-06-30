import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormularioColeta.css";

function FormularioColeta() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destinadoraId = queryParams.get("destinadoraId");
  const selectedResiduoId = queryParams.get("residuoId"); // <- vindo da URL
  const navigate = useNavigate();
  const geradoraId = 1;

  const [quantidade, setQuantidade] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [observacaoFinal, setObservacaoFinal] = useState("");
  const [residuos, setResiduos] = useState([]);
  const [residuoId, setResiduoId] = useState(selectedResiduoId || "");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const maxFiles = 2;

  useEffect(() => {
    const fetchResiduos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/residuo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResiduos(response.data || []);
      } catch (err) {
        console.error("Erro ao buscar resíduos:", err);
      }
    };
    fetchResiduos();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const availableSlots = maxFiles - selectedFiles.length;
    if (availableSlots <= 0) {
      alert("Você já atingiu o limite máximo de 2 anexos.");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files.slice(0, availableSlots)]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEnviar = async () => {
    // Validações detalhadas:
    if (!dataColeta) {
      alert("Por favor, preencha a data da coleta.");
      return;
    }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
      alert("Por favor, preencha uma quantidade válida.");
      return;
    }
    if (Number(quantidade) > 70000) {
      alert("A quantidade máxima permitida é 70 toneladas (70000 kg).");
      return;
    }
    if (!residuoId) {
      alert("Resíduo não selecionado.");
      return;
    }
    if (!destinadoraId) {
      alert("Destinadora inválida.");
      return;
    }

    const confirmar = window.confirm("Deseja realmente enviar a solicitação?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const dataColetaISO = new Date(dataColeta);
      dataColetaISO.setHours(12, 0, 0, 0);
      const dataColetaFormatada = dataColetaISO.toISOString().slice(0, 19);

      const coletaRequest = {
        status: "PENDENTE",
        descricao: observacaoFinal || null,
        qt: Number(quantidade),
        fotoResiduo: null,
        dataColeta: dataColetaFormatada,
        codStatus: true,
        geradoraId,
        destinadoraId: Number(destinadoraId),
        residuoId: Number(residuoId),
      };

      await axios.post("http://localhost:8080/api/v1/coleta", coletaRequest, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      alert("Solicitação enviada com sucesso!");
      navigate("/PedidosFeitos");

      setQuantidade("");
      setDataColeta("");
      setObservacaoFinal("");
      setSelectedFiles([]);
    } catch (error) {
      alert("Erro ao enviar solicitação.");
      console.error("Erro:", error);
    }
  };

  // Limites de datas: de 48h até 30 dias
  const dataMinima = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split("T")[0];
  })();

  const dataMaxima = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  })();

  return (
    <div className="coleta-container">

      {/*CAIXA DE AVISO*/}
              <div className="coleta-form-alert">
                  <div className="coleta-alert-box">
                    <p><strong>Alguma dúvida?</strong> Não deixe de checar nossas instruções.</p>
                      <br />
                    <p><strong>Data:</strong> A coleta deve ser agendada com no mínimo 48h de antecedência.</p>
                  </div>
              </div>
              
      <div className="coleta-card">
        <div className="coleta-form-full">
          <h3 className="coleta-etapa-titulo">Solicitação de Coleta</h3>

          <label>Data da Coleta</label>
          <input
            type="date"
            value={dataColeta}
            onChange={(e) => setDataColeta(e.target.value)}
            required
            min={dataMinima}
            max={dataMaxima}
          />

          <label>Quantidade (em kg, máx. 70000)</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => {
              const val = e.target.value;
              // Permite vazio ou número inteiro de 1 a 70000
              if (val === "" || (/^\d+$/.test(val) && Number(val) <= 70000)) {
                setQuantidade(val);
              }
            }}
            onWheel={(e) => e.target.blur()} // evita scroll mudar valor
            placeholder="Ex: 500"
            min="1"
            max="70000"
            step="1"
            inputMode="numeric"
          />

          <label>Resíduo</label>
          <select value={residuoId} disabled>
  <option value="">
    {residuos.find((r) => r.id === Number(residuoId))?.descricao || "Resíduo não encontrado"}
  </option>
</select>


          <label>Anexar Foto (não será enviada)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <div className="preview-container">
              {selectedFiles.map((file, i) => (
                <div key={i} className="preview">
                  <img src={URL.createObjectURL(file)} alt="preview" />
                  <button onClick={() => removeFile(i)}>&times;</button>
                </div>
              ))}
            </div>
          )}

          <label>Observações</label>
          <textarea
            value={observacaoFinal}
            onChange={(e) => setObservacaoFinal(e.target.value)}
            placeholder="insira aqui observações sobre local da coleta, resíduo e transportes, se necessário."
            rows="5"
          />

          <button className="coleta-btn-enviar" onClick={handleEnviar}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioColeta;
