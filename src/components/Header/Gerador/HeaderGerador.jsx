import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../Header/CssHeader/headerUser.css';
import Logo from '../../../img/ecotitulo.png';
import picture from '../../../img/perfil-usuario-avatar.png';

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
              src={picture}
              alt="Usuário"
              className="foto-usuario"
              onClick={toggleMenu}
              title="Acesso rápido"
            />
            <p className="nome-usuario"></p>
            {menuOpen && (
              <div className="menu-dropdown">
                <ul>
                  <li><Link to="/Ecomapa" onClick={() => setMenuOpen(false)}>Buscar Destinador</Link></li>
                  <li><Link to="/PedidosFeitos" onClick={() => setMenuOpen(false)}>Pedidos</Link></li>
                  <li><Link to="/HistoricoSolicitacoes" onClick={() => setMenuOpen(false)}>Histórico</Link></li>
                  <li><Link to="/ConfigGerador">Editar perfil</Link></li>
                  <li><Link to="/Login">Sair</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="logo-header">
          <Link to="/HomeGerador">
            <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default HeaderGerador;
