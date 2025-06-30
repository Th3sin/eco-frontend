import React from 'react';
import { Link } from 'react-router-dom';
import './minimalistHeader.css';
import MinimalLogo from '../../../img/eco-titulo-verde-escuro.png';

function HeaderMinimalist() {
  return (
    <header className="minimal-header">
      <div className="minimal-logo-header">
          <img src={MinimalLogo} alt="Logo Ecoplus" title="Bem-vindo" />
      </div>
    </header>
  );
}

export default HeaderMinimalist;
