import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js"; // adjust path if needed

dotenv.config({ path: "./config/config.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "onlinestore",
        });

        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

const seedProducts = async () => {
    try {

        await Product.deleteMany();

        const products = [];

        for (let i = 1; i <= 1000; i++) {
            products.push({
                name: `Product ${i}`,
                description: `Description for product ${i}`,
                category: `Category ${(i % 5) + 1}`,
                price: Math.floor(Math.random() * 10000) + 100,
                stock: Math.floor(Math.random() * 100) + 1,

                image: [
                    {
                        public_id: `product_${i}`,
                        url: `https://example.com/images/product${i}.jpg`
                    }
                ],

                user: "6a3d89f601a71d23862707ae"
            });
        }

        await Product.insertMany(products);

        console.log("1000 Products Inserted Successfully");

        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

await connectDB();
await seedProducts();