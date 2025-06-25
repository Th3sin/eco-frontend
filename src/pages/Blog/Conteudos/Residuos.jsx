import React from "react";
import "./residuos.css";
import bannerResiduos from "../../../img/banner-artigo-residuo.jpg";

function Residuos() {
  return (
    <div className="container-blog-residuos">

        <section className="tipos-residuos">
          <img src={bannerResiduos} alt="Banner contendo separadores de resíduos de diferentes classes e grupos" />
          <h1>Resíduos Sólidos</h1>
            <h2>O que são tipos de resíduos?</h2>
            <p>
                Resíduos sólidos são produtos não aproveitados das atividades humanas (domésticas, comerciais, industriais e de serviços de saúde) ou aqueles gerados pela natureza, como folhas, galhos, terra, areia, que são retirados das ruas e logradouros pela operação de varrição e enviados para os locais de destinação ou tratamento. Também podemos definir lixo como: os restos das atividades humanas, considerados pelos geradores como inúteis, indesejáveis ou descartáveis. Normalmente, apresentam-se em estado sólido, semissólido ou semilíquido (com conteúdo líquido insuficiente para que este líquido possa fluir livremente).
            </p>
        </section>

        <section className="tipos-residuos">
        <h2>Como classificar o lixo?</h2>
        <ul>
          <li>por sua natureza física: seco e molhado</li>
          <li>por sua composição química: matéria orgânica e matéria inorgânica</li>
          <li>pelos riscos potenciais ao meio ambiente: perigosos, não-inertes</li>
        </ul>
        <p>
          Os resíduos são definidos segundo sua origem e classificados de acordo com o seu risco em relação ao homem e ao meio ambiente em resíduos urbanos e resíduos especiais.
        </p>
      </section>

      <section className="tipos-residuos">
        <h3>Resíduos urbanos</h3>
        <p>
          Os resíduos urbanos, também conhecidos como lixo doméstico, são aqueles gerados nas residências, no comércio ou em outras atividades desenvolvidas nas cidades. Incluem-se os resíduos dos logradouros públicos, como ruas e praças, denominados lixos de varrição ou público. Nestes resíduos encontram-se: papel, papelão, vidro, latas, plásticos, trapos, folhas, galhos e terra, restos de alimentos, madeira e todos os outros detritos apresentados à coleta nas portas das casas pelos habitantes das cidades ou lançados nas ruas.
        </p>
      </section>

      <section className="tipos-residuos">
        <h3>Resíduos especiais</h3>
        <p>
          Os resíduos especiais são aqueles gerados em indústrias ou serviços de saúde, como hospitais, ambulatórios, farmácias, clínicas que, pelo perigo que representam à saúde pública e ao meio ambiente, exigem maiores cuidados no seu acondicionamento, transporte, tratamento e destino final. Também se incluem nesta categoria os materiais radioativos, alimentos ou medicamentos com data vencida ou deteriorados, resíduos de matadouros, inflamáveis, corrosivos, reativos, tóxicos e dos restos de embalagem de inseticida e herbicida empregados na área rural.
        </p>
      </section>

      <section className="tipos-residuos">
        <h2>Classificação segundo a ABNT NBR 10.004</h2>
        <p>
            De acordo com a norma NBR-10.004 da ABTN (Associação Brasileira de Normas Técnicas), estes resíduos são classificados em:
• Classe I - Perigosos: são os que apresentam riscos ao meio ambiente e exigem tratamento e disposição especiais, ou que apresentam riscos à saúde pública que tenham uma das características: inflamabilidade, corrosividade, reatividade, toxicidade e patogenicidade.
• Classe II – Não perigosos
                       - Resíduos Classe II A - Não inertes: Aqueles que não se enquadram nas classificações de resíduos Classe I – Perigosos ou de resíduos Classe II B – Inertes. Os resíduos Classe II A – Não Inertes, podem ter propriedades, tais como: biodegradabilidade, combustibilidade ou solubilidade em água.
                       - Resíduos Classe II B - Inertes: Quaisquer resíduos que não tiveram nenhum de seus constituintes solubilizados a concentrações superiores aos padrões de potabilidade de água, excetuando-se aspecto, cor, turbidez, dureza e sabor.

Os resíduos compreendidos nas Classes II podem ser incinerados ou dispostos em aterros sanitários, desde que preparados para tal fim e que estejam submetidos aos controles e monitoramentos ambientais. Os resíduos Classe I - Perigosos, somente podem ser dispostos em aterros construídos especialmente para tais resíduos, ou devem ser queimados em incineradores especiais. Nesta classe, inserem-se os resíduos da área rural, basicamente, as embalagens de pesticidas ou de herbicidas e os resíduos gerados em indústrias químicas e farmacêuticas.
Outra classificação dos resíduos pela origem pode ser também apresentada: o lixo domiciliar, comercial, de varrição e feiras livres, serviços de saúde e hospitalares; portos, aeroportos e terminais ferro e rodoviários, industriais, agrícolas e entulhos. A descrição destes tipos é apresentada na sequência e a responsabilidade pelo seu gerenciamento é apresentada na tabela a seguir.
        </p>
      </section>

      <section className="tipos-residuos">
        <h2>Classificação por origem</h2>
        {[
          { title: "Domiciliar", desc: "Resíduos do cotidiano das residências..." },
          { title: "Comercial", desc: "Originado de supermercados, lojas, bares..." },
          { title: "Público", desc: "Limpeza urbana, restos de feiras, podas..." },
          { title: "Serviços de saúde e hospitalar", desc: "Agulhas, seringas, bandagens, órgãos removidos..." },
          { title: "Portos, aeroportos e terminais", desc: "Resíduos com risco biológico de viagens..." },
          { title: "Industrial", desc: "Gerados em indústrias diversas, muitas vezes tóxicos..." },
          { title: "Agrícola", desc: "Resíduos de defensivos, embalagens, restos de colheita..." },
          { title: "Entulho", desc: "Resíduos da construção civil, geralmente inertes..." }
        ].map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="tipos-residuos">
        <h2>Responsabilidade pelo gerenciamento</h2>
        <p>
          A prefeitura é corresponsável por pequenas quantidades de lixo (menos de 50kg ou 100L), conforme legislação municipal (Lei 13.478/02).
        </p>
      </section>

      <section className="tipos-residuos">
        <h2>Transportadores</h2>
        <p>Saiba mais sobre transportadores de resíduos sólidos nos links abaixo:</p>
        <ul>
          <li>Transportadoras de resíduos da construção civil: <a href="#">aqui</a></li>
        </ul>
      </section>

      <section className="tipos-residuos">
        <h2>Legislação – Resíduos sólidos</h2>
        <ul>
          <li><a href="https://www.prefeitura.sp.gov.br">Lei de Limpeza Urbana nº 13.478/2002</a></li>
          <li><a href="https://www.prefeitura.sp.gov.br">Decreto nº 47.839/2006</a></li>
          <li><a href="https://www.mma.gov.br/conama">Conama 307/jun2002</a></li>
          <li><a href="https://www.ambiente.sp.gov.br">Lei Estadual 12.300</a></li>
          <li><a href="https://www.prefeitura.sp.gov.br">Lei 13.298/2002</a></li>
        </ul>
      </section>

      <section className="tipos-residuos">
        <h2>Normas Técnicas da ABNT</h2>
        <ul>
          <li>NBR 15.112 – Áreas de Transbordo e Triagem</li>
          <li>NBR 15.113 – Aterros</li>
          <li>NBR 15.114 – Áreas de Reciclagem</li>
          <li>NBR 15.115 – Pavimentação com reciclados</li>
          <li>NBR 15.116 – Preparo de concreto não estrutural</li>
        </ul>
      </section>

      <section className="tipos-residuos">
        <h2>Instituições e Sindicatos</h2>
        <ul>
          <li><a href="https://www.ablp.org.br">ABLP</a></li>
          <li><a href="https://www.sieresp.org.br">Sieresp</a></li>
          <li><a href="https://www.sinduscon.org.br">Sinduscon</a></li>
          <li><a href="https://www.cetesb.sp.gov.br">Cetesb</a></li>
        </ul>
      </section>
    </div>
  );
}
 export default Residuos;