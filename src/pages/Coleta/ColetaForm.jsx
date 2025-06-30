import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './coletaForm.css';

function ColetaForm() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [residuoSelecionado, setResiduoSelecionado] = useState('');

  const handleSubmit = () => {
    if (!residuoSelecionado || !nome || !email || !telefone) {
      return;
    }

    alert("Para enviar sua solicitação, você precisa acessar a área de clientes.");
    navigate("/Login");
  };

  return (
    <div className="informacoes-formulario">
      <div className="area-centralizada">
        <section className="formulario-coleta">
          <form>
            <div className="resumo-coleta-form-group">
              <label>Gerador(a)</label>
              <input
                type="text"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo ou da empresa"
                required
              />
            </div>

            <div className="resumo-coleta-form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="resumo-coleta-form-group">
              <label>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
              >
                {(inputProps) => <input {...inputProps} type="tel" />}
              </InputMask>
            </div>

            <div className="resumo-coleta-form-group">
              <label htmlFor="nomeResiduo">Resíduo</label>
              <select
                name="nomeResiduo"
                id="nomeResiduo"
                value={residuoSelecionado}
                onChange={(e) => setResiduoSelecionado(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option>Orgânico</option>
                <option>Eletrônico</option>
                <option>Hospitalar</option>
                <option>Entulhos</option>
                <option>Têxteis</option>
                <option>Perfurocortante</option>
                <option>Químico</option>
                <option>Radioativo</option>
                <option>Plástico</option>
                <option>Vidro</option>
                <option>Metais</option>
                <option>Papel</option>
                <option>Agroindustrial</option>
                <option>Inerte</option>
                <option>Tóxico</option>
                <option>Inflamável</option>
                <option>Vegetal</option>
                <option>Pilhas e Baterias</option>
                <option>Medicamentos</option>
                <option>Madeira</option>
                <option>Borracha</option>
                <option>Alumínio</option>
                <option>Isopor</option>
                <option>Óleos</option>
                <option>Resíduos de Construção Civil</option>
                <option>Perigosos</option>
                <option>Recicláveis</option>
              </select>
            </div>

            <div className="resumo-botoes-solicitacao">
              <button type="button" onClick={handleSubmit}>Enviar Pedido</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ColetaForm;
