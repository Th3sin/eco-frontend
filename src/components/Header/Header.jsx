import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import Logo from '../../img/ecoplus05.png';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/Home';

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.banner');
      const bannerHeight = banner ? banner.offsetHeight : 300;
      setScrolled(window.scrollY > bannerHeight);
    };

    if (isHome) {
      const timeout = setTimeout(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
      }, 100);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setScrolled(true);
    }
  }, [isHome]);

  // Fecha o menu ao clicar fora
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${isHome ? 'with-transition transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <nav>
        {/* Menu lateral com clique */}
        <div className="menu-wrapper" ref={menuRef} style={{ position: 'relative' }}>
          <button
            className="menu-icon"
            aria-label="Menu de usuário"
            onClick={toggleMenu}
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <ul>
                <li><Link to="/PedidosRecebidos" onClick={() => setMenuOpen(false)}>Pedidos</Link></li>
                <li><Link to="/HistoricoSolicitacoes" onClick={() => setMenuOpen(false)}>Histórico</Link></li>
                <li><Link to="/PainelColeta" onClick={() => setMenuOpen(false)}>Painel de Acompanhamento</Link></li>
                <li><Link to="/Configuracoes" onClick={() => setMenuOpen(false)}>Configurações</Link></li>
                <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Sair</Link></li>
              </ul>
            </div>
          )}
        </div>

        {/* Logo central */}
        <div className="logo-header">
          <Link to="/Home">
            <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
          </Link>
        </div>

        <div className="links-header">
          <div className="dropdown">
            <span className="abas dropdown-toggle">Serviços</span>
            <ul className="dropdown-menu">
              <li><Link to="/Ecomapa">Buscar Destinadoras</Link></li>
              <li><Link to="/SolicitarColeta">Solicitar Coleta</Link></li>
            </ul>
          </div>

          <div className="dropdown">
            <span className="abas dropdown-toggle">Informações</span>
            <ul className="dropdown-menu">
              <li><Link to="/">Manual Geradoras</Link></li>
              <li><Link to="/">Manual Destinadoras</Link></li>
              <li><Link to="/ManualUsuarios">Manual do Usuário</Link></li>
            </ul>
          </div>

          <Link to="/" className="abas" title="Acesse sua conta">Entre</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;