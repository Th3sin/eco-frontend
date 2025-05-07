import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./home.css";
import Ecomapa from '../../components/Mapa/Ecomapa';
import Informativo from '../Descarte/Informativo';
import Footer from '../../components/Layout/Footer'
import ecoTitulo from '../../img/ecotitulo.png'
import picgera from "../../img/factory.jpg";
import picdest from "../../img/image1.jpg";
import SlideBannerHome from "../../components/Layout/SlideBannerHome";

function Home() {

    return (
        <div className="container-home">
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

        {/* APENAS PARA NAVEGAÇÃO INTERNA ENTRE AS PÁGINAS QUE ESTÃO SENDO DESENVOLVIDAS */}
        <section className="navegacao-interna">
            <p><b>Páginas em desenvolvimento</b></p>

            <div>
                <Link to="/HistoricoSolicitacoes"><button>Solicitações de Coleta p/ Destinador</button></Link>
                <Link to="/coletas-agendadas"><button>Coletas Agendadas</button></Link>
                <Link to="/historico"><button>Histórico de Solicitações p/ Gerador</button></Link>
                <Link to="/solicitacoes/1"><button>Tela de Detalhes das Coletas (ver mais)</button></Link>
                <Link to="/Perfil"><button>Escolha Perfil Gerador ou Destinador</button></Link>
            </div>

            <div>
                <Link to="/cadastro/gerador"><button>Formulário de Cadastro Gerador</button></Link>
                <Link to="/cadastro/destinador"><button>Formulário de Cadastro Destinador</button></Link>
                <Link to="/ColetaForm"><button>Formulário de Solicitação de Coleta</button></Link>
                <Link to="#"><button>Tela Acompanhamento de Coleta com Mapa</button></Link>
                <Link to="/informacoes"><button>Página com Informações Sobre Coletas e Resíduos</button></Link>
            </div>
        </section>
        {/*_______________________________________________________________________________*/}


            <section className="sobre" id="sobre">
                <SlideBannerHome /> {/* Componente */}
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

            <section>
                <Footer />
            </section>

        </div>
    );
}

export default Home;