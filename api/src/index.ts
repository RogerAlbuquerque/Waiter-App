import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://127.0.0.1:27017')
  .then(()=> {
    const app = express();
    const port = 3001;

    app.use(express.json());  // Serve para pegar qualquer requisição e transformar para json. e tem que vir antes do arquivo de rotas.
    app.use(router);

    app.listen(3001, () => {
      console.log(`Server is runnig on http://localhost:${port}`);
    });

  })
  .catch((error)=> console.log(error));




