import "./footer.css";
import logo from "../../img/ecopluspro.png";
 
function Footer() {
  return (
    <div className="footer">
      <div className="informacoes-site">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Navegação</th>
              <th>Contato</th>
              <th>Siga-nos!</th>
            </tr>
          </thead>
 
          <tbody>
            <tr>
              <td><img src={logo} alt="Eco+" /></td>
              <td><a href="/Home">Home</a></td>
              <td>ecorecicla@gmail.com</td>
              <td><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></td>
            </tr>
            <tr>
              <td></td>
              <td><a href="/quem-somos">Quem Somos</a></td>
              <td>Av. Grupo Bandeirante 138</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td><a href="/servicos">Serviços e Soluções</a></td>
              <td>Jardim Belval, Barueri</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td><a href="/informacoes">Informações</a></td>
              <td>CEP: 06420-150</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
 
      <div className="faixa-copyright">
        <p>Copyright © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
 
export default Footer;