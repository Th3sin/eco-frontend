// Página com o component <ColetaForm>

import React from 'react';
import ColetaForm from '../../../components/Coleta/ColetaForm';
import './novasolicitacao.css';

const NovaSolicitacao = () => {
  return (
    <div className="nova-solicitacao-container">
      <ColetaForm />
    </div>
  );
};

export default NovaSolicitacao;