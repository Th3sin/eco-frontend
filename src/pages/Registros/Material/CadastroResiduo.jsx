import React, { useState } from 'react';
import '../Css/cadastro.css';

function CadastroResiduo() {
    const [material, setMaterial] = useState({
        nomeResíduo: '',
        descricao: '',
        categoriaResíduo: '',
        classeResíduo: '',
        grupoResíduo: '',
    });

    const categorias = ['infectante', 'químico', 'radioativo', 'comum', 'perfurocortante', 'entulho', 'eletrônico'];
    const classes = ['perigosos', 'não perigosos'];
    const grupos = ['A', 'B', 'C', 'D', 'E'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial((prevMaterial) => ({
            ...prevMaterial,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados cadastrados:", material);

        setMaterial({
            nomeResíduo: '',
            descricao: '',
            categoriaResíduo: '',
            classeResíduo: '',
            grupoResíduo: '',
        });
    };

    return (
        <div className="registro-container">
            <form className="formulario-cadastro" onSubmit={handleSubmit}>
                <h2>Cadastro de Material</h2>

                <label htmlFor="nomeResíduo">Nome do Resíduo:</label>
                <input
                    type="text"
                    id="nomeResíduo"
                    name="nomeResíduo"
                    value={material.nomeResíduo}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    value={material.descricao}
                    onChange={handleChange}
                    className="textarea-descricao"
                />

                <label htmlFor="categoriaResíduo">Categoria do Resíduo:</label>
                <select
                    id="categoriaResíduo"
                    name="categoriaResíduo"
                    value={material.categoriaResíduo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    {categorias.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>

                <label htmlFor="classeResíduo">Classe do Resíduo:</label>
                <select
                    id="classeResíduo"
                    name="classeResíduo"
                    value={material.classeResíduo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    {classes.map((classe, index) => (
                        <option key={index} value={classe}>
                            {classe}
                        </option>
                    ))}
                </select>

                <label htmlFor="grupoResíduo">Grupo do Resíduo:</label>
                <select
                    id="grupoResíduo"
                    name="grupoResíduo"
                    value={material.grupoResíduo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    {grupos.map((grupo, index) => (
                        <option key={index} value={grupo}>
                            {grupo}
                        </option>
                    ))}
                </select>

                <button type="submit">Cadastrar Material</button>
            </form>
        </div>
    );
}

export default CadastroResiduo;