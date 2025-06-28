import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormularioColeta.css";

function FormularioColeta() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destinadoraId = queryParams.get("destinadoraId"); // pega da URL
  const navigate = useNavigate();

  // Substitua pelo id real do usuário logado
  const geradoraId = 1;

  const [quantidade, setQuantidade] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [observacaoFinal, setObservacaoFinal] = useState("");
  const [residuos, setResiduos] = useState([]);
  const [residuoId, setResiduoId] = useState("");
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
    const currentCount = selectedFiles.length;
    const availableSlots = maxFiles - currentCount;
    if (availableSlots <= 0) {
      alert("Você já atingiu o limite máximo de 2 anexos.");
      return;
    }
    const filesToAdd = files.slice(0, availableSlots);
    setSelectedFiles((prev) => [...prev, ...filesToAdd]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

 const handleEnviar = async () => {
  if (!dataColeta || !quantidade || !residuoId || !destinadoraId) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const confirmar = window.confirm("Deseja realmente enviar a solicitação?");
  if (!confirmar) return;

  try {
    const token = localStorage.getItem("token");

    // Ajustar data para LocalDateTime esperado no backend
    const dataColetaISO = new Date(dataColeta);
    dataColetaISO.setHours(12, 0, 0, 0);
    const dataColetaFormatada = dataColetaISO.toISOString().slice(0, 19);

    // Monta o objeto ColetaRequest (não aninhado, só ids)
    const coletaRequest = {
      status: "PENDENTE",
      descricao: observacaoFinal || null,
      qt: Number(quantidade),
      fotoResiduo: null, // se quiser enviar, adapte aqui
      dataColeta: dataColetaFormatada,
      codStatus: true,
      geradoraId: geradoraId,
      destinadoraId: Number(destinadoraId),
      residuoId: Number(residuoId),
    };

   const response = await axios.post(
  "http://localhost:8080/api/v1/coleta",
  coletaRequest,
  { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
);

    alert("Solicitação enviada com sucesso!");
console.log(response.data);
navigate("/HomeGeradoor");

    // Limpar formulário
    setQuantidade("");
    setDataColeta("");
    setObservacaoFinal("");
    setResiduoId("");
    setSelectedFiles([]);
  } catch (error) {
    alert("Erro ao enviar solicitação.");
    console.error("Erro:", error);
  }
};

  // Calcula data mínima para agendamento (48h depois da data atual)
  const dataMinima = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split("T")[0];
  })();

  return (
    <div className="coleta-container">
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
          />

          <label>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Ex: 500"
            min="1"
          />

          <label>Resíduo</label>
          <select
            value={residuoId}
            onChange={(e) => setResiduoId(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {residuos.map((r) => (
              <option key={r.id} value={r.id}>
                {r.descricao}
              </option>
            ))}
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
              placeholder="INSIRA AQUI OBSERVAÇÕES SOBRE LOCAL DA COLETA, RESÍDUO E TRANSPORTES SE NECESSÁRIO."
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
