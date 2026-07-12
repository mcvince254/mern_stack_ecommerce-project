import app from "./app.js";
import dotenv from 'dotenv'
import { connectMongoDataBase } from "./config/db.js";
import {v2 as cloudinary} from 'cloudinary'
dotenv.config({
    path: "./backend/config/config.env"
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});


connectMongoDataBase();
// Handle uncaught Exception Errors
process.on('uncaughtException',(error)=>{
    console.log(`Error:${error.message}`);
    console.log('SErver is shutting down due to uncaught exception')
    process.exit(1)
});
const port = process.env.PORT || 3000
//console.log(myname) test for uncaught error

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// Handle Promise Rejection Error
process.on('unhandledRejection',(error)=>{
    console.log(`Error: ${error.message}`);
    console.log('Server is shuttong down due to unhandled promise rejection');
    server.close(()=>process.exit(1))
    
})