import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import Logo from '../../img/logo-white-eco.png';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  return (
    <header
      className={`with-transition ${
        isHome ? (scrolled ? 'scrolled' : 'transparent') : 'scrolled'
      }`}
    >
      <nav className="nav-container">
        {/* Logo à esquerda */}
        <div className="logo-header">
          <Link to="/">
            <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
          </Link>
        </div>

        {/* Links à direita */}
        <div className="links-header">
          <div className="dropdown">
            <span className="abas dropdown-toggle">Conteúdos</span>
            <ul className="dropdown-menu">
              <li><Link to="/">Manual Geradoras</Link></li>
              <li><Link to="/">Manual Destinadoras</Link></li>
              <li><Link to="/ManualUsuarios">Manual do Usuário</Link></li>
            </ul>
          </div>

          <div className="menu-wrapper">
            <li><Link to="/Login">Área do Cliente</Link></li>
            <li>
              <div className="botao-novo-acesso">
                <Link to="/Registro" className="abas" title="Crie um acesso">Crie uma conta</Link>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
