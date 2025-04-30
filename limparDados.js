/* JS PARA EXCLUIR DADOS DO DB.JSON */
/* RODAR NO TERMINAL COM COMANDO: "node limparDados.js" */

import fs from 'fs';

const arquivos = ['db.json', 'enderecos.json'];

arquivos.forEach((arquivo) => {
  fs.unlink(arquivo, (err) => {
    if (err) {
      console.error(`Erro ao excluir o arquivo ${arquivo}:`, err.message);
    } else {
      console.log(`Arquivo ${arquivo} excluído com sucesso!`);
    }
  });
});