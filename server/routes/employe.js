const express=require('express')
const multer=require('multer')
const { getAllEmploye, addEmploye, updateEmploye, deleteEmploye, searchEmploye, uploadPicture, singleEmploye } = require('../controller/employeController')
const router=express.Router()

const upload = multer({ dest: '/tmp' });
  


router.route('/').get(getAllEmploye)
router.route('/upload-picture').post(upload.single('image',1),uploadPicture)
router.route('/addemploye').post(addEmploye)
router.route('/updateemploye/:id').put(updateEmploye)
router.route('/deleteemploye/:id').post(deleteEmploye)
router.route('/searchemploye/:key').get(searchEmploye)
router.route('/singleemploye/:id').get(singleEmploye)

module.exports = router ;