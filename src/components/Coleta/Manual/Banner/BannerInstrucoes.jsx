import React from "react";
import "./bannerInstrucoes.css";
//import bannerImage from "./banner.jpg";

const BannerInstrucoes = () => {
  return (
    <div className="banner-topo">
      <h1 className="banner-titulo">Instruções de Uso do Sistema de Coleta de Resíduos</h1>
      <div className="banner-card">
        <div className="card-conteudo">
          <h2>O que você encontra aqui?</h2>
          <ul>
            <li>O que é o sistema?</li>
            <li>Quem pode utilizar?</li>
            <li>Glossário do Sistema</li>
            <li>Quais são os serviços?</li>
            <li>Como funciona?</li>
            <li>Manual para Geradores</li>
            <li>Manual para Destinadores</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BannerInstrucoes;