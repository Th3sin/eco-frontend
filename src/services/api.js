//import express from "express";
//import cors from "cors";
//import path from "path";
//import { fileURLToPath } from "url";
//import fetch from "node-fetch";

/* RODAR NO TERMINAL COM O COMANDO: "npx json-server --watch db.json --port 3000" */

import axios from "axios";

const api = axios.create({
    
    // baseURL: 'http://172.19.0.49/pizzariateste/api/v1/'
    baseURL: "http://localhost:8080/api/v1/auth"

})

export default api


//npm install json-server
//npm install axios