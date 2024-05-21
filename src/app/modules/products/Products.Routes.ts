import express, { Request, Response } from 'express';
import { ProductController } from './Products.Controller';

const productRouter = express.Router();

productRouter.post('/',ProductController.addAProduct);
productRouter.get('/:productId',ProductController.getSingleProduct);
productRouter.delete('/:productId',ProductController.deleteSingleProduct);
productRouter.put('/:productId',ProductController.updateSingleProduct);
productRouter.get('/',ProductController.getAllProducts);


export default productRouter;