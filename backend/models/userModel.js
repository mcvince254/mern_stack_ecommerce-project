import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";
import validator from 'validator'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "name is required"],
        maxLength:[30,"name cannot exceed 30 characters"]
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:[validator.isEmail,"Please eter a valid email"]// to install validator later
       },
    password:{
        type:String,
        required:[true,"email is required"],
        minLength:[8,"Password should be 8 characters or more"],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            required:false
        }
    },
    role:{
        type:String,
        default:"user"
    },

   resetPasswordToken:String,
   resetPasswordExpire:Date,
},
{timestamp:true});
//Password hashing ****This method is buggy **** i will hash the password from controller itself(utils) then sort it later
// userSchema.pre('save',async function(next){ 
//     if(!this.isModified("password")){
//          return next();
     
//     }
//     this.password = await bcryptjs.hash(this.password,10);
//     next();
     
// });

userSchema.methods.verifyPassword = async function(userEnteredPassword){
return await bcryptjs.compare(userEnteredPassword,this.password)
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({
        id:this._id},process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})

}
//generating token
userSchema.methods.generatePasswordResetToken =async function(){
   const resetToken = crypto.randomBytes(20).toString('hex'); 
   
   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   this.resetPasswordExpire = Date.now() + 1000*60 * 30;
   console.log(resetToken,this.resetPasswordToken) 
   return resetToken

}

export default mongoose.model("User",userSchema)

//______________________________________________________________


