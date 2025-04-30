// Página com lista de <ColetaCard

import { Link } from 'react-router-dom';
import React from 'react';
import './historicocostts.css';

const HistoricoSolicitacoes = () => {
  // Mock de dados
  const historico = [
    {
      id: '1312',
      residuo: 'Infectante',
      pontoGeracao: 'Canon Medical',
      dataCriacao: '23/10/2020',
      status: 'Pendente',
    },
    {
      id: '1234',
      residuo: 'Cortante',
      pontoGeracao: 'Monte Veneto',
      dataCriacao: '15/10/2020',
      status: 'Pendente',
    },
    {
      id: '3333',
      residuo: 'Radioativo',
      pontoGeracao: 'Dell electronics',
      dataCriacao: '07/10/2020',
      status: 'Pendente',
    },
    {
      id: '2233',
      residuo: 'Comum',
      pontoGeracao: 'Tralalelo tralala',
      dataCriacao: '07/10/2020',
      status: 'Pendente',
    },
  ];

  return (
    <div className="container-historico">
      <h1>Histórico de Solicitações</h1>
      <table className="historico-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Resíduo</th>
            <th>Empresa Geradora</th>
            <th>Data de Criação</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.residuo}</td>
              <td>{item.pontoGeracao}</td>
              <td>{item.dataCriacao}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/coleta/${item.id}`}>
                  <button className="btn-visualizar">Visualizar</button>
                </Link>
                <button className="btn-cancelar">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricoSolicitacoes;