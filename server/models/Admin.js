const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const secret='chandankohar123'
const adminSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true,
   },
   email:{
    type:String,
    require:true,
    unique:true,
   },
   password:{
    type:String,
    require:true,
   }
})

adminSchema.pre('save',async function (next) {
if(this.isModified('password')){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
}
})

adminSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},secret)
}
adminSchema.methods.verifyadminpassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin

