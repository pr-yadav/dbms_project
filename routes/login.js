const express=require('express');
const login=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt')

login.use(cors());

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({extended:false}));

login.post('/login', (req,res)=>{
    data=req.body
    index.db.connect((err)=>{
        if(err) throw err;
        else{
            var s = JSON.stringify(data["username"]);
            var d = JSON.parse(s);
            sqlQuery="SELECT password FROM health.student WHERE studentID=?"
            index.db.query(sqlQuery,[parseInt(d)],(err,result)=>{
                if(err){
                    throw err
                }
                if(result.length==0){
                    res.send("User not registered")
                }
                else{
                    
                    if(bcrypt.compareSync(data["password"],result[0]["password"])){
                        res.send({
                            token:d
                        });
                        console.log(parseInt(d))
                    }
                    console.log(typeof parseInt(d))
                }
            })
        }
    })
});

module.exports=login;