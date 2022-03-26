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
const registerDoctor=require('./routes/registerDoctor.js')
const registerStaff=require('./routes/registerStaff.js')
const getData=require('./routes/getData.js')
const getData2=require('./routes/getData2.js')
const addPrescription=require('./routes/addPrescription.js')
const updateTest=require('./routes/updateTest.js')
const updatePharmacy=require('./routes/updatePharmacy.js')
const getPharmacy=require('./routes/getPharmacy.js')
const resetPassword=require('./routes/resetPassword.js')
const getData3=require('./routes/getData3.js')
const addMedicine=require('./routes/addMedicine.js')
const resetPasswordAdmin=require('./routes/resetPasswordAdmin.js')
const resetPersonalDetailsDoctor=require('./routes/resetPersonalDetailsDoctor.js')
const resetPersonalDetailsStudent=require('./routes/resetPersonalDetailsStudent.js')
const resetPersonalDetailsStaff=require('./routes/resetPersonalDetailsStaff.js')
const addTest=require('./routes/addTest.js')
const getTest=require('./routes/getTest.js')


app.use('/',login);
app.use('/',registerStudent)
app.use('/',registerDoctor)
app.use('/',registerStaff)
app.use('/',getData)
app.use('/',getData2)
app.use('/',addPrescription)
app.use('/',updateTest)
app.use('/',updatePharmacy)
app.use('/',getPharmacy)
app.use('/',resetPassword)
app.use('/',getData3)
app.use('/',addMedicine)
app.use('/',resetPasswordAdmin)
app.use('/',resetPersonalDetailsStudent)
app.use('/',resetPersonalDetailsDoctor)
app.use('/',resetPersonalDetailsStaff)
app.use('/',addTest)
app.use('/',getTest)


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
