const http = require('http');
const express=require('express');
const app =express();
const hostname='localhost';
const port=12345;
const mysql=require('mysql2');

const login=require('./routes/login.js');

app.use('/',login);

const db=mysql.createConnection({
    user:"cs315",
    host:"localhost",
    password:"Cs315_health_booklet",
    databse:"health",
    port:"3306"

});
app.get("/login",(req,res)=>{
    res.json({message:"msldkml"});
});

const server=http.createServer(app).listen(port,hostname,()=>{
    console.log('Server running at http://localhost:12345');
});

