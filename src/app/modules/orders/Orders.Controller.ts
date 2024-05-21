import { Request, Response } from "express";
import { OrderServices } from "./Orders.Services";
import OrderValidationSchema from "./Orders.Validation";

const addOrders = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const validatedData = OrderValidationSchema.parse(orderData);
        const result = await OrderServices.addOrderToDB(validatedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: {
                    email: result.email,
                    productId: result.productId,
                    price: result.price,
                    quantity: result.quantity
                }
            })
        } else {
            throw new Error('Something wrong!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error
        })
    }
}


const getAllOrders = async (req: Request, res: Response) => {
    try {
        if (req.query.email) {
            const query = req.query.email as string;
            const result = await OrderServices.searchOrdersFromDB(query);
            if (result?.length != 0) {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!!",
                    data: result?.map(order => {
                        return {
                            email: order.email,
                            productId: order.productId,
                            price: order.price,
                            quantity: order.quantity
                        }
                    })
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Order not found',
                })
            }
        }
        else {
            const result = await OrderServices.getAllOrdersFromDB();
            if (result?.length != 0) {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully!",
                    data: result?.map(order => {
                        return {
                            email: order.email,
                            productId: order.productId,
                            price: order.price,
                            quantity: order.quantity
                        }
                    })
                })
            } else {
                throw new Error('Something wrong!')
            }
        }



    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Order not found',
        })
    }
}





export const OrderController = {
    addOrders,
    getAllOrders
}   