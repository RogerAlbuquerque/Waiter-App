import { Request, Response } from 'express';
import { Order } from '../../models/Order';



export async function listOrders(req: Request, res:Response){
  try{

    const orders = await Order.find()
    //Esse sort vai ordenar a resposta de acordo com o que for passado dentro das chaves
      .sort({createdAt:1})             // Esse 1 é como se fosse um "CRESCENT" e 1 é o contrário

    //O populate serve para invés de só mostrar o ID do produto, mostrar todos os dados da tabela "Product" referente a esse produto
    //Ja que a collection "order" tem uma relacionamento com a collection "Product", isso é possível.
      .populate('products.product');

    res.json(orders);

  }catch (error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error!'});
  }
}
