import "./footer.css";
import logo from "../../img/ecopluspro.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="informacoes-site">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="Eco+" />
          </div>

          <nav className="footer-nav" aria-label="Navegação do site">
            <h3>Navegação</h3>
            <ul>
              <li><a href="/Home">Home</a></li>
              <li><a href="/quem-somos">Quem Somos</a></li>
              <li><a href="/servicos">Serviços e Soluções</a></li>
              <li><a href="/informacoes">Informações</a></li>
            </ul>
          </nav>

          <section className="footer-contact" aria-label="Informações de contato">
            <h3>Contato</h3>
            <address>
              <p>Email: <a href="mailto:ecorecicla@gmail.com">ecorecicla@gmail.com</a></p>
              <p>Av. Grupo Bandeirante, 138</p>
              <p>Jardim Belval, Barueri - CEP: 06420-150</p>
            </address>
          </section>

          <section className="footer-social" aria-label="Redes sociais">
            <h3>Siga-nos!</h3>
            <ul>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  📸 Instagram
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="faixa-copyright">
        <p>© {new Date().getFullYear()} Eco+. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;