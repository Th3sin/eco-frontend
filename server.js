/* API CEP */
/* SERVIDOR NODE.JS COM EXPRESS */
/* RODAR NO TERMINAL COM COMANDO: "node server.js" */

import express from "express"; //Express → Framework para criar um servidor HTTP de maneira simples
import cors from "cors"; //Cors → Middleware que permite que o frontend (React) se comunique com o backend sem bloqueios de CORS
import fetch from "node-fetch"; //node-fetch → Biblioteca que permite fazer requisições HTTP dentro do Node.js

const app = express();
app.use(cors());

app.get("/cep/:cep", async (req, res) => {
    const cep = req.params.cep;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);  //O código React chama a API do backend
        if (!response.ok) {
            throw new Error(`Erro na API ViaCEP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); //convertendo para json

        if (data.erro) {
            return res.status(404).json({ error: "CEP não encontrado!" });
        }

        res.json(data); //se estiver tudo ok, o react recebe os dados json e preenche os campos
        
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        res.status(500).json({ error: "Erro interno ao buscar CEP" }); //se der errado, o erro retorna no console
    }
});

//iniciando o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); 
});