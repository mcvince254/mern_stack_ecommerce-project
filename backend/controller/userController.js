import User from '../models/userModel.js';
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middleWare/handleAsyncError.js';
import { sendToken } from '../utils/jwtToken.js';
import jwt from 'jsonwebtoken'
import { hashPassword } from '../utils/hashPassword.js';
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail.js';
import fs, { writeFile } from 'fs';
import { verifyUserAuth } from '../middleWare/userAuth.js';

export const registerUser = handleAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword);
    
    
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        avator:{
            public_id:"Temp id",
            url:"Temp url"
        }
    });
    console.log(user)
    const token = user.getJWTToken()
    sendToken(user,200,res)
    }); 


export const loginUser = (handleAsyncError(async (req,res,next) => {
        const {email,password} = req.body;
        if(!email || !password){
            return next(new HandleError('Password/Email cannot be empty', 400))
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new HandleError('Invalid Email or Password',401))
        }

        const isPasswordValid = await user.verifyPassword(password);

        if(!isPasswordValid){
              return next(new HandleError('Invalid Email or Password',401))
        }
      
        sendToken(user,200,res)


    }));


    // Logout

export const logoutUser = handleAsyncError(async(req,res,next)=>{
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({
            success:true,  
            message:"Logout Successfully"
        })
    })

//Forgot Password
export const requestPasswordReset = handleAsyncError(async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        return next(new HandleError("User does not exist",400))
    }
    let resetToken
  
    try {
        resetToken = await user.generatePasswordResetToken();
    await user.save({validateBeforeSave:false});
   
    } catch (error) {
      return next(new HandleError(error.message,500))
      
    }


    const resetPasswordURL = `http://localhost:4300/api/v1/reset/${resetToken}`
    const message = `use the following link to reset your password : ${resetPasswordURL}`
   
 //send email
    
            try{

        
                    await sendEmail ({
                        email:user.email, 
                        subject:'Password reset Request',
                        message
                    })
                    res.status(200).json({
                        success:true,
                        message:`Email is sent to ${user.email} succesfully`
                    })
            }

            catch(error){
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpire = undefined;
                    await user.save({validateBeforeSave:false});
                    console.log(error)
                    return next(new HandleError('Email could not be sent.Please try again later',500))

                    }
        });

// passwordreset
   
export const resetPassword = (handleAsyncError(async (req,res,next) => {
       const resetToken = req.params.token;
       const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
       console.log(resetToken,resetPasswordToken)
       const user = await User.findOne({resetPasswordToken,
                                  resetPasswordExpire:{$gt:Date.now()}
                                 }
                                
    );
     console.log(user)
    
        if(!user){
            return next(new HandleError("invalid Token or expired Token",400));
        }
        const {password,confirmpassword} = req.body;
        if(password !== confirmpassword){
                return next(new HandleError("passwords do not match",500));
        }
        console.log("found user")
        const hashedPassword =  await hashPassword(password);
     
       user.password = hashedPassword;
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined
      await user.save()
      sendToken(user,200,res)
  

    }));

export const getUserDetails = handleAsyncError(async(req,res,next)=>{
     const user = await User.findOne(req.user._id);
    
    try {
             if(!user){
        return next(new HandleError(error.message,400));
     }
       res.json({
        success:true,
        user
       })
        
    } catch (error) {
        console.log(error)
    }
   
})

