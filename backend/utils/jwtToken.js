export const sendToken=(user,statusCode,res)=>{
   const token = user.getJWTToken();

   //option for cookies
   const options = {
    expires:new Date(Date.now() + process.env.EXPIRE_COOKIE * 24*60*60*1000),
    httpOnly:true  
}

    const safeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };


res.status(statusCode)
.cookie('token',token,options)
.json({
    success:true,
    
    user : safeUser,
    
    token
})
} 