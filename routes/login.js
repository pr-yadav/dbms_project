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
        if(err){
            res.status(500)
            res.send({
                status:500,
                token:"Internal Error"
            })
            throw err;
        }
        else{
            var s = JSON.stringify(data["username"]);
            var d = JSON.parse(s);
            var typeS = JSON.stringify(data["userType"]);
            var typeD = JSON.parse(typeS);
            if(typeD==0){
                sqlQuery="SELECT password FROM health.student WHERE studentID=?"
                d=parseInt(d)
            }
            else if(typeD==1){
                sqlQuery="SELECT password FROM health.doctor WHERE doctorID=?"
                d=parseInt(d)
            }
            else if(typeD==2){
                sqlQuery="SELECT password FROM health.staff WHERE staffID=?"
                d=parseInt(d)
            }
            else{
                sqlQuery="SELECT password FROM health.admin WHERE username=?"
            }
            try{
                index.db.query(sqlQuery,[d],(err,result)=>{
                    if(err){
                        res.status(403)
                        res.send({
                            status:403,
                            token:"User Not found"
                        })
                        console.log(err)
                    }
                    if(result.length==0){
                        res.status(403)
                        res.send({
                            status:403,
                            token:"User Not found"
                        })
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
                                status:200,
                                token:token
                            });
                        }
                        else{
                            res.status(403)
                            res.send({
                                status:403,
                                token:"Incorrect Password"
                            })
                        }
                    }
                })
            }
            catch(err){
                res.status(403)
                res.send({
                    status:403,
                    token:"User Not found"
                })
                console.log(err)
            }
            
        }
    })
});

module.exports=login;