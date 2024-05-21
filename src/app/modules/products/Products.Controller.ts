import { Request, Response } from "express";
import { ProductServices } from "./Products.Services";
import ProductValidationSchema from "./Products.validation";
import { Types } from "mongoose";

const addAProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validatedData = ProductValidationSchema.parse(productData);
        const result = await ProductServices.addProductToDB(validatedData);
        if (result) {
            console.log(result)
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
        const result = await ProductServices.getAllProductsFromDB();
        if (result) {
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
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
}


const searchProducts = async (req: Request, res: Response) => {
    try {
        const query = req.query.searchTerm as string;
        console.log(query);
        const result = await ProductServices.searchProductsFromDB(query);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully! or not",
            data: result
        })
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
    searchProducts

}