const express=require('express');
const updateTest=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2');
const jwt=require('jsonwebtoken')

updateTest.use(cors());

updateTest.use(bodyParser.json());
updateTest.use(bodyParser.urlencoded({extended:false}));

updateTest.post('/updateTest', (req,res)=>{
    
    async function update(data){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]!=2){
                console.log("Student/Doctor/Admin tried to register new entity")
                res.status(403)
                res.send({
                    status:403,
                    data:"Only staff allowed to update pharmacy"
                })
            }
            else{
                index.db.connect((err)=>{
                    if(err){
                        res.status(500)
                        res.send({
                            status:500,
                            data:"Internal Error"
                        })
                        console.log(err)
                    }
                    else{
                        sqlQuery="UPDATE health.investigation SET result=? WHERE prescriptionID=? and testID=?;";
                        index.db.query(sqlQuery,[data["result"],data["prescriptionID"],data["testID"]],(err,result)=>{
                            if(err){
                                res.status(404)
                                res.send({
                                    status:404,
                                    data:"Entry Not found"
                                })
                                console.log(err)
                            }
                            else{
                                if(result["affectedRows"]==0){
                                    res.status(404)
                                    res.send({
                                        status:404,
                                        data:"Entry not found"
                                    });
                                    console.log("Tried to change test result but entry not found")
                                }
                                else{
                                    res.status(200)
                                    res.send({
                                        status:200
                                    });
                                    console.log("Result of TestID : "+data["testID"]+"with Prescription ID"+data["prescriptionID"]+" changed to "+data["result"])
                                }
                            }
                        })
                    }
                })
            }
            return 0;
        }
            
        catch(err){
            console.log(err)
            console.log("Someone tried to hack!!")
            res.status(403)
            res.send({
                status:403,
                data:"JWT tampered"
            })
        }
    }
    passwdHash=update(req.body);
    
});

module.exports=updateTest;