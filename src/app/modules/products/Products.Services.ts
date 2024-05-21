import { Product } from './Products.Interface'
import { ProductsModel } from './Products.Model'

const addProductToDB = async (productData: Product) => {
  try {
    const result = await ProductsModel.create(productData)
    return result
  } catch (error) {
    throw new Error('Failed to add product to DB!')
  }
}

const getAllProductsFromDB = async () => {
  try {
    const result = await ProductsModel.find()
    return result
  } catch (error) {
    throw new Error('Failed to fetch products from DB!')
  }
}

const getSingleProductFromDB = async (id: string) => {
  try {
    const result = await ProductsModel.findOne({ _id: id })
    return result
  } catch (error) {
    throw new Error('Failed to fetch product from DB!')
  }
}

const deleteSingleProductFromDB = async (id: string) => {
  try {
    const result = await ProductsModel.deleteOne({ _id: id })
    return result
  } catch (error) {
    throw new Error('Failed to delete product from DB!')
  }
}

const updateSingleProductFromDB = async (id: string, productData: Product) => {
  try {
    const result = await ProductsModel.findByIdAndUpdate(
      { _id: id },
      productData,
      { new: true },
    )
    return result
  } catch (error) {
    throw new Error('Failed to update product from DB!')
  }
}

const searchProductsFromDB = async (query: string) => {
  try {
    const result = await ProductsModel.find({
      name: { $regex: query, $options: 'i' },
    })
    return result
  } catch (error) {
    throw new Error('Failed to search product from DB!')
  }
}

export const ProductServices = {
  addProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateSingleProductFromDB,
  searchProductsFromDB,
}
