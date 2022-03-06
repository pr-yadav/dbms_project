const express=require('express');
const login=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');

login.use(cors());

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({extended:false}));

login.post('/login', (req,res)=>{
    // index.db.execute(
    //     "SELECT * FROM student WHERE studentID=? AND `password`=?",[id,password],(err,result)=>{
    //         if(err){
    //             res.end("Something bad happened");
    //         }
    //         else{
    //             res.end(result);
    //         }
    //     }
    // );
    console.log(req.body);
    res.send({
        token:'test123'
    });
});

module.exports=login;