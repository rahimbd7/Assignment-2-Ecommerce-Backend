import { Types } from "mongoose";
import { ProductsModel } from "../products/Products.Model";
import Orders from "./Orders.Interface";
import { OrdersModel } from "./Orders.Model";



const addOrderToDB = async (orderData: Orders) => {
    try {
        const {productId,quantity} = orderData;
        const product = await ProductsModel.findOne({_id:new Types.ObjectId(productId)});
        if(!product){
            return 0;
        }

        if(product.inventory.quantity < quantity){
            return  {
                success: false,
                message: 'Insufficient quantity available in inventory'
            }
        }else{
            product.inventory.quantity = product.inventory.quantity - quantity;
            if(product.inventory.quantity === 0){
                product.inventory.inStock=false;
                await product.save();
            }
            await product.save();
            const result = await OrdersModel.create(orderData);
            return result;
        }

    }catch(err){

    }
   
}


const getAllOrdersFromDB = async () => {
    try {
        const result = await OrdersModel.find();
        return result;
    } catch (error) {
        console.log(error);
    }
}   

const searchOrdersFromDB = async (query: string) => {
    try {
        const result = await OrdersModel.find({
            email: { $regex: query, $options: 'i' } 
        })
        return result
    } catch (error) {
        console.log(error);
    }
}



export const OrderServices = {
    addOrderToDB,
    getAllOrdersFromDB,
    searchOrdersFromDB
}