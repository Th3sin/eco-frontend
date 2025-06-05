/* API CEP */
/* SERVIDOR NODE.JS COM EXPRESS */
/* RODAR NO TERMINAL COM COMANDO: "node server.js" */

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/cep/:cep", async (req, res) => {
    const cep = req.params.cep;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error(`Erro na API ViaCEP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.erro) {
            return res.status(404).json({ error: "CEP não encontrado!" });
        }

        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        res.status(500).json({ error: "Erro interno ao buscar CEP" });
    }
});

// Inicia o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});