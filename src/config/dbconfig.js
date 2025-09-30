const { default: mongoose } = require("mongoose");

const dbConnection=()=>{
   mongoose.connect(
     `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yo5gzdq.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority&appName=Cluster0`
   ).then(()=>{
    console.log("Database connection success");
    
   }).catch((err)=>{
    console.log(err);
    
   })
    
}

module.exports=dbConnection;