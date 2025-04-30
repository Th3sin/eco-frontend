import React, { useState, useEffect } from 'react';
import './coletaForm.css';

function ColetaForm() {

    // Declaração da constante classes e grupos para Resíduos (SELECT)
    const classes = ['Perigoso', 'Não Perigoso'];
    const grupos = ['A', 'B', 'C', 'D', 'E'];

    // Cria um estado React (formData) que guarda todos os campos do formulário em um único objeto
    const [formData, setFormData] = useState ({ nome: '', email: '', telefone: '', cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', nomeResiduo: '', classeResiduo: '', quantidadeResiduo: '', });


    // Chamada Onchange de cada campo
    // Pega o nome e valor do input (por exemplo: name="email" e value="teste@email.com")
    // Atualiza somente aquele campo no formData.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value,
        }));
    };

    // Estado separado para anexo da imagem
    const [imagem, setImagem] = useState(null);

    const handleInputChangeImagem = (e) => {
  setImagem(e.target.files[0]);
    };


    // Busca o endereço automaticamente com base no CEP
    useEffect(() => {
        const fetchEndereco = async () => {
            if (formData.cep.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
                    const data = await response.json();
                    if (!data.erro) {
                        setFormData((prevData) => ({
                            ...prevData,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                        }));
                    }
                } catch (error) {
                    console.error('Erro ao buscar CEP:', error);
                }
            }
        };
        fetchEndereco();
    }, [formData.cep]);

    //é responsável por enviar os dados do formulário para a API, tratando a resposta e exibindo mensagens de sucesso ou erro
    //A função utiliza fetch para enviar os dados como JSON, e dependendo da resposta do servidor, o formulário pode ser resetado ou o usuário será informado de um erro

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/coletas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert("Coleta solicitada com sucesso!");

                setFormData({
                    nome: '', email: '', telefone: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '',
                    nomeResiduo: '', classeResiduo: '', quantidadeResiduo: ''
                });
            } 

            else {
                alert("Erro ao solicitar coleta.");
            }

        } catch (error) {

            console.error("Erro ao enviar solicitação:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };    

    return (
        <div className='container-solicitacao'>

            <form onSubmit={handleSubmit}>
            <div className='titulo-solicitacao'>
                <h1>Solicite uma coleta</h1> 
            </div>

            {/* DADOS DO SOLICITANTE */}
                <div className='dados-pessoais'>
                    <h3>Dados para contato:</h3>

                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" name="nome" placeholder="Digite o seu nome" required value={formData.nome} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" name="email" placeholder="Digite o seu e-mail" required value={formData.email} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" name="telefone" placeholder="Digite o seu telefone" required value={formData.telefone} onChange={handleInputChange} />
                    </div>

                </div>

            {/* ENDEREÇO DO SOLICITANTE */}

                <div className='dados-endereco'>
                    <h3>Endereço em que será realizada a coleta dos resíduos:</h3>

                    <div className="form-group">
                        <label>CEP</label>
                        <input type="text" name="cep" maxLength="8" placeholder="Digite seu CEP" value={formData.cep} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Logradouro</label>
                        <input type="text" name="logradouro" value={formData.logradouro} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Número</label>
                        <input type="text" name="numero" placeholder="Digite o número" value={formData.numero} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Complemento</label>
                        <input type="text" name="complemento" placeholder="Digite o complemento (opcional)" value={formData.complemento} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Bairro</label>
                        <input type="text" name="bairro" value={formData.bairro} readOnly />
                    </div>
                    
                    <div className="form-group">
                        <label>Cidade</label>
                        <input type="text" name="cidade" value={formData.cidade} readOnly />
                    </div>

                </div>

            {/* DADOS DO RESÍDUO */}

                <div className='dados-residuo'>
                    <h3>Informações do resíduo à ser retirado:</h3>

                    <div className="form-group">
                        <label>Identificação do Material</label>
                        <input type="text" name="nomeResiduo" placeholder="Digite o nome do resíduo" value={formData.nomeResiduo} 
                        onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Classe</label>
                        <select name="classeResiduo" value={formData.classeResiduo} 
                        onChange={handleInputChange}>
                    
                        <option value="">Selecione</option>
                        {classes.map((classe, index) => (

                            <option key={index} value={classe}>
                                {classe}
                            </option>
                        ))}

                    </select>
                    </div>

                    <div className="form-group">
                        <label>Quantidade</label>
                        <input type="text" name="quantidadeResiduo" placeholder="Quantidade aproximada (kg, litros, unidades)" value={formData.quantidadeResiduo} 
                        onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Anexar Foto do(s) Resíduo(s)</label>
                        <input type="file" name="imagem"
                        accept="image/*"
                        onChange={handleInputChangeImagem} />
                    </div>

                    <div className='form-group'>
                        <label>Observações:</label>
                        <textarea
                         name="observacoes"
                         placeholder="Inclua observações que ajudem a empresa responsável pela coleta."
                         value={formData.observacoes}
                         onChange={handleInputChange}
                         rows="10"></textarea>
                    </div>

                </div>
                        {/* Preferência data e hora*/}
                <div className='dados-data'>
                    <h3>Selecione o dia e hora da retirada:</h3>
                    <div className="form-group">
                        <label>Data da Coleta</label>
                        <input
                            type="date"
                            name="dataColeta"
                            value={formData.dataColeta}
                            onChange={handleInputChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label>Hora da Coleta</label>
                        <input
                            type="time"
                            name="horaColeta"
                            value={formData.horaColeta}
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>

                <div className='botoes-solicitacao'>
                    <button type="submit">ENVIAR PEDIDO</button>
                    <button type="reset" name="cancel" onClick="window.location.reload();">Cancelar</button>
                </div>
                
            </form>
        </div>
    );
}

export default ColetaForm;