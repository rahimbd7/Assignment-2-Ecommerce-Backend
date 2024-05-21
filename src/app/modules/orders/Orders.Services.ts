import Orders from "./Orders.Interface";
import { OrdersModel } from "./Orders.Model";


const addOrderToDB = async (orderData: Orders) => {
    try {
        const result = await OrdersModel.create(orderData);
        return result;
    } catch (error) {
        console.log(error);
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