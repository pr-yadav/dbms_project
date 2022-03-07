const http = require('http');
const express=require('express');
const app =express();
const hostname='localhost';
const port=12345;
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const cors_proxy = require('cors-anywhere');
const cors = require('cors');
app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const login=require('./routes/login.js');
const registerStudent=require('./routes/registerStudent.js')

app.use('/',login);
app.use('/',registerStudent)


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/dashboard');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });



const db=mysql.createConnection({
    user:"cs315",
    host:"localhost",
    password:"Cs315_health_booklet",
    databse:"health",
    port:"3306"
});
const server=app.listen(port,hostname,()=>{
    console.log('Server running at http://localhost:12345');
});

exports.db=db;
