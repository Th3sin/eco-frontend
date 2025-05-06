import React, { useState, useEffect } from "react";
import "./home.css";
import Ecomapa from '../../components/Mapa/Ecomapa';
import Informativo from '../Descarte/Informativo';
import Footer from '../../components/Layout/Footer'
import picgera from "../../img/factory.jpg";
import picdest from "../../img/image1.jpg";
import SlideBannerHome from "../../components/Layout/SlideBannerHome";

function Home() {

const apresentacao = [
    {
          id: 1,
          content: (
    
            <div className="card-descricao">
              <p>
                Aqui nós conectamos grandes geradores de resíduos às destinadoras corretas promovendo o descarte correto, seguro e sustentável. </p>
                <p>Unimos tecnologia e responsabilidade para facilitar a gestão de resíduos, reduzir impactos ambientais e fortalecer o compromisso com um futuro mais verde e consciente.
              </p>
            </div>
          ),
        },
]

const [mostrarApresentacao, setMostrarApresentacao] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
        setMostrarApresentacao(true);
    }, 2500); // 1.5 segundos após título aparecer

    return () => clearTimeout(timer);
}, []);


    return (
        <div className="container-home">
            <div className="banner-container">
                <video autoPlay loop muted className="background-video">
                    <source src="/video/eco-video.mp4" type="video/mp4" />
                        banner
                </video>

                <section className="banner-informations">
                    <div className="titulo-pagina-home">
                        <h1> Bem-vindo ao {" "}
                            <span style={{ color: '#173a3b' }}>E</span>
                            <span style={{ color: '#2a5152' }}>C</span>
                            <span style={{ color: '#218962' }}>O</span>
                            <span style={{ color: '#51de5a' }}>+</span>
                        </h1>
                        
                    </div>

                    <div className="apresentacao">
                        <h2>Conexão Sustentável</h2>
                        <div className={`apresentacao-slide 
                            ${mostrarApresentacao ? 
                            'slide-in' : ''}`}>
                            {apresentacao[0].content}
                        </div>

                    </div>

                </section>
            </div>

            <SlideBannerHome /> {/* Componente */}

            <section className="entidades" id="entidades">
                <h3>Trabalhamos com:</h3>
                <div className="cards-ent-container">
                    <div className="card-entidade">
                        <h4>Geradores</h4>
                        <div>
                            <img src={picgera} alt="Imagem representando geradores" />
                        </div>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro in obcaecati voluptate tempore esse. Quas, nostrum. Dolorem voluptatibus optio nulla eligendi autem excepturi iste, nostrum adipisci earum est molestiae cum amet iusto, similique aspernatur consequatur obcaecati.
                        </span>
                    </div>

                    <div className="card-entidade">
                        <h4>Destinadores</h4>
                        <img src={picdest} alt="Imagem representando destinadores" />
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro in obcaecati voluptate tempore esse. Quas, nostrum. Dolorem voluptatibus optio nulla eligendi autem excepturi iste, nostrum adipisci earum est molestiae cum amet iusto, similique aspernatur consequatur obcaecati.
                        </span>
                    </div>
                </div>
            </section>

            <section className="mapa" id="mapa">
                <Ecomapa />
            </section>

            <section className="blog" id="blog">
                <Informativo />
            </section>

            <section>
                <Footer />
            </section>

        </div>
    );
}

export default Home;