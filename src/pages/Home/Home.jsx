import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";
import Footer from '../../components/Layout/Footer'
import ecoTitulo from '../../img/ecotitulo.png'
import picgera from "../../img/fabrica-exemplo.jpg";
import picdest from "../../img/centro-exemplo.jpg";
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
                                <p className="titulo-banner"><span className="emote">🖍</span> Preencha o formulário</p>
                                <p>Envie suas informações de contato com tranquilidade. Seus dados estarão protegidos.</p>
                            </div>
                        </div>

                        <div className="etapa">
                            <div>
                                <p className="titulo-banner"><span className="alerta-emote">🛎</span>Aguarde a notificação</p>
                                <p>Você será avisado assim que uma empresa destinadora aceitar sua solicitação.</p>
                            </div>
                        </div>

                        <div className="etapa">
                            <div>
                                <p className="titulo-banner"><span className="emote">☎</span> Fique atento</p>
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
                <h3 className="titulo-metade-linha-ent">Quem atua no sistema?</h3>
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
                <h3 className="titulo-metade-linha-blog">Informações e Dicas</h3>
                <p>Confira conteúdos sobre descarte correto, legislação ambiental e práticas sustentáveis.</p>

                <div class="card-container">
  
                <div class="card">
                  <h3>Guia de Separação de Resíduos</h3>
                  <p>Aprenda como separar corretamente os resíduos recicláveis, orgânicos e perigosos.</p>
                  <a href="/artigos/guia-separacao">Ler mais →</a>
                </div>

                <div class="card">
                  <h3>Manual para Empresas Geradoras</h3>
                  <p>Entenda suas responsabilidades legais e operacionais no gerenciamento de resíduos.</p>
                  <a href="/manuais/empresas-geradoras">Acessar manual →</a>
                </div>

                <div class="card">
                  <h3>Como Funciona a Logística Reversa</h3>
                  <p>Descubra o papel da logística reversa na sustentabilidade e na economia circular.</p>
                  <a href="/artigos/logistica-reversa">Saiba mais →</a>
                </div>
                </div>

            </section>    


{/* APENAS PARA NAVEGAÇÃO INTERNA ENTRE AS PÁGINAS QUE ESTÃO SENDO DESENVOLVIDAS */}
<section className="navegacao-interna">
            <p>Páginas em desenvolvimento</p>

            <div>
                <Link to="/HistoricoSolicitacoes"><button>Solicitações de Coleta p/ Destinador</button></Link>
                <Link to="/PainelColeta"><button>Painel de Coletas (Coletora)</button></Link>
                <Link to="/Perfil"><button>Escolha Perfil Gerador ou Destinador</button></Link>
                <Link to="/CadastroResiduo"><button>Formulário cadastro Resíduo</button></Link>
                <Link to="/Instrucoes"><button>Manual para Usuário</button></Link>
            </div>

            <div>
                <Link to="/CadastroGerador"><button>Formulário de Cadastro Gerador</button></Link>
                <Link to="/CadastroDestinador"><button>Formulário de Cadastro Destinador</button></Link>
                <Link to="/SolicitarColeta"><button>Formulário de Solicitação de Coleta</button></Link>
                <Link to="/AcompanhamentoColetas"><button>Tela Acompanhamento de Coleta com Mapa</button></Link>
                <Link to="/BuscaMapa"><button>Mapa de busca Destinadoras</button></Link>
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