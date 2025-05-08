import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";
import Ecomapa from '../../components/Mapa/Ecomapa';
import Informativo from '../Descarte/Informativo';
import Footer from '../../components/Layout/Footer'
import ecoTitulo from '../../img/ecotitulo.png'
// import picgera from "../../img/factory.jpg";
// import picdest from "../../img/image1.jpg";
import SlideBannerHome from "../../components/Layout/SlideBannerHome";
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
                      <h2>Um passo para regularizar seu descarte</h2>

                      <div className="etapa">
                        <div>
                          <p className="titulo">1. Preencha o Formulário</p>
                          <p>Envie suas informações de contato e não se preocupe, suas informações estarão seguras.</p>
                        </div>
                      </div>

                      <div className="simbolo-seta">
                        <span>↓</span>
                      </div>

                      <div className="etapa">
                            <div>
                                <p className="titulo">2. Receba uma ligação</p>
                                <p>Um dos nossos especialistas irá entrar em contato através de uma ligação com detalhes que realmente importam para você.</p>
                            </div>
                        </div>
                      </div>
                </section>

                <section className="formulario-coleta">
                    <ColetaForm />
                </section>
            </div>

            <section className="navegacao-home" id="navegacao">
                <SlideBannerHome /> {/* Componente */}
            </section>

            <section className="mapa" id="mapa">
                <h3>Encontre pontos de coleta próximos</h3>
                <p>Utilize o mapa abaixo para localizar destinadoras cadastradas por tipo de resíduo e distância.</p>
                <Ecomapa />
            </section>

            <section className="blog" id="blog">
                <h3>Informações e Dicas</h3>
                <p>Confira conteúdos sobre descarte correto, legislação ambiental e práticas sustentáveis.</p>
                <Informativo />
            </section>


{/* <section className="entidades" id="entidades">
                <h3>Trabalhamos com:</h3>
                    <div className="cards-ent-container">

                    <div className="card-entidade">
                      <h4>Geradores</h4>
                      <img src={picgera} alt="Imagem representando geradores" />
                        <p>Geradores são empresas que produzem resíduos e precisam de soluções seguras e legais para o descarte. Com a plataforma, é possível solicitar coletas com poucos cliques e monitorar o andamento em tempo real.</p>
                    </div>

                    <div className="card-entidade">
                      <h4>Destinadores</h4>
                      <img src={picdest} alt="Imagem representando destinadores" />
                        <p>Destinadores são empresas responsáveis pela destinação correta desses resíduos. Elas podem visualizar pedidos de coleta próximos, além de gerenciar rotas e o histórico de coletas de forma eficiente.</p>
                    </div>

                </div>

            </section> */}




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
                <Link to="/ColetaForm"><button>Formulário de Solicitação de Coleta</button></Link>
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