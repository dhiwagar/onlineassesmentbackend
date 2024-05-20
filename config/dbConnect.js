const {default:mongoose}=require('mongoose')
require('dotenv').config();
const dbConnect=()=>{
    try{
        const conn=mongoose.connect(process.env.MONGO_URI)

        console.log("db connection successfully");
    }
    catch(error){
        console.log("db connection Failed");

    }
}

module.exports = dbConnect;

