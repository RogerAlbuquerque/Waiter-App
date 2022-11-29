import express from 'express';
import mongoose from 'mongoose';



mongoose.connect('mongodb://127.0.0.1:27017')
  .then(()=> {
    const app = express();

    app.listen(3001, () => {
      console.log(`Server is runnig on http://localhost:${port}`);
    });

  })
  .catch((error)=> console.log(error));

const port = 3001;


