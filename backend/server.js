import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json()); //allows to accept json 
app.use("/api/products", productRoutes);

dotenv.config();

let PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB();
    console.log("Server is listening on port ", PORT)
});

