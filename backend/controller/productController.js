import Product from '../models/productModel.js';
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middleWare/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import sendResponse from '../utils/sendResponse.js';

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


export const testGetAllrPoduct = async function(req,res){

    const apiproduct = new testApiFunctionality(Product.find(),req.query).search().filter();
    const products= await apiproduct.query;


            res.status(200).json({
                success:true,
                products
            })
    
}





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

// ✔ 6. admin get all products
 export const  getAdminProducts = handleAsyncError(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,products
    })
 })

export const createOrUpdateReview = handleAsyncError(async (req, res, next) => {

    const { rating, comment } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating:Number(rating),
        comment
    };

    const product = await Product.findById(req.params.id);

    const reviewExists = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    );

    if (reviewExists) {
        reviewExists.rating = Number(rating);
        reviewExists.comment = comment;
    } else {
        product.reviews.push(review);
    }

    product.numberOfReviews = product.reviews.length;

    let sum = 0;

    product.reviews.forEach(review => {
        sum += Number(review.rating);
    });

    product.ratings = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    sendResponse(res, 201, product);
});


// ✔ 8️⃣ Admin - getting reviews 📝👍👌  0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣8️⃣8️⃣9️⃣🔟❌🔑🔐

export const getProductReviews = handleAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);
            if(!product){
                return next(new HandleError("Product not found",404))
            }


    res.status(200).json({
        success: true, 
        reviews:product.reviews
    });
});


// ✔ 9️⃣ Admin - getting reviews 📝👍👌  0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣8️⃣8️⃣9️⃣🔟❌🔑🔐

export const deleteReview = handleAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
            if(!product){
                return next(new HandleError("Product not found",404))
            }
    const reviews = product.reviews.filter(review => review._id.toString() !==req.query.id.toString())
    let sum = 0;
    reviews.forEach(review => {sum+=review.rating});
    const rating = reviews.length > 0 ? sum/reviews.length : 0;
    const numberOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numberOfReviews
        },{
            new:true,
            runValidators:true

        })


    res.status(200).json({
        success: true,
        message:"Review deleted successfully"
            });
   
})