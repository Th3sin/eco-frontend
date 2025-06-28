import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../Header/CssHeader/headerUser.css';
import Logo from '../../../img/ecoplus05.png';
import FotoUsuario from '../../../img/foto-usuario01.png';

function HeaderGerador() {
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

  // useEffect(() => {
  //   axios.get('http://localhost:8080/usuarios/representante-logado')
  //     .then(response => setNomeUsuario(response.data.nome))
  //     .catch(error => console.error('Erro ao buscar nome do usuário:', error));
  // }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="header-user">
      <nav>
        <div className="header-left">
          <div className="usuario-wrapper" ref={menuRef}>
            <img
              src={Logo}
              alt="Usuário"
              className="foto-usuario"
              onClick={toggleMenu}
              title="Acesso rápido"
            />
            <p className="nome-usuario">Bem-vindo, </p>
            {menuOpen && (
              <div className="menu-dropdown">
                <ul>
                  <li><Link to="/Ecomapa" onClick={() => setMenuOpen(false)}>Buscar Destinador</Link></li>
                  <li><Link to="/PedidosFeitos" onClick={() => setMenuOpen(false)}>Pedidos</Link></li>
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
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 24 24" width="25" fill="white" className="icone-config">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.08 7.08 0 00-1.73-1L14.5 2.5a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5l-.38 2.52c-.63.27-1.21.62-1.73 1l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.05.32-.08.66-.08 1s.03.68.08 1l-2.11 1.65a.5.5 0 00-.12.64l2 3.46c.14.24.45.3.68.18l2.49-1c.52.39 1.1.73 1.73 1l.38 2.52c.05.28.28.5.56.5h4c.28 0 .51-.22.56-.5l.38-2.52c.63-.27 1.21-.62 1.73-1l2.49 1c.23.1.54.04.68-.18l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </svg>

          </span>
          <ul className="dropdown-menu">
            <li><Link to="/ConfigGerador">Preferências</Link></li>
            <li><Link to="/Login">Sair</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderGerador;
