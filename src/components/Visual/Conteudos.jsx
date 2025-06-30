import React from 'react';
import { Link } from 'react-router-dom';
import imageBlog01 from '../../img/blog-image001.jpg';
import imageBlog02 from '../../img/blog-image002.jpg';
import imageBlog03 from '../../img/blog-image003.jpg';
import imageBlog04 from '../../img/blog-image004.jpg';
import './conteudos.css'

const Conteudos = () => {
  return (
    <section className="blog" id="blog">
      <h3 className="titulo-metade-linha">Informações e Dicas</h3>
      <div className='subtitulo-blog'><p>Confira conteúdos sobre descarte correto, legislação ambiental e práticas sustentáveis.</p></div>
      
      <div className="card-container">
        <div className="card-blog">
          <h4>Guia de Classificação de Resíduos</h4>
          <p>Aprenda como classificar corretamente os resíduos de diferentes classes.</p>
          <img src={imageBlog04} alt="Guia Separação Resíduos" />
          <Link to="/Residuos">Ler mais →</Link>
        </div>

        <div className="card-blog">
          <h4>Manual para Empresas Geradoras</h4>
          <p>Entenda suas responsabilidades legais e operacionais no gerenciamento de resíduos.</p>
          <img src={imageBlog01} alt="Manual Empresas Geradoras" />
          <Link to="/Aviso">Acessar manual →</Link>
        </div>

        <div className="card-blog">
          <h4>Como Funciona a Logística Reversa</h4>
          <p>Descubra o papel da logística reversa na sustentabilidade e na economia circular.</p>
          <img src={imageBlog03} alt="Logística Reversa" />
           <Link to="/Aviso">Saiba mais →</Link>
        </div>

        <div className="card-blog">
          <h4>Coleta de Resíduos Perigosos</h4>
          <p>Normas e procedimentos para o manejo adequado de resíduos perigosos.</p>
          <img src={imageBlog02} alt="Resíduos Perigosos" />
          <Link to="/Aviso">Saiba mais →</Link>
        </div>
      </div>
    </section>
  );
};

export default Conteudos;
