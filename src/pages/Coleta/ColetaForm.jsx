import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './coletaForm.css';

function ColetaForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nomeResiduo: '',
    dataColeta: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/SolicitarColeta', { state: { formData } });
  };

  return (
    <div className="informacoes-formulario">
      <div className="area-centralizada">
        <section className="formulario-coleta">
          <form onSubmit={handleSubmit}>

            <div className="resumo-coleta-form-group">
              <label>Geradora</label>
              <input type="text" name="nome" placeholder="Digite o nome" required value={formData.nome} onChange={handleInputChange} />
            </div>

            <div className="resumo-coleta-form-group">
              <label>E-mail</label>
              <input type="email" name="email" placeholder="exemplo@dominio.com" required value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="resumo-coleta-form-group">
              <label>Telefone</label>
              <InputMask mask="(99) 99999-9999" name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="(00) 00000-0000" required>
                {(inputProps) => <input {...inputProps} type="tel" />}
              </InputMask>
            </div>

            {/* <div className="resumo-coleta-form-group">
              <label htmlFor="nomeResiduo">Resíduo</label>
              <select name="nomeResiduo" id="nomeResiduo" required onChange={handleInputChange} value={formData.nomeResiduo}>
                <option value="">Selecione um tipo</option>
                {tipoResiduo.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div> */}

            <div className="resumo-coleta-form-group">
              <label>Quando deseja a coleta?</label>
              <input type="date" name="dataColeta" required value={formData.dataColeta} onChange={handleInputChange} />
            </div>

            <div className="resumo-botoes-solicitacao">
              <button type="submit">AGENDAR MINHA COLETA</button>
            </div>

          </form>
        </section>
      </div>
    </div>
  );
}

export default ColetaForm;