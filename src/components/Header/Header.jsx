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
    <header
      className={`with-transition ${
        isHome ? (scrolled ? 'scrolled' : 'transparent') : 'scrolled'
      }`}
    >
      <nav>
        {/* Menu lateral com clique */}
        <div>
          <Link to="/Registro" className="abas" title="Crie um acesso">
            Crie uma conta
          </Link>
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
              <li>
                <Link to="/Ecomapa">Buscar Destinadoras</Link>
              </li>
              <li>
                <Link to="/FormularioColeta">Solicitar Coleta</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <span className="abas dropdown-toggle">Informações</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/">Manual Geradoras</Link>
              </li>
              <li>
                <Link to="/">Manual Destinadoras</Link>
              </li>
              <li>
                <Link to="/ManualUsuarios">Manual do Usuário</Link>
              </li>
            </ul>
          </div>

          <div className="menu-wrapper">
            <li>
              <Link to="/Login">Área do Cliente</Link>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
