import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styles from "./ecomapa.module.css";
import { tipoResiduo, materiais } from '../../data/materiais'; 
import InputMask from 'react-input-mask'; //npm install react-input-mask 

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const formatarCEP = (cep) => {
    const numeros = cep.replace(/\D/g, '').slice(0, 8); 
    return numeros.length > 5 ? numeros.replace(/(\d{5})(\d{1,3})/, '$1-$2') : numeros;
};

function Ecomapa() {
    const [formData, setFormData] = useState({
        cep: "",
        distancia: "3",
        porteMaterial: "3",
        material: "",
        residuo: ""  
    });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFindPoints = () => {
        alert("Busca iniciada!");
    };

    const mapContainerStyle = {
        width: "1000px",
        height: "550px",
    };

    const defaultCenter = {
        lat: -23.5123429,
        lng: -46.889781,
    };

    return (
        <div className={styles.paginaDescarteMaterial}>
            <div className={styles.containerDescarte}>

             {/* Caixa do mapa */}
             <div className={styles.boxMapa}>
               {!isLoaded ? (
                 <div>Carregando Mapa...</div>
               ) : (
                 <GoogleMap 
                   mapContainerStyle={mapContainerStyle} 
                   center={defaultCenter} 
                   zoom={10} 
                 />
               )}
            </div>
        
            {/* Caixa do formulário */}
            <div className={styles.boxFormulario}>
              <p className={styles.textoIntroducao}>
                Utilize o mapa ao lado para localizar destinadoras cadastradas por tipo de resíduo e distância.
              </p>
               
              <div className={styles.grupoInputs}>
                {/* CEP */}
                <label>CEP</label>
                <InputMask mask="99999-999" value={formData.cep} onChange={handleChange}>
                  {(inputProps) => (
                    <input {...inputProps} type="text" name="cep" placeholder="_____-___" required />
                  )}
                </InputMask>
                
                {/* Distância */}
                <div className={styles.materialInputs}>
                  <label htmlFor="distancia" className={styles.label}>Distância</label>
                  <select name="distancia" value={formData.distancia} onChange={handleChange}>
                    {[3, 7, 10, 15, 20, 25, 30].map((dist) => (
                      <option key={dist} value={dist}>{dist} km</option>
                    ))}
                  </select>
                </div>
                  
                {/* Tipo de Resíduo */}
                <div className={styles.materialInputs}>
                  <label htmlFor="residuo" className={styles.label}>Tipo do Resíduo</label>
                  <select name="residuo" value={formData.residuo} onChange={handleChange}>
                    <option value="" disabled>Selecione o tipo do resíduo</option>
                    {tipoResiduo.map((residuo, index) => (
                      <option key={index} value={residuo}>{residuo}</option>
                    ))}
                  </select>
                </div>
                  
                {/* Botão */}
                <button className={styles.botaoEncontrar} onClick={handleFindPoints}>
                  ENCONTRAR PONTOS
                </button>
              </div>
          </div>
              
        </div>
    </div>


    );
}

export default Ecomapa;
