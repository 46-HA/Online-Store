import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
const app = express();
app.use(express.json()); //allows to accept json 
dotenv.config();

let port = 5001;


app.post("/api/products", async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) 
        {
            return res.status(400).json({ //error on users behalf
                sucess: false,
                message: "Please enter all of the required fields"
            });
        }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({ //sucessfully saved
            sucess: true,
            data: newProduct
        });
    } catch(error) {
        console.log("Error with saving product, returned with 500. ", error);
        res.status(500).json({ //server error
            sucess: false,
            message: "Server error 500: ", error
        }); 
    }
});

app.delete("/api/products/:id", async (req,res) => {
    const {id} = req.params;
    console.log(id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            sucess: true,
            message: "Product deleted sucessfully"
        })
    } catch (error) {
        res.status(404).json({
            sucess: false,
            message: "Product not found"
        });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({
            sucess: true,
            message: allProducts
        });
    } catch (error) {
        console.log("Failed to view products. Error: ", error.message)
        res.status(500).json({
            sucess: false,
            message: "Could not get products. Error: ", error
        });
    }
});

app.listen(port, () => {
    connectDB();
    console.log("Server is listening on port ", port)
});

