import React, { useState } from "react";
import "./SlideBanner.css";
import ods12 from "../../img/ODS-12-2.png";

const SlideBannerHome = () => {
  const slides = [
    {
      id: 1,
      content: (

        <div className="card">
          <p>
            Compromisso com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU.
          </p>
          <img src={ods12} alt="ODS 12" />
        </div>
      ),
    },
    {
      id: 2,
      content: (

        <div className="links-section">
        <p>O que você encontra aqui?</p>
        <ul>
          <li><strong>Solicitação inteligente de coletas</strong></li>
          <li><strong>Localização de empresas destinadoras especializadas</strong></li>
          <li><strong>Histórico completo de solicitações e status em tempo real</strong></li>
          <li><strong><a href="#blog">Informações sobre gerenciamento de resíduos sólidos</a></strong></li>
          <li><strong><a href="#mapa">Conheça nosso Ecomapa</a></strong></li>
        </ul>
        </div>
      ),
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (

    <div className="slide-carousel">
      <video autoPlay loop muted className="slides-background">
        <source src="/video/sobre.mp4" type="video/mp4" />
          banner
      </video>
      <div className="slide">{slides[index].content}</div>
      <div className="controls">

        <button onClick={prevSlide}>◀</button>
        <button onClick={nextSlide}>▶</button>

      </div>
    </div>
  );
};

export default SlideBannerHome;