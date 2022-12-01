
import { Request, Response } from 'express';
import { Product } from '../../models/Product';



export async function listProductsByCategories(req: Request, res:Response){
  try{
    const {categoryId} = req.params;
    const products = await Product.find().where('category').equals(categoryId);

    res.json(products);

  }catch (error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error!'});
  }
}
