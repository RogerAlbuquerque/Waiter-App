import { Request, Response } from 'express';
import { Product } from '../../models/Product';



export async function createProducts(req: Request, res:Response){
  try{
    console.log(req.body);

  }catch (error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error!'});
  }
}
