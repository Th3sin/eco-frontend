import React from "react";
import odsImage from  '../../img/banner-ods-onu.png';
import './ODSSection.css';

const ODSSection = () => {
  return (
    <section className="eco-ods-section" id="ods">
      <h2 className="eco-ods-title">
        Compromisso com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU
      </h2>

      <div className="eco-ods-image-wrapper">
        <img src={odsImage} alt="Ícones dos Objetivos de Desenvolvimento Sustentável da ONU" />
      </div>

      <ul className="eco-ods-list">
        <li>
          <strong>ODS 8 – Trabalho Decente e Crescimento Econômico:</strong><br />
          O Eco+ promove oportunidades para pequenas empresas de coleta e destinação de resíduos, contribuindo para a geração de renda, valorização da mão de obra e crescimento de setores ligados à sustentabilidade.
        </li>
        <li>
          <strong>ODS 9 – Indústria, Inovação e Infraestrutura:</strong><br />
          Nossa plataforma digitaliza e moderniza o processo de gestão de resíduos, conectando empresas geradoras a destinadoras de forma automatizada, com uso de tecnologia e dados para otimizar a logística e o tratamento adequado dos resíduos.
        </li>
        <li>
          <strong>ODS 11 – Cidades e Comunidades Sustentáveis:</strong><br />
          Ao melhorar o descarte e a destinação de resíduos, contribuímos para ambientes urbanos mais limpos, saudáveis e resilientes, promovendo uma gestão sustentável dos resíduos sólidos em centros urbanos.
        </li>
        <li>
          <strong>ODS 12 – Consumo e Produção Responsáveis:</strong><br />
          Facilitamos a rastreabilidade e conscientização no ciclo de vida dos resíduos, incentivando práticas responsáveis de descarte, reaproveitamento e redução de resíduos nas empresas.
        </li>
        <li>
          <strong>ODS 13 – Ação Contra a Mudança Global do Clima:</strong><br />
          Reduzimos emissões de carbono indiretamente ao otimizar rotas de coleta e fomentar a reciclagem, evitando o envio de resíduos a aterros sanitários e contribuindo com a mitigação das mudanças climáticas.
        </li>
      </ul>
    </section>
  );
};

export default ODSSection;
