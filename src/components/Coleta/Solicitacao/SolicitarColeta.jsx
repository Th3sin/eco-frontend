import React, { useState } from "react";
import "./../styles/solicitarColeta.css";

function SolicitarColeta() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
      {/* 1º ETAPA */}
    switch (step) {
      case 1:
        return (
          <>
            <div className="solicitar-coleta-form-left">

              {/*NOME DA EMPRESA GERADORA*/}
              <div className="form-group">
                <label>Geradora/Ponto de Coleta</label>
                <input type="text" name="nome" placeholder="Digite o nome" required/>
                <small>Informe o ponto onde deverá ser realizada a coleta.</small>
              </div>

              {/*DATA*/}
              <div className="form-group">
                <label>Data da Coleta</label>
                <input type="date" name="dataColeta" required />
                <small>Informe a data desejada para a coleta.</small>
              </div>

              {/*TURNO*/}
              <div className="form-group">
                <label htmlFor="turno">Turno</label>
                <select id="turno">
                  <option>Selecione</option>
                  <option>Manhã</option>
                  <option>Tarde</option>
                </select>
                <small>Informe o turno de preferência.</small>
              </div>

              {/*OBSERVACOES*/}
              <div className='form-group'>
                <label htmlFor="observacoes-informacao">Observação</label>
                <textarea id="observacoes-informacao" name="observacoes" placeholder="Inclua observações que ajudem a empresa responsável pela coleta." 
                rows="10"></textarea>
                <small>Caso seja necessário, informe uma observação.</small>
              </div>
              

            </div>

              {/*AVISO*/}
            <div className="solicitar-coleta-form-right">

              <div className="solicitar-coleta-alert-box">
                <p><strong>Alguma dúvida?</strong> Não deixe de checar nossas intruções.</p>
                <p><strong>Data:</strong> A coleta deve ser agendada com no mínimo 48h de antecedência.</p>
              </div>
              
            </div>
          </>
        );

        {/* 2º ETAPA */}
      case 2:
        return (
          <div className="solicitar-coleta-form-full">
              <h3>Etapa 2: Informar Resíduos</h3>

              <div className="coleta-form-group">
                <label>Identificação do Material</label>
                <input type="text" name="nomeResiduo" placeholder="Digite o nome do resíduo" />
              </div>

              <div className="coleta-form-group">
                <label>Classe</label>
                <select>
                  <option>Selecione</option>
                  <option>CLASSE I (Perigosos)</option>
                  <option>CLASSE II A (Não Inertes)</option>
                  <option>CLASSE II B (Inertes)</option>
                </select>
              </div>

              <div className="coleta-form-group">
                <label>Grupo</label>
                <select>
                  <option>Selecione</option>
                  <option>Grupo A (Infectante)</option>
                  <option>Grupo B (Químico)</option>
                  <option>Grupo C (Radioativo)</option>
                  <option>Grupo D (Comum)</option>
                  <option>Grupo E (Perfurocortante)</option>
                </select>
              </div>
            
              <div className="coleta-form-group">
                <label>Quantidade</label>
                <select name="quantidadeResiduo" placeholder="Quantidade aproximada (KG, TON)">
                  <option>Selecione</option>
                  <option>0 - 100kg</option>
                  <option>101 - 300kg</option>
                  <option>301 - 700kg</option>
                  <option>701 - 1 TON</option>
                  <option>1 TON - ATÉ 2 TON</option>
                  <option>2 TON - ATÉ 5 TON</option>
                  <option>5 TON - ATÉ 7,3 TON</option>
                  <option>7,4 TON - ATÉ 10 TON</option>
                  <option>ACIMA DE 10 TON</option>
                </select>
                <small>Quantidade para descarte.</small>
              </div>

              <div className="form-group">
                <label>Anexar Foto do(s) Resíduo(s)</label>
                <input type="file" name="imagem"
                  accept="image/*" />
              </div>

          </div>
        );

        {/* 3º ETAPA */}
      case 3:
        return (
          <div className="solicitar-coleta-form-full">
            <h3>Etapa 3: Resumo da Solicitação</h3>
            <p>Verifique todos os dados antes de enviar a solicitação.</p>

            <div>
              <label>Observações:</label>
              <textarea name="observacoes" placeholder="Inclua observações que ajudem a empresa responsável pela coleta." rows="10">
              </textarea>
            </div>

            <button className="solicitar-coleta-btn-avancar" onClick={() => alert("Solicitação enviada!")}>Enviar</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="solicitar-coleta-container">
      <h1 className="solicitar-coleta-titulo">Solicitar Coleta</h1>

      <div className="solicitar-coleta-card">
        <div className="solicitar-coleta-steps">
          <div className={`solicitar-coleta-step ${step === 1 ? "active" : ""}`}>Informações</div>
          <div className={`solicitar-coleta-step ${step === 2 ? "active" : ""}`}>Resíduos</div>
          <div className={`solicitar-coleta-step ${step === 3 ? "active" : ""}`}>Resumo</div>
        </div>

        <div className="solicitar-coleta-form-section solicitar-coleta-step-content">
          {renderStepContent()}
        </div>

        <div className="solicitar-coleta-actions">
          {step > 1 && <button onClick={prevStep}>Voltar</button>}
          {step < 3 && <button className="solicitar-coleta-btn-avancar" onClick={nextStep}>Avançar</button>}
        </div>
      </div>
    </div>
  );
}

export default SolicitarColeta;