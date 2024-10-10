const databaseConnection =require('./database/database.js')
require("dotenv").config().v2;
const cors=require('cors')
const cloudinary = require("cloudinary").v2;
const express=require('express')
const app=express()


//database connection
databaseConnection()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
  });
app.use(express.json());
app.use(cors())
app.use('/',require('./routes'))

app.listen(4000,()=>{
    console.log('listen port in 4000')
})
module.exports=app