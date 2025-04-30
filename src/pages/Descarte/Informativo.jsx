import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './informativo.module.css';
import biologicalSymbol from "../../img/residuoInfectante.png";
import chemicalSymbol from "../../img/residuoQuimico.png";
import radioactiveSymbol from "../../img/residuoRadioativo.png";
import commomSymbol from "../../img/residuoComum.png";
import sharpSymbol from "../../img/residuoPerfurocortante.png";

function Informativo() {
    return (
        <div className={styles.secaoResiduos}>
            
            <div className={styles.containerBotoes}>
                <div className={styles.containerResiduo}>
                    <button>
                        <img src={biologicalSymbol} alt="símbolo risco infectante" />
                        <Link to={"/Infectante"}> <h2>Resíduos Infectantes</h2> </Link>
                    </button>
                </div>
                
                <div className={styles.containerResiduo}>
                    <button>
                        <img src={chemicalSymbol} alt="símbolo risco químico" />
                        <Link to={"/Quimico"}> <h2>Resíduos Químicos</h2> </Link>
                    </button>
                </div>
                
                <div className={styles.containerResiduo}>
                    <button>
                        <img src={radioactiveSymbol} alt="símbolo risco radioativo" />
                        <Link to={"/Radioativo"}> <h2>Resíduos Radioativos</h2> </Link>
                    </button>
                </div>
                
                <div className={styles.containerResiduo}>
                    <button>
                        <img src={commomSymbol} alt="símbolo resíduos comuns" />
                        <Link to={"/Comum"}> <h2>Resíduos Comuns</h2> </Link>
                    </button>
                </div>
                
                <div className={styles.containerResiduo}>
                    <button>
                        <img src={sharpSymbol} alt="símbolo resíduos perfurocortantes" />
                        <Link to={"/Perfurocortante"}> <h2>Resíduos Perfurocortantes</h2> </Link>
                    </button>
                </div>
            </div> 

        </div>
    );
};

export default Informativo;