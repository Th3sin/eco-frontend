import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../Header/CssHeader/headerUser.css';
import Logo from '../../../img/ecoplus05.png';
import FotoUsuario from '../../../img/foto-usuario02.png';

function HeaderDestinador() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    axios.get('http://localhost:8080/usuarios/representante-logado')
      .then(response => setNomeUsuario(response.data.nome))
      .catch(error => console.error('Erro ao buscar nome do usuário:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className='header-user'>
      <nav>
        <div className="header-left" ref={menuRef}>
          <div className="usuario-wrapper">
            
            <img
              src={Logo}
              alt="Usuário"
              className="foto-usuario"
              onClick={toggleMenu}
              title="Acesso rápido"
            />
            <p className="nome-usuario">Bem-vindo, {nomeUsuario}</p>

            {menuOpen && (
              <div className="menu-dropdown">
                <ul>
                  <li><Link to="/PedidosRecebidos" onClick={() => setMenuOpen(false)}>Pedidos Recebidos</Link></li>
                  <li><Link to="/PainelColeta" onClick={() => setMenuOpen(false)}>Painel de Acompanhamento</Link></li>
                  <li><Link to="/HistoricoSolicitacoes" onClick={() => setMenuOpen(false)}>Histórico</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="logo-header">
          <Link to="/Home">
            <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
          </Link>
        </div>

        <div className="dropdown configuracoes-dropdown">
          <span className="abas dropdown-toggle" title="Configurações">
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 24 24" width="25" fill="white" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94s-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.4,0.12-0.61l-1.92-3.32c-0.12-0.22-0.38-0.3-0.61-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.61-0.94l-0.36-2.54C14.35,2.18,14.18,2,14,2h-4c-0.18,0-0.35,0.18-0.38,0.36L9.26,4.9C8.68,5.14,8.15,5.46,7.65,5.84L5.26,4.88c-0.23-0.09-0.49,0-0.61,0.22L2.73,8.42c-0.12,0.21-0.07,0.47,0.12,0.61l2.03,1.58C4.82,11.37,4.8,11.69,4.8,12s0.02,0.63,0.06,0.94l-2.03,1.58c-0.18,0.14-0.23,0.4-0.12,0.61l1.92,3.32c0.12,0.22,0.38,0.3,0.61,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.61,0.94l0.36,2.54C9.65,21.82,9.82,22,10,22h4c0.18,0,0.35-0.18,0.38-0.36l0.36-2.54c0.58-0.24,1.11-0.56,1.61-0.94l2.39,0.96c0.23,0.09,0.49,0,0.61-0.22l1.92-3.32c0.12-0.21,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.99,0-3.6-1.61-3.6-3.6s1.61-3.6,3.6-3.6s3.6,1.61,3.6,3.6S13.99,15.6,12,15.6z" />
            </svg>
          </span>
          <ul className="dropdown-menu">
            <li><Link to="/ConfigDestinador">Preferências</Link></li>
            <li><Link to="/Login">Sair</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderDestinador;
