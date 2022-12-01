import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProducts } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';

export const router = Router();

//Esse é o middleware para receber a imagem na requisição
const upload = multer({
  storage:multer.diskStorage({
    destination(req,file,callback){
      callback(null,path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req,file, callback){
      callback(null,`${Date.now()}-${file.originalname}`);
    },
  })
});

//TUDO ISSO ABAIXO SÃO OS CHAMADOS "CASOS DE USOS"

// List categories
router.get('/categories', listCategories);


// Create category
router.post('/categories', createCategory);


// List products
router.get('/products', listProducts);


// Create products
router.post('/products',upload.single('image') ,createProducts);


// Get products by category
router.get('/categories/:categoryId/products', (req,res) => {
  res.send('OK');
});

// List orders
router.get('/orders', (req,res) => {
  res.send('OK');
});


// Create order
router.post('/orders', (req,res) => {
  res.send('OK');
});

// Change order status
router.patch('/orders/:orderId', (req,res) => {
  res.send('OK');
});

// Delete/Cancel order
router.delete('/orders/:orderId', (req,res) => {
  res.send('OK');
});
