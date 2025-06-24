import React, { useState } from "react";
import axios from "axios"; // npm install axios
import imageCompression from "browser-image-compression"; // npm install browser-image-compression
import "./solicitarColeta.css";
import InputMask from "react-input-mask"; // npm install react-input-mask

function SolicitarColeta() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Estados dos arquivos selecionados para preview e base64 para envio
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagesBase64, setImagesBase64] = useState([]);

    const [endereco, setEndereco] = useState({
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    });

    const handleEnderecoChange = (campo) => {
      setEndereco((prev) => ({ ...prev, ...campo }));
    };

  // Outros estados do formulário
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [turno, setTurno] = useState("");
  const [observacaoEtapa1, setObservacaoEtapa1] = useState("");
  const [nomeResiduo, setNomeResiduo] = useState("");
  const [classeResiduo, setClasseResiduo] = useState("");
  const [grupoResiduo, setGrupoResiduo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacaoFinal, setObservacaoFinal] = useState("");

  const maxFiles = 2; // limite máximo de anexos

  // Função para comprimir imagem e converter para base64
  const compressAndConvertToBase64 = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error("Erro ao comprimir imagem:", error);
      return null;
    }
  };

  // Manipula seleção de arquivos, limita quantidade e converte para base64 comprimida
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    const currentCount = selectedFiles.length;
    const availableSlots = maxFiles - currentCount;

    if (availableSlots <= 0) {
      alert("Você já atingiu o limite máximo de 2 anexos.");
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);

    // Atualiza preview dos arquivos
    setSelectedFiles((prev) => [...prev, ...filesToAdd]);

    // Para cada arquivo, comprime e converte para base64, depois adiciona no estado
    for (const file of filesToAdd) {
      const base64 = await compressAndConvertToBase64(file);
      if (base64) {
        setImagesBase64((prev) => [...prev, base64]);
      }
    }
  };

  // Remove arquivo da lista de anexos e da base64
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagesBase64((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para enviar o formulário
  const handleEnviar = async () => {
    const confirmar = window.confirm(
      "Verifique todos os campos antes de enviar. Deseja continuar?"
    );
    if (!confirmar) return;

    try {
      const novaSolicitacao = {
        nomeEmpresa,
        telefone,
        dataColeta,
        turno,
        observacaoEtapa1,
        nomeResiduo,
        classeResiduo,
        grupoResiduo,
        quantidade,
        observacaoFinal,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        imagensBase64: imagesBase64,
      };

      const response = await axios.post(
        "http://localhost:3000/solicitacoes",
        novaSolicitacao
      );
      alert("Solicitação enviada com sucesso!");
      console.log("Resposta do banco temporário:", response.data);

      // Limpa estados após envio
      setSelectedFiles([]);
      setImagesBase64([]);
      setNomeEmpresa("");
      setTelefone("");
      setDataColeta("");
      setTurno("");
      setObservacaoEtapa1("");
      setNomeResiduo("");
      setClasseResiduo("");
      setGrupoResiduo("");
      setQuantidade("");
      setObservacaoFinal("");
      setStep(1);
    } catch (error) {
      alert("Erro ao enviar solicitação.");
      console.error("Erro no envio:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="coleta-form-row">
 
              {/*CAIXA DE AVISO*/}
              <div className="coleta-form-alert">
                  <div className="coleta-alert-box">
                    <p><strong>Alguma dúvida?</strong> Não deixe de checar nossas instruções.</p>
                      <br />
                    <p><strong>Data:</strong> A coleta deve ser agendada com no mínimo 48h de antecedência.</p>
                  </div>
              </div>
 
              <div className="coleta-form-left">
                <h3 className="coleta-etapa-titulo">Etapa 1: Informar Dia e Turno</h3>
 
                {/* NOME DA EMPRESA GERADORA */}
                <div className="coleta-form-group">
                  <label>Geradora/Ponto de Coleta</label>
                  <input type="text" name="nome" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} placeholder="Digite o nome" required />
                  <small>Informe o ponto onde deverá ser realizada a coleta.</small>
                </div>
 
                {/* TELEFONE */}
                <div className="coleta-form-group">
                  <label>Telefone</label>
                  <InputMask mask="(99) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" required >
                    {(inputProps) => <input {...inputProps} type="tel" />}
                  </InputMask>
                  <small>Informe o telefone para contato.</small>
                </div>

                {/* DATA DA COLETA */}
                <div className="coleta-form-group">
                  <label>Data da Coleta</label>
                  <input type="date" name="dataColeta" value={dataColeta} onChange={(e) => setDataColeta(e.target.value)} required />
                  <small>Informe a data desejada para a coleta.</small>
                </div>

                {/* TURNO */}
                <div className="coleta-form-group">
                  <label htmlFor="turno">Turno</label>
                  <select id="turno" name="coleta-select" value={turno} onChange={(e) => setTurno(e.target.value)} >
                    <option value="">Selecione</option> 
                    <option>Manhã</option>
                    <option>Tarde</option>
                  </select>
                  <small>Informe o turno de preferência.</small>
                </div>

                {/* OBSERVAÇÕES */}
                <div className="coleta-form-group">
                  <label htmlFor="observacoes-informacao">Observação</label>
                  <textarea id="observacoes-informacao" name="observacoes" value={observacaoEtapa1} onChange={(e) => setObservacaoEtapa1(e.target.value)} placeholder="Inclua observações que ajudem a empresa responsável pela coleta." rows="10" />
                  <small>Caso seja necessário, informe uma observação.</small>
                </div>
 
              </div>
            </div>
          </>
        );
 
      case 2:
        return (
            <div className="coleta-form-full">
              <h3 className="coleta-etapa-titulo">Etapa 2: Informar Resíduos</h3>
 
            {/* IDENTIFICAÇÃO DO MATERIAL */}
            <div className="coleta-form-group">
              <label>Identificação do Material</label>
              <input type="text" name="nomeResiduo" value={nomeResiduo} onChange={(e) => setNomeResiduo(e.target.value)} placeholder="Digite nome ou descrição do resíduo" />
              <small>Nome ou descrição dos resíduos.</small>
            </div>

            {/* CLASSE */}
            <div className="coleta-form-group">
              <label htmlFor="classe">Classe</label>
              <select id="classe" name="classe" value={classeResiduo} onChange={(e) => setClasseResiduo(e.target.value)} required >
                <option value="">Selecione</option>
                <option value="Classe I">Classe I (Perigosos)</option>
                <option value="Classe II">Classe II (Não Perigosos)</option>
                <option value="Classe IIA">Classe IIA (Não Inertes)</option>
                <option value="Classe IIB">Classe IIB (Inertes)</option>
              </select>
              <small>Classe do resíduo a ser descartado.</small>
            </div>

            {/* GRUPO */}
            <div className="coleta-form-group">
              <label>Grupo</label>
              <select
                name="coleta-select"
                value={grupoResiduo}
                onChange={(e) => setGrupoResiduo(e.target.value)}
              >
                <option>Selecione</option>
                <option>Grupo A (Infectante)</option>
                <option>Grupo B (Químico)</option>
                <option>Grupo C (Radioativo)</option>
                <option>Grupo D (Comum)</option>
                <option>Grupo E (Perfurocortante)</option>
              </select>
              <small>Grupo do resíduo a ser descartado.</small>
            </div>
           
              {/* QUANTIDADE */}
            <div className="coleta-form-group">
              <label>Quantidade</label>
              <input
                type="text"
                name="quantidade"
                maxLength={10}
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Ex: 500kg, 1.2 TON"
                required
              />
              <small>Informe a quantidade estimada para descarte.</small>
            </div>
 
              {/* ANEXO DE FOTOS COM PRÉ-VISUALIZAÇÃO */}
              <div className="coleta-form-group">
                <label htmlFor="file-upload" className="custom-file-upload">Anexar Foto(s) do(s) Resíduo(s)</label>
                <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFileChange} /> {/*handleFileChange será chamada.*/}
 
              <div className="preview-container">
                {selectedFiles.map((file, index) => (
                  <div className="preview" key={index}>
                    <img src={URL.createObjectURL(file)} alt="preview" /> {/*cria url temporaria para foto*/}
                    <button type="button" onClick={() => removeFile(index)}>&times;</button> {/*botao de exclusao*/}
                  </div>
                ))}
              </div>
 
            </div>
          </div>
        );
 
      case 3:
        return (
            <div className="endereco-coleta">
 
              <div className="coleta-form-full">
                <h3 className="coleta-etapa-titulo">Etapa 3: Confirmar Endereço</h3>

                <div className="coleta-form-group">
                  <label>Observação</label>
                  <textarea name="observacoes" value={observacaoFinal} onChange={(e) => 
                  setObservacaoFinal(e.target.value)} 
                  placeholder="Inclua observações que ajudem a empresa responsável pela retirada do resíduo." rows="10" />
                </div>
           
                {/*BOTAO DE ENVIO*/}
                <div className="botao-enviar-pedido">
                  <button className="coleta-btn-enviar" onClick={handleEnviar}>Enviar</button>
                </div>
           
              </div>
 
          </div>
        );
 
      default:
        return null;
    }
  };
 
  return (
    <div className="coleta-container">
 
      <div className="coleta-card">
        <div className="coleta-steps">
          <div className={`coleta-step ${step === 1 ? "active" : ""}`}>Informações</div>
          <div className={`coleta-step ${step === 2 ? "active" : ""}`}>Resíduos</div>
          <div className={`coleta-step ${step === 3 ? "active" : ""}`}>Endereço</div>
        </div>
 
        <div className="coleta-form-section coleta-step-content">
          {renderStepContent()}
        </div>
 
        <div className="coleta-actions">
          {step > 1 && <button className="coleta-btn-voltar" onClick={prevStep}>Voltar</button>}
          {step < 3 && <button className="coleta-btn-avancar" onClick={nextStep}>Avançar</button>}
        </div>
      </div>
    </div>
  );
}
 
export default SolicitarColeta;


{/* RODAR ESTA BAGAÇA: npx json-server --watch db.json --port 3000 */}

{/* http://localhost:3000/solicitacoes */}

{/* npm install json-server */}