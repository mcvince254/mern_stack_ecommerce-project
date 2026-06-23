import Product from '../models/productModels.js';
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middleWare/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';

// 1 Creating products
export const createProducts =handleAsyncError( async(req,res,next)=>{
   req.body.user = req.user.id;  
   const product =  await  Product.create(req.body)
   res.status(201).json({
    success:true,
    product
   })
   console.log(req.user)
})

// 2 Get all products
export const getAllProducts =handleAsyncError( async(req,res,next)=>{
  const apiFunctionality = new APIFunctionality(Product.find(),req.query).search().filter();

  const products = await apiFunctionality.query
  res.status(200).json({
    success:true,
    products
  })
}
);



// 3 Update product

export const updateProduct = handleAsyncError(async(req,res,next)=>{
    

    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    }); 


    // product not found
        if(!product){
         next(new HandleError("Product Not Found",404))
    }


    res.status(200).json({
        success:true,
        product
    })
}
)
// 4. delete product
export const deleteProduct =handleAsyncError( async (req,res,next)=>{
// let product = await Product.findById(req.params.id);

 
 const product = await Product.findByIdAndDelete(req.params.id);

  if(!product){
         next(new HandleError("Product Not Found",404))
    }
 res.status(200).json({
    success:true,message:"Product Deleted Successfully"
 })
}
)

// 5. get single product

export const getSingleProduct = handleAsyncError( async(req,res,next) =>{
   try{ let product = await Product.findById(req.params.id);
    if(!product){
         return   next(new HandleError("no such product",404))
    }
   
    res.status(200).json({
        success:true,product
    })}
    catch(err){
        res.status(404).json({
            success:false,message:err.message
        })
    }
}
);