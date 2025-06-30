import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../Header/CssHeader/headerUser.css';
import Logo from '../../../img/ecotitulo.png';
import picture from '../../../img/jack.jpg';

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
              src={picture}
              alt="Usuário"
              className="foto-usuario"
              onClick={toggleMenu}
              title="Acesso rápido"
            />
            <p className="nome-usuario">{nomeUsuario}</p>

            {menuOpen && (
              <div className="menu-dropdown">
                <ul>
                  <li><Link to="/PedidosRecebidos" onClick={() => setMenuOpen(false)}>Pedidos Recebidos</Link></li>
                  <li><Link to="/PainelColeta" onClick={() => setMenuOpen(false)}>Painel</Link></li>
                  <li><Link to="/HistoricoColetas" onClick={() => setMenuOpen(false)}>Histórico</Link></li>
                  <li><Link to="/ConfigDestinador">Preferências</Link></li>
                  <li><Link to="/Login">Sair</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="logo-header-user">
          <Link to="/HomeDestinador">
            <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default HeaderDestinador;
