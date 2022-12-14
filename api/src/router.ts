import path from 'node:path';

import { Router                   } from 'express';
import   multer                     from 'multer';

import { createCategory           } from './app/useCases/categories/createCategory'          ;
import { listCategories           } from './app/useCases/categories/listCategories'          ;
import { createProducts           } from './app/useCases/products/createProduct'             ;
import { listProducts             } from './app/useCases/products/listProducts'              ;
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories';
import { listOrders               } from './app/useCases/orders/listOrders'                  ;
import { createOrder              } from './app/useCases/orders/createOrder'                 ;
import { changeOrderStatus        } from './app/useCases/orders/changeOrderStatus'           ;
import { cancelOrder              } from './app/useCases/orders/cancelOrder'                 ;
import { deleteProducts           } from './app/useCases/products/deleteProducts';

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

// Delete product
router.delete('/products/:productId', deleteProducts);


// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategories);

// List orders
router.get('/orders', listOrders);


// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel order
router.delete('/orders/:orderId', cancelOrder);
