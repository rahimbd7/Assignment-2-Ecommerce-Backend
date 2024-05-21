import { Request, Response } from "express";
import { ProductServices } from "./Products.Services";
import { Types } from "mongoose";
import ProductValidationSchema from "./Products.validation";

const addAProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validatedData = ProductValidationSchema.parse(productData);
        const result = await ProductServices.addProductToDB(validatedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product created successfully!",
                data: result
            })
        } else {
            throw new Error('Something wrong!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        })
    }
};


const getAllProducts = async (req: Request, res: Response) => {
    try {
        if (req.query.searchTerm) {
            const query = req.query.searchTerm as string;
            const result = await ProductServices.searchProductsFromDB(query);
            console.log( result);
            if(result?.length!=0){
                res.status(200).json({
                    success: true,
                    message: "Products fetched successfully!",
                    data: result
                })
            }else{
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch products!',
                   
                })
            }
        } else {
            const result = await ProductServices.getAllProductsFromDB();
            if (result?.length != 0) {
                res.status(200).json({
                    success: true,
                    message: "Products fetched successfully!",
                    data: result
                })
            } else {
                throw new Error('Something wrong!')
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        })
    }
};


const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId;
        const objectId = new Types.ObjectId(id).toString();
        const result = await ProductServices.getSingleProductFromDB(objectId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: result
            })
        } else {
            throw new Error('Something wrong!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Products failed to fetched with provided id!',
            error: error,
        })
    }
};


const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId;
        const objectId = new Types.ObjectId(id).toString();
        const result = await ProductServices.deleteSingleProductFromDB(objectId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null
            })
        } else {
            throw new Error('Something wrong!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        })

    }
};

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId;
        const productData = req.body;
        const objectId = new Types.ObjectId(id).toString();
        const validatedData = ProductValidationSchema.parse(productData);
        const result = await ProductServices.updateSingleProductFromDB(objectId, validatedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data:result
            })
        } else {
            throw new Error('Something wrong!')
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        })
    }
}



export const ProductController = {
    addAProduct,
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,

}