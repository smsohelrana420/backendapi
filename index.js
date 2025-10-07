const express=require('express');
require("dotenv").config();
const dbConnection = require('./src/config/dbconfig');
const router = require('./src/route');
const errorHandlingMiddleware = require('./src/utils/errorHandling');
const pathNotFound = require('./src/utils/pathNotFound');
const app=express()

const port=process.env.PORT ||4000
app.use(express.json())
// database connection
dbConnection()
app.use(router)

// page not found middleware
app.use(pathNotFound)

app.use(errorHandlingMiddleware)

app.listen(port,()=>{
    console.log(`Server is Running Port Number ${port}`);
    
})