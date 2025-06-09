// server.js  –  Node 18+  /  "type": "module" no package.json
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const PORT = 3001;
const HOST = "0.0.0.0";          // ou 192.168.18.5 se preferir fixar
const app  = express();

/* ----------------------------------------------------------------- */
/*  Configurações básicas                                            */
/* ----------------------------------------------------------------- */
app.use(cors());
app.use(express.json());

/* ----------------------------------------------------------------- */
/*  Pasta do build (Vite → dist/)                                    */
/* ----------------------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const distPath   = path.join(__dirname, "dist");
app.use(express.static(distPath));

/* ----------------------------------------------------------------- */
/*  API CEP                                                          */
/* ----------------------------------------------------------------- */
app.get("/cep/:cep", async (req, res) => {
  try {
    const { cep } = req.params;
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await r.json();

    if (data.erro) return res.status(404).json({ error: "CEP não encontrado!" });
    return res.json(data);
  } catch (err) {
    console.error("Erro ao buscar CEP:", err);
    return res.status(500).json({ error: "Erro interno ao buscar CEP" });
  }
});

/* ----------------------------------------------------------------- */
/*  Fallback SPA  (captura qualquer rota restante)                   */
/* ----------------------------------------------------------------- */
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* ----------------------------------------------------------------- */
/*  Sobe servidor                                                    */
/* ----------------------------------------------------------------- */
app.listen(3001, "localhost", () => {
  console.log("Servidor rodando *apenas no localhost* na porta 3001");
});