import { Link } from 'react-router-dom';
import "./home.css";
import Footer from '../../components/Layout/Footer';
import ecoTitulo from '../../img/ecotitulo.png';
import picgera from "../../img/fabrica-exemplo.jpg";
import picdest from "../../img/centro-exemplo.jpg";
import ColetaForm from "../Coleta/ColetaForm";
import DownloadApp from "../../components/Layout/DownloadApp";
import Conteudos from "../../components/Visual/Conteudos";
import ODSSection from "../../components/Visual/ODSsection";

function Home() {

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
                        <Link to="/Aviso">
                            <button className="botao-saiba-mais">
                                Saiba Mais
                            </button>
                        </Link>
                    </div>
                </section>
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
                                Eles têm a responsabilidade legal de garantir que seus resíduos sejam descartados de forma correta e ambientalmente segura, evitando impactos negativos ao meio ambiente e à saúde pública.
                            </p>
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

             <section className="secao-ods">
                <ODSSection />
            </section>

            <section>
                <Conteudos className="conteudo-descarte"/>
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
