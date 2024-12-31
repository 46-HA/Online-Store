import mongoose from 'mongoose';
//test
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const newProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please enter all of the required fields"
        });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.log("Error with saving product, returned with 500. ", error);
        res.status(500).json({
            success: false,
            message: "Server error 500: " + error
        });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Could not find product with the ID"
        });
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, product, { new: true });
        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Updated the product"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error code 500"
        });
    }
};

