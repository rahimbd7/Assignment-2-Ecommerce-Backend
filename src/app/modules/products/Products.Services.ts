import { Types } from "mongoose";
import { Product } from "./Products.Interface";
import { ProductsModel } from "./Products.Model"




/************************************************ */
//All the Products Service Logics
/************************************************* */


const addProductToDB = async (productData: Product) => {
    try {
        const result = await ProductsModel.create(productData);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const getAllProductsFromDB = async () => {
    try {
        const result = await ProductsModel.find();
        return result;
    } catch (error) {
        console.log(error);
    }
}



const getSingleProductFromDB = async (id: string) => {
    try {
        const result = await ProductsModel.findOne({ _id: id });
        console.log(result)
        return result;
    } catch (error) {
        console.log(error);
    }
}


const deleteSingleProductFromDB = async (id: string) => {
    try {
        const result = await ProductsModel.deleteOne({ _id: id });
        return result;
    } catch (error) {
        console.log(error);
    }
}


const updateSingleProductFromDB = async (id: string, productData: Product) => {
    try {
        const result = await ProductsModel.findByIdAndUpdate({ _id: id }, productData, { new: true });
        return result;
    } catch (error) {
        console.log(error);
    }
}



const searchProductsFromDB = async (query: string) => {
    try {
        const result = await ProductsModel.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive partial match
        })
        return result
    } catch (error) {
        console.log(error);
    }
}


export const ProductServices = {
    addProductToDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteSingleProductFromDB,
    updateSingleProductFromDB,
    searchProductsFromDB
}