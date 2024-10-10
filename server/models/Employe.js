const mongoose =require("mongoose")

const employeSchema=new mongoose.Schema({
    name:{
     type:String,
     require:true,
    },
    email:{
     type:String,
     require:true,
     unique:true,
    },
    contact:{
        type:String,
        require:true,
       },
    designation:{
        type:String,
        require:true,
       },
    gender:{
        type:String,
        require:true,
       },
    course:{
        type:String,
        require:true,
       },
    image:{
        type:String,
        require:true,
       },
    date:{
        type:Date,
        require:true,
        default:Date.now(),
       },

   
 })

 const Employe=mongoose.model('Employe',employeSchema)
 module.exports=Employe
 