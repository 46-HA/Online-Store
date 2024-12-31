import express from 'express';
import mongoose from "mongoose";
import { deleteProducts, getProducts, newProducts } from '../controllers/product.controller.js';
const router = express.Router();

router.get("/", getProducts)

router.post("/", newProducts)

router.delete("/:id", deleteProducts)

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false,
            message: "Could not find product with the ID"
        });
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, product, { new: true });
        res.status(200).json({
            success:true,
            data: updatedProduct,
            message: "Updated the product"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server error code 500"
        });
    }

});

export default router;

