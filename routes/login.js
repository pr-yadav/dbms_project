const express=require('express');
const login=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
            var typeS = JSON.stringify(data["userType"]);
            var typeD = JSON.parse(typeS);
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
                        const token = jwt.sign(
                            { userID:d, userType:typeD },
                            "hello",
                            {
                              expiresIn: "1h",
                            }
                        );
                        res.send({
                            token:token
                        });
                    }
                }
            })
        }
    })
});

module.exports=login;