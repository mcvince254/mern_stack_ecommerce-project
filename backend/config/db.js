import mongoose from 'mongoose'

export  const connectMongoDataBase =()=>{
    mongoose.connect(process.env.MONGODB_URI,{dbName:'onlinestore'})
.then((data)=>{
console.log(`mongodb connected with server ${data.connection.host}`)
})
}
 