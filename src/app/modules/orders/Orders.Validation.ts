import { z } from 'zod';

// Define the Zod schema
const OrderValidationSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
    productId: z.string().min(1, { message: 'Product ID must be a non-empty string' }).trim(),
    price: z.number()
    .min(0, { message: 'Product price is required' })
    .nonnegative({ message: 'Product price must be non-negative' })
    .positive({ message: 'Product price can not be zero' }),
    quantity: z.number()
    .min(0, { message: 'Quantity must be a non-negative number' })
    .int()
    .positive({ message: 'Quantity can not be zero' }),
});

export default OrderValidationSchema;
