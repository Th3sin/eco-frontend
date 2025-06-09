import React from "react";
import "./downloadApp.css";
import googlePlay from "../../img/disponivel-google-play-badge-1.png"
import appPreview from "../../img/AppApresentacao.png";

const DownloadAppSection = () => {
  return (
    <section className="download-section">
      <div className="download-text">
        <h2>Baixe o App</h2>
            <p>
              Com o aplicativo <strong>eco+</strong>, geradores e coletores têm acesso rápido e prático aos <strong>detalhes das solicitações de coleta</strong> diretamente no celular.
            </p>
        <div className="store-buttons">
          <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
            <img src={googlePlay} alt="Google Play" />
          </a>
        </div>
      </div>
      <div className="download-image">
        <img src={appPreview} alt="Prévia do App" />
      </div>
    </section>
  );
};

export default DownloadAppSection;
