import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncErro from "../middleWare/handleAsyncError.js";
import handleAsyncError from "../middleWare/handleAsyncError.js";
import { compareSync } from "bcryptjs";
import error from "../middleWare/error.js";

// // ✔ 1️⃣ Create New Order 📝👍👌  0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣8️⃣8️⃣9️⃣🔟❌🔑🔐

export const createNewOrder = handleAsyncErro(async(req,res,next)=>{
    const  {shippingInfo,orderItems,paymentInfo,itemPrice,shippingPrice,taxPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemPrice,
        paymentInfo,
        shippingPrice,
        taxPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user.id
    });


    res.status(200).json({
        success:true,
        order
    });

});


//✔ 2️⃣ Admin - Get single order 📝

export const getSingleOrder = handleAsyncError(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id).populate("user","name email role")
    if(!order){
        return next(new HandleError("Order Not found",404))
    };

    res.status(200).json({
        success:true,
        order
    });

});

//✔ 3️⃣ Get All My orders 📝

export const getAllMyOrders = handleAsyncErro(async(req,res,json)=>{
    
    const orders = await Order.find({user:"mcvincemuthoni254@gmail.com"});
    if(!orders){
        return next (new HandleError("No orders found",404))
    };

    res.status(201).json({
        success:true,
        orders
    });

});

//✔ 4️⃣ Admin - Get All orders 📝

export const getAllOrders = handleAsyncErro(async(req,res,next)=>{
    const orders =await Order.find();
    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice)
    if(!orders){
        return next(new HandleError("No orders found",404))
    }

    res.status(201).json({
        success:true,
        orders,
        totalAmount
    });
});
//5️⃣6️⃣7️⃣8️⃣8️⃣8️⃣9️⃣🔟
//✔ 5️⃣ Get order status 📝

export const updateOrderStatus = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new HandleError("Order not found",404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new HandleError("Order already delivered",404 ))
    }

    await Promise.all(order.orderItems.map(item => updateQuantity(item.quantity,item.product)));

    order.orderStatus = req.body.status;
    if(order.Status === "Delivered"){
        order.deliveredAt = Date.now(); 
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    }) 
   })
    async function updateQuantity(quantity,id){

        const product = await Product.findById(id);
        if(!product){
            return next (new HandleError("Product not found",404))
        }

        product.stock -= quantity
        await product.save({validateBeforeSave:false})

    }
// ✔6️⃣ Admi-Delete order
    export const deleteOrder = handleAsyncError(async(req,res,next)=>{
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return next(new HandleError("Order not found",404))
        }

        res.status(201).json({
            success:true,
            message:"order delted successfully",
            order
        })
    })


