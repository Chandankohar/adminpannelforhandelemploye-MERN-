const mongoose=require('mongoose')
function databaseConnection(){
    
    const url='mongodb://localhost:27017/test'
     mongoose.connect(url)
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Could not connect to MongoDB', err))
}
module.exports=databaseConnection