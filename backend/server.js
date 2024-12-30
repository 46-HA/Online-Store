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

app.listen(port, () => {
    connectDB();
    console.log("Server is listening on port ", port)
});

