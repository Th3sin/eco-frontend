import React, { useState } from "react";
import "./solicitarColeta.css";
import Endereco from "../../Formularios/Endereco";
import InputMask from 'react-input-mask'; // < importante para formatacao do campo de telefone
// npm install react-input-mask

 
function SolicitarColeta() {
  const [step, setStep] = useState(1);  //cria um estado chamado step com valor inicial 1, e uma função setStep para atualizá-lo.
                                        //controla em qual etapa do formulário o usuário está (etapa 1, 2 ou 3)
 
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3)); //prev é o valor atual do step, e prev + 1 tenta ir para a próxima etapa.                                                           //Math.min garante que não passe do passo 3 (limite máximo).
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1)); //volta para etapa anterior
                                                                   //Math.max(..., 1) garante que não volte além da etapa 1 (limite mínimo)
 
  const [selectedFiles, setSelectedFiles] = useState([]); //cria um estado chamado selectedFiles, que começa como uma lista vazi                                                    //Armazena os arquivos (fotos) que o usuário selecionou para anexar no formulário.
 
  const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  setSelectedFiles((prevFiles) => [...prevFiles, ...files]); //transforma isso em um array comum, contém os arquivos selecionados e salva esses arquivos no estado, respectivamente.
};
 
  const removeFile = (index) => { // remove um arquivo específico da lista selectedFiles com base no índice
  const newFiles = selectedFiles.filter((_, i) => i !== index); //cria uma nova lista excluindo o arquivo que foi clicado para remoção
  setSelectedFiles(newFiles);
};
 
//Funcao simples apenas para mandar alerta antes de enviar o formulário preenchido.
const handleEnviar = () => {
  const confirmar = window.confirm("Verifique todos os campos antes de enviar. Deseja continuar?");
  if (confirmar) {
    alert("Solicitação enviada!");
  }
};
 
// Essa FUNÇÃO exibe o conteúdo da etapa atual do formulário. Usa um switch com base no valor de step. Retorna um trecho JSX diferente com os campos da respectiva etapa (1, 2, 3)
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
 
                {/*NOME DA EMPRESA GERADORA*/}
                <div className="coleta-form-group">
                  <label>Geradora/Ponto de Coleta</label>
                  <input type="text" name="nome" placeholder="Digite o nome" required/>
                  <small>Informe o ponto onde deverá ser realizada a coleta.</small>
                </div>
 
                <div className="coleta-form-group">
                  <label>Telefone</label>
                  <InputMask mask="(99) 99999-9999" name="telefone"  
                  placeholder="(00)  00000-0000" required >
                  {(inputProps) => <input {...inputProps} type="tel" />}
                  </InputMask>
                  <small>Informe o telefone para contato.</small>
                </div>
 
                {/*DATA*/}
                <div className="coleta-form-group">
                  <label>Data da Coleta</label>
                  <input type="date" name="dataColeta" required />
                  <small>Informe a data desejada para a coleta.</small>
                </div>
 
                {/*TURNO*/}
                <div className="coleta-form-group">
                  <label htmlFor="turno">Turno</label>
                  <select name="coleta-select" id="turno">
                    <option>Selecione</option>
                    <option>Manhã</option>
                    <option>Tarde</option>
                  </select>
                  <small>Informe o turno de preferência.</small>
                </div>
 
                {/*OBSERVACOES*/}
                <div className='coleta-form-group'>
                  <label htmlFor="observacoes-informacao">Observação</label>
                  <textarea id="observacoes-informacao" name="observacoes" placeholder="Inclua observações que ajudem a empresa responsável pela coleta."
                  rows="10"></textarea>
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
 
              {/*NOME/DESCRICAO DO MATERIAL*/}
              <div className="coleta-form-group">
                <label>Identificação do Material</label>
                <input type="text" name="nomeResiduo" placeholder="Digite nome ou descrição do resíduo" />
                <small>Nome ou descrição dos resíduos.</small>
              </div>
 
              {/* SELEÇÃO CLASSE DO MATERIAL */}
              <div className="coleta-form-group">
                <label htmlFor="classe">Classe</label>
                <select id="classe" name="classe" required>
                  <option value="">Selecione</option>
                  <option value="Classe I">Classe I (Perigosos)</option>
                  <option value="Classe II">Classe II (Não Perigosos)</option>
                  <option value="Classe IIA">Classe IIA (Não Inertes)</option>
                  <option value="Classe IIB">Classe IIB (Inertes)</option>
                </select>
                <small>Classe do resíduo a ser descartado.</small>
              </div>
 
              {/*GRUPO DO MATERIAL*/}
              <div className="coleta-form-group">
                <label>Grupo</label>
                <select name="coleta-select">
                  <option>Selecione</option>
                  <option>Grupo A (Infectante)</option>
                  <option>Grupo B (Químico)</option>
                  <option>Grupo C (Radioativo)</option>
                  <option>Grupo D (Comum)</option>
                  <option>Grupo E (Perfurocortante)</option>
                </select>
                <small>Grupo do resíduo a ser descartado.</small>
              </div>
           
              {/*VALOR EM KG, TON*/}
              <div className="coleta-form-group">
                <label>Quantidade</label>
                <input type="text" name="quantidade" maxLength={10} placeholder="Ex: 500kg, 1.2 TON" required />
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
                <h3 className="coleta-etapa-titulo">Etapa 3: Informar Endereço</h3>
 
                <Endereco />
                <div className="coleta-form-group">
                  <label>Observação</label>
                  <textarea name="observacoes" placeholder="Inclua observações que ajudem a empresa responsável pela retirada do resíduo." rows="10">
                  </textarea>
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
      <h1 className="coleta-titulo">Solicitar Coleta</h1>
 
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
