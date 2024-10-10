const Employe = require("../models/Employe")
const cloudinary=require('cloudinary')
exports.getAllEmploye=async(req,res)=>{
  try{
const employe=await Employe.find()

return res.status(200).json(employe)
  }
  catch(err){
      
      return res.status(500).json({success:false,message:'internal server error'})
  }

}
exports.addEmploye=async(req,res)=>{
    try{
        const {username,email,contact,designation,gender,course,image}=req.body
        if(!username || !email || !contact || !designation || !gender || !course || !image){
            return res.status(400).json({success:false,message:'all crediencial is required'})
        }
        let employe=await Employe.findOne({email})
        if(employe){
            return res.status(400).json({
                success:false,
                message:'employe already exist'
            })
        }
        employe=await Employe.create({
            name:username,email,contact,designation,gender,course,image,
        })
        
        return res.status(200).json({
            success:true,
           message:'Employe added successfully '
        })
    
    }
    catch(err){
        
        return res.status(500).json({success:false,message:'internal server error'})
    }
    
}
exports.updateEmploye=async(req,res)=>{
  const {id}=req.params
 
  const {username,email,contact,designation,gender,course,image}=req.body
  console.log(req.body)
  try{
    
    if(!username || !email || !contact || !designation || !gender || !course || !image){
        return res.status(400).json({success:false,message:'all crediencial is required'})
    }
    let employe=await Employe.findById(id)
    if(!employe){
        return res.status(400).json({
            success:false,
            message:'employe not exist'
        })
    }
    
    employe=await Employe.findByIdAndUpdate(id,{
        name:username,email,contact,designation,gender,course,image,
    })
    
    
    return res.status(200).json({
        success:true,
       message:'Employe update successfully '
    })

}
catch(err){
    
    return res.status(500).json({success:false,message:'internal server error'})
}

    
}
exports.deleteEmploye=async(req,res)=>{
  const {id}=req.params
  try{
    const employe=await Employe.findByIdAndDelete(id)
    if(!employe){
      return res.status(400).json({
          success:false,
          message:'Employ donot exist'
      })}
    
    return res.status(200).json({success:true,message:'successfully delete the employee'})
      }
      catch(err){
          
          return res.status(500).json({success:false,message:'internal server error'})
      }

    
}
exports.searchEmploye=async(req,res)=>{
  try {
    const searchword = req.params.key;

    if (searchword === '' || searchword.length <=1) return res.status(200).json(await Employe.find())

    const searchMatches = await Employe.find({ name: { $regex: searchword, $options: "i" } })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
    
}
exports.uploadPicture = async (req, res) => {
    const { path } = req.file
    
    try {
      let result = await cloudinary.uploader.upload(path, {
        folder: 'Airbnb/Users',
      });
      
      res.status(200).json(result.secure_url)
    } catch (error) {
        console.log(error)
      res.status(500).json({
        
        error,
        message: 'Internal server error',
      });
    }
  }

  exports.singleEmploye = async (req, res) => {
    try {
      const { id } = req.params;
      const employe = await Employe.findById(id);
      if (!employe) {
        return res.status(400).json({
          message: 'Employe not found',
        });
      }
      res.status(200).json({
        employe,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal serever error',
      });
    }
  };
  
  
