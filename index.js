const express=require('express');
require("dotenv").config();
const dbConnection = require('./src/config/dbconfig');
const router = require('./src/route');
const app=express()

const port=process.env.PORT ||4000

dbConnection()
app.use(router)


app.listen(port,()=>{
    console.log(`Server is Running Port Number ${port}`);
    
})