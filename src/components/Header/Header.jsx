import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import Logo from '../../img/ecoplus05.png';
import UserPic from '../../img/image1.jpg';

function Header() {

  const [scrolled, setScrolled] = useState(false); // O useState é um HOOK usado para adicionar estado ao componente

  const location = useLocation(); // O useLocation é um HOOK fornecido pelo React Router que permite acessar a localização da URL atual

  const isHome = location.pathname === '/Home'; // Esta variável será true se a URL for a página "/Home"

  useEffect(() => {

    //função apra rolagem da página com base na altura do banner
    const handleScroll = () => {
      
      const banner = document.querySelector('.banner');
      const bannerHeight = banner ? banner.offsetHeight : 300; //altura para surgimento do background-collor

      if (window.scrollY > bannerHeight) {

        setScrolled(true);

      } else {

        setScrolled(false); 
      }

  };

    if (isHome) {

      // timeout para garantir que o DOM já carregou
      const timeout = setTimeout(() => {

        handleScroll(); 
        window.addEventListener('scroll', handleScroll);
      }, 100);

      return () => {

        clearTimeout(timeout);
        window.removeEventListener('scroll', handleScroll);

      };

    } else {

      setScrolled(true); // força o header a ter cor em outras páginas
    }
  }, 
  
  [isHome]);

  return (

    <header className={`${isHome ? 'with-transition transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <nav>
          <div className='user-profile-picture'>
            <img
              src={UserPic} alt='Foto de perfil do usuário' title='Clique para acessar as funcionalidades do seu perfil' />
          </div>

          <div className="logo-header">
            <Link to="/Home">
              <img src={Logo} alt="Logo Ecoplus" title="Bem-vindo" />
            </Link>
          </div>

          <div className='user-name'>
            <p>EMPRESA B</p>
          </div>

          <div className="links-header">

            <Link to="/" className="abas" title="Acesse sua conta" >Entre</Link>
            <Link to="/SolicitarColeta" title="Serviços e Soluções" className="abas">Serviços</Link>
            <Link to="/Instrucoes" className="abas">Instruções</Link>
            <Link to="/" className="abas">Blog</Link>

          </div>
      </nav>
    </header>
  );
}

export default Header;