import { Schema, model} from 'mongoose';

import Orders from './Orders.Interface';

// Define the Mongoose schema
const OrdersSchema = new Schema<Orders>({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    productId: {
        type: String,
        required: [true, 'Product ID is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    }
});

// Create the Mongoose model
export const OrdersModel = model<Orders>('Orders', OrdersSchema);
