const express=require('express')
const router=express.Router()



router.use('/admin',require('./admin.js'))
 router.use('/employe',require('./employe.js'))
module.exports=router