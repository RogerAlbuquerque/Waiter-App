import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://127.0.0.1:27017')
  .then(()=> {
    const app = express();
    const port = 3001;

    // Isso aqui é basicamente uma rota para o node mostrar arquivos estáticos da pasta de "uploads" browser
    // caso alguem acesse "uploads/nomeImagem" e o nome dessa imagem estiver na pasta "uploads" ela vai ser acesasda no browser
    // Isso vai ser preciso para poder pegar as imagens no frontend.
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    // Serve para pegar qualquer requisição e transformar para json. e tem que vir antes do arquivo de rotas.
    app.use(express.json());
    app.use(router);

    app.listen(3001, () => {
      console.log(`Server is runnig on http://localhost:${port}`);
    });

  })
  .catch((error)=> console.log(error));




