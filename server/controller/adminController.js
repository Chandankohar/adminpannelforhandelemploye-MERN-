const Admin = require("../models/Admin")

exports.register=async(req,res)=>{
try{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(400).json({success:false,message:'name email and password is required'})
    }
    let admin=await Admin.findOne({email})
    if(admin){
        return res.status(400).json({
            success:false,
            message:'User already exist'
        })
    }
    admin=await Admin.create({
        name:username,email,password,
    })
    const token=await admin.getJwtToken()
    admin.password = undefined;
    return res.status(200).json({
        success:true,
        token:token,
        admin:admin,
    })

}
catch(err){
    
    return res.status(500).json({success:false,message:'internal server error'})
}
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body
       
        if(!email || !password){
            return res.status(400).json({message:' email and password is required'})
        }
        const admin=await Admin.findOne({email})
       
        if(!admin){
            return res.status(401).json({
                success:false,
                message:'Email doesnot exist exist'
            })
        }

        const verification= await admin.verifyadminpassword(password)
        if(!verification){
            return res.status(401).json({
                success:false,
                message:'please enter valid credencial',
            })
        }
       
    const token=await admin.getJwtToken()
    admin.password = undefined;
    return res.status(200).json({
        success:true,
        token:token,
        admin:admin,
    })
     
    }
    catch(err){
          return res.status(500).json({message:'internal server error'})
    }
    }
    