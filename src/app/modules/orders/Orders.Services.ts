import { Types } from 'mongoose'
import { ProductsModel } from '../products/Products.Model'
import Orders from './Orders.Interface'
import { OrdersModel } from './Orders.Model'
import { ObjectId } from 'mongoose';

interface IOrderDetailsMsg {
    _id: string | ObjectId;
    email: string;
    productId: string;
    price: number;
    quantity: number;
}

interface IErrorMsg {
    success: false;
    message: string;
}

interface ISuccessMsg {
    success: true;
    message: string;
    order: IOrderDetailsMsg;
}

export type OrderResult = IErrorMsg | ISuccessMsg;
 

const addOrderToDB = async (orderData: Orders): Promise<OrderResult> => {
  try {
      const { productId, quantity } = orderData;
      const product = await ProductsModel.findOne({ _id: new Types.ObjectId(productId) });

      if (!product) {
          return { success: false, message: 'Product not found' };
      }

      if (product.inventory.quantity < quantity) {
          return { success: false, message: 'Insufficient quantity available in inventory' };
      } else {
          product.inventory.quantity -= quantity;

          if (product.inventory.quantity === 0) {
              product.inventory.inStock = false;
          }

          await product.save();
          const order = await OrdersModel.create(orderData);

          const orderWithIdAsString: IOrderDetailsMsg = {
              _id: order._id.toString(), 
              email: order.email,
              productId: order.productId,
              price: order.price,
              quantity: order.quantity
          };

          return {
              success: true,
              message: 'Order created successfully',
              order: orderWithIdAsString
          };
      }
  } catch (err) {
      return { success: false, message: 'No product found with the provided productId' };
  }
};


const getAllOrdersFromDB = async () => {
  try {
    const result = await OrdersModel.find()
    return result
  } catch (error) {
    throw new Error('Failed to fetch orders from DB!')
  }
}

const searchOrdersFromDB = async (query: string) => {
  try {
    const result = await OrdersModel.find({
      email: { $regex: query, $options: 'i' },
    })
    return result
  } catch (error) {
    throw new Error('Failed to search order from DB!')
  }
}

export const OrderServices = {
  addOrderToDB,
  getAllOrdersFromDB,
  searchOrdersFromDB,
}
