// Componente de detalhes ("ver mais")

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './coletaDetalhes.css';

const ColetaDetalhes = () => {
  const { id } = useParams(); // pega o ID da URL
  const [coleta, setColeta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColeta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/coletas/${id}`);
        setColeta(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchColeta();
  }, [id]);

  if (!coleta) {
    return <p>Carregando detalhes da solicitação...</p>;
  }

  return (
    <div className="container-detalhes">
      <h2>Detalhes da Solicitação</h2>
      <div className="detalhes-card">
        <p><strong>ID:</strong> {coleta.id}</p>
        <p><strong>Resíduo:</strong> {coleta.material || coleta.residuo}</p>
        <p><strong>Empresa Geradora:</strong> {coleta.pontoGeracao}</p>
        <p><strong>Quantidade:</strong> {coleta.quantidade}</p>
        <p><strong>Endereço:</strong> {coleta.endereco}</p>
        <p><strong>Data de Criação:</strong> {coleta.dataCriacao}</p>
        <p><strong>Status:</strong> {coleta.status}</p>
      </div>
      <button onClick={() => navigate(-1)} className="btn-voltar">Voltar</button>
    </div>
  );
};

export default ColetaDetalhes;