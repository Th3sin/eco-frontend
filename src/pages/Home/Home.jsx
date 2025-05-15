import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";
import Ecomapa from '../../components/Mapa/Ecomapa';
import Informativo from '../Descarte/Informativo';
import Footer from '../../components/Layout/Footer'
import ecoTitulo from '../../img/ecotitulo.png'
import picgera from "../../img/factory.jpg";
import picdest from "../../img/image1.jpg";
// import SlideBannerHome from "../../components/Layout/SlideBannerHome";
import ColetaForm from "../Coleta/Pedidos/ColetaForm";

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
                        <button class="botao-saiba-mais">Saiba Mais</button>
                    </div>
                </section>
            </div>

            <div className="seta-para-baixo" title="Veja mais" onClick={scrollParaBaixo}>
                <video autoPlay loop muted className="seta-video">
                    <source src="/emote/seta-animada.mp4" type="video/mp4" />
                </video> 
            </div>

            {/*  Seção Informativa + Formulário */}
            <div className="informacoes-formulario">
                <section className="informacoes-descarte">
                    <div className="informativo-descarte">
                      <h2 className="titulo-metade-linha">Você está a um passo de regularizar seu descarte</h2>

                      <div className="etapa">
                            <div>
                                <p className="titulo"><span>✓</span> Preencha o formulário</p>
                                <p>Envie suas informações de contato com tranquilidade. Seus dados estarão protegidos.</p>
                            </div>
                        </div>

                        <div className="etapa">
                            <div>
                                <p className="titulo"><span>✓</span> Aguarde a notificação</p>
                                <p>Você será avisado assim que uma empresa destinadora aceitar sua solicitação.</p>
                            </div>
                        </div>

                        <div className="etapa">
                            <div>
                                <p className="titulo"><span>✓</span> Fique atento</p>
                                <p>Um representante da empresa destinadora entrará em contato com você por telefone.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="formulario-coleta">
                    <ColetaForm />
                </section>
            </div>

            <section className="entidades" id="entidades">
                <h3 className="titulo-metade-linha-ent">Quem são os atuantes no sistema?</h3>
                <div className="cards-ent-container">

                    {/* Geradores */}
                    <div className="card-entidade linha">
                        <img src={picgera} alt="Imagem representando geradores" className="imagem" />
                        <div className="texto">
                          <h4 className="titulo-gerador">Geradores</h4>
                          <p className="texto-gerador">
                            Geradores são empresas e organizações que produzem resíduos como resultado de suas atividades diárias, incluindo comércios, indústrias, hospitais, instituições públicas e privadas. 
                            Eles têm a responsabilidade legal de garantir que seus resíduos sejam descartados de forma correta e ambientalmente segura, evitando impactos negativos ao meio ambiente e à saúde pública.
                            <br /><br />
                            Com a plataforma, essas empresas podem solicitar coletas de resíduos de maneira rápida e simples, acompanhar o status das solicitações em tempo real e comprovar que seus resíduos obtiveram destinação adequada.
                            Isso facilita a conformidade com as normas ambientais e auxilia na gestão interna de resíduos, promovendo práticas sustentáveis e reduzindo riscos operacionais.</p>
                        </div>
                    </div>

                    {/* Destinadores */}
                    <div className="card-entidade linha">
                      <div className="texto">
                        <h4 className="titulo-destinador">Destinadores</h4>
                        <p className="texto-destinador">
                          Destinadores são empresas especializadas no transporte, tratamento e destinação final de resíduos sólidos, atuando conforme as legislações ambientais vigentes. 
                            Essas empresas desempenham um papel essencial na cadeia de gerenciamento de resíduos, assegurando que materiais potencialmente poluentes ou perigosos sejam tratados de forma segura e ambientalmente adequada.
                            <br /><br />
                            Por meio da plataforma, destinadoras têm acesso a solicitações de coleta próximas, podendo otimizar rotas, reduzir custos operacionais e acompanhar todo o histórico de coletas com praticidade.
                            Além disso, muitas dessas empresas também são responsáveis por emitir certificados de destinação final (CDF), que comprovam a regularidade do processo perante órgãos ambientais.
                        </p>
                    </div>
                      <img src={picdest} alt="Imagem representando destinadores" className="imagem" />
                    </div>

                    </div>
            </section>

            {/* <section className="navegacao-home" id="navegacao">
                <SlideBannerHome /> {/* Componente 
            </section> */}

            <section className="mapa" id="mapa">
                <h3 className="titulo-metade-linha-mapa">Encontre Destinadoras próximas</h3>
                <Ecomapa />
            </section>

            <section className="blog" id="blog">
                <h3 className="titulo-metade-linha-blog">Informações e Dicas</h3>
                <p>Confira conteúdos sobre descarte correto, legislação ambiental e práticas sustentáveis.</p>
                <Informativo />
            </section>


{/* APENAS PARA NAVEGAÇÃO INTERNA ENTRE AS PÁGINAS QUE ESTÃO SENDO DESENVOLVIDAS */}
<section className="navegacao-interna">
            <p><b>Páginas em desenvolvimento</b></p>

            <div>
                <Link to="/HistoricoSolicitacoes"><button>Solicitações de Coleta p/ Destinador</button></Link>
                <Link to="#"><button>Coletas Agendadas</button></Link>
                <Link to="#"><button>Histórico de Solicitações p/ Gerador</button></Link>
                <Link to="#"><button>Tela de Detalhes das Coletas (ver mais)</button></Link>
                <Link to="/Perfil"><button>Escolha Perfil Gerador ou Destinador</button></Link>
            </div>

            <div>
                <Link to="/CadastroGerador"><button>Formulário de Cadastro Gerador</button></Link>
                <Link to="/CadastroDestinador"><button>Formulário de Cadastro Destinador</button></Link>
                <Link to="/SolicitarColeta"><button>Formulário de Solicitação de Coleta</button></Link>
                <Link to="#"><button>Tela Acompanhamento de Coleta com Mapa</button></Link>
                <Link to="#"><button>Página com Informações Sobre Coletas e Resíduos</button></Link>
            </div>
        </section>
        {/*_______________________________________________________________________________*/}



            <section className="rodape">
                <Footer />
            </section>
        </div>
    );
}

export default Home;