import { Schema, model } from 'mongoose'
import { Inventory, Product, Variant } from './Products.Interface'

const VariantSchema = new Schema<Variant>(
  {
    type: { type: String, required: [true, 'Variant type is required'] },
    value: { type: String, required: [true, 'Variant value is required'] },
  },
  { _id: false },
)

const InventorySchema = new Schema<Inventory>(
  {
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: [true, 'InStock status is required'] },
  },
  { _id: false },
)

const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: { type: Number, required: [true, 'Product price is required'] },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    tags: { type: [String], required: [true, 'Product tags are required'] },
    variants: {
      type: [VariantSchema],
      required: [true, 'Product variants are required'],
    },
    inventory: {
      type: InventorySchema,
      required: [true, 'Product inventory is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    id: false,
  },
)

export const ProductsModel = model<Product>('products', ProductSchema)
