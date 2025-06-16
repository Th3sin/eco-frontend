import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";
import Footer from '../../components/Layout/Footer'
import ecoTitulo from '../../img/ecotitulo.png'
import picgera from "../../img/fabrica-exemplo.jpg";
import picdest from "../../img/centro-exemplo.jpg";
import ColetaForm from "../Coleta/Pedidos/ColetaForm";
import DownloadApp from "../../components/Layout/DownloadApp";
import imageBlog01 from "../../img/blog-image001.jpg";
import imageBlog02 from "../../img/blog-image002.jpg";
import imageBlog03 from "../../img/blog-image003.jpg";
import imageBlog04 from "../../img/blog-image004.jpg"

function Home() {

    //funcao para rolar a pagina suavemente para baixo
    const scrollParaBaixo = () => {
        window.scrollBy ({
          top: 600, 
          left: 0,
          behavior: 'smooth' });
      };
      
    return (
        <div className="container-home">

            {/* Banner Principal da Página */}
            <div className="banner-container">
                <video autoPlay loop muted className="background-video">
                    <source src="/video/eco-video.mp4" type="video/mp4" />
                        banner
                </video>
                <section className="banner-informations">
                    <div className="titulo-pagina-home">
                        <h1>
                        Somos o Grupo <img src={ecoTitulo} alt="Eco+" className="titulo-img" />
                        </h1>
                    </div>
                    <div>
                        <h2>Conectando Negócios à Sustentabilidade</h2>
                            <p> Nossa plataforma conecta empresas geradoras de resíduos a destinadoras especializadas, promovendo práticas sustentáveis que geram impacto positivo para o meio ambiente e para os negócios. </p>
                    </div>
                    <div>
                        <Link to="/Sobre"><button class="botao-saiba-mais">
                            Saiba Mais</button></Link>
                    </div>
                </section>
            </div>

            <div className="seta-para-baixo" title="Veja mais" onClick={scrollParaBaixo}>
                <video autoPlay loop muted className="seta-video">
                    <source src="/emote/seta-animada.mp4" type="video/mp4" />
                </video> 
            </div>

            <section className="secao-formulario">
                <ColetaForm />
            </section>

            <section className="entidades" id="entidades">
                <h3 className="titulo-metade-linha">Envolvidos na Logística Reversa</h3>
                <div className="cards-ent-container">

                    {/* Geradores */}
                    <div className="card-entidade linha">
                        <img src={picgera} alt="Imagem representando geradores" className="imagem" />
                        <div className="texto">
                          <h4 className="titulo-entidade">Geradores</h4>
                          <p className="texto-gerador">
                            Geradores são empresas e organizações que produzem resíduos como resultado de suas atividades diárias, incluindo comércios, indústrias, hospitais, instituições públicas e privadas. 
                            Eles têm a responsabilidade legal de garantir que seus resíduos sejam descartados de forma correta e ambientalmente segura, evitando impactos negativos ao meio ambiente e à saúde pública.</p>
                        </div>
                    </div>

                    {/* Destinadores */}
                    <div className="card-entidade linha">
                        <img src={picdest} alt="Imagem representando destinadores" className="imagem" />
                    
                      <div className="texto">
                        <h4 className="titulo-entidade">Destinadores</h4>
                        <p className="texto-destinador">
                          Destinadores são empresas especializadas no transporte, tratamento e destinação final de resíduos sólidos, atuando conforme as legislações ambientais vigentes. 
                            Essas empresas desempenham um papel essencial na cadeia de gerenciamento de resíduos, assegurando que materiais potencialmente poluentes ou perigosos sejam tratados de forma segura e ambientalmente adequada.
                        </p>
                    </div>
                </div>
                </div>
            </section>
            
            {/*BLOG*/}
            <section className="blog" id="blog">
                <h3 className="titulo-metade-linha">Informações e Dicas</h3>
                <p>Confira conteúdos sobre descarte correto, legislação ambiental e práticas sustentáveis.</p>

                <div class="card-container">
  
                <div class="card">
                  <h3>Guia de Separação de Resíduos</h3>
                  <p>Aprenda como separar corretamente os resíduos recicláveis, orgânicos e perigosos.</p>
                  <img src={imageBlog04} alt="AAAAAA"/>
                  <Link to="/Residuos">Ler mais →</Link>
                </div>

                <div class="card">
                  <h3>Manual para Empresas Geradoras</h3>
                  <p>Entenda suas responsabilidades legais e operacionais no gerenciamento de resíduos.</p>
                  <img src={imageBlog01} alt="AAAAAA"/>
                  <a href="/manuais/empresas-geradoras">Acessar manual →</a>
                </div>

                <div class="card">
                  <h3>Como Funciona a Logística Reversa</h3>
                  <p>Descubra o papel da logística reversa na sustentabilidade e na economia circular.</p>
                  <img src={imageBlog03} alt="AAAAAA"/>
                  <a href="/artigos/logistica-reversa">Saiba mais →</a>
                </div>

                <div class="card">
                  <h3>Coleta de Resíduos Perigosos</h3>
                  <p>Normas e procedimentos para o manejo adequado de resíduos perigosos.</p>
                  <img src={imageBlog02} alt="AAAAAA"/>
                  <a href="/manuais/empresas-geradoras">Saiba Mais →</a>
                </div>

            </div>

            </section>    

             <section className="app-download">
                <DownloadApp />
            </section>

            <section className="rodape">
                <Footer />
            </section>
        </div>
    );
}

export default Home;