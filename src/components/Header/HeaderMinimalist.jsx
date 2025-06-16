import React from 'react';
import { Link } from 'react-router-dom';
import './minimalistHeader.css';
import MinimalLogo from '../../img/eco-black-version02.png';

function HeaderMinimalist() {
  return (
    <header className="minimal-header">
      <div className="minimal-logo-header">
        <Link to="/">
          <img src={MinimalLogo} alt="Logo Ecoplus" title="Bem-vindo" />
        </Link>
      </div>
    </header>
  );
}

export default HeaderMinimalist;
