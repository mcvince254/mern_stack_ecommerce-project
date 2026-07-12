import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncErro from "../middleWare/handleAsyncError.js";

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
    })

})

