import mongoose from 'mongoose'

const productSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
        description:{
        type:String,
        required:[true,"please Enter product description"]
    },  
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },      
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[7,"price cannot exceeds 7 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
      {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }}],

    stock:{
        type:Number,
        required:[true,"please Enter product stock"],
        maxLength:[7,"price cannot exceeds 7 digits"],
        default:1
       },
    numberofReviews:{
        type:Number,
        default:0
       },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                 type:Number,
                required:true 
            }
        }
       ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Product",productSchema)

//{"name":"product1","description":"desc product1","category":"cate product1","price":"product1","numberofReviews":"numberofReviews product1"}

