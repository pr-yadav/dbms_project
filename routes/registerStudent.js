const express=require('express');
const registerStudent=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')
const jwt=require('jsonwebtoken')

registerStudent.use(cors());

registerStudent.use(bodyParser.json());
registerStudent.use(bodyParser.urlencoded({extended:false}));

registerStudent.post('/registerStudent', (req,res)=>{

    async function passwdHashGenerate(data){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]!=3){
                console.log("Student/Doctor/Staff tried to register new entity")
                res.status(403)
                res.send({
                    status:403,
                    data:"Only admin allowed to enter new user"
                })
            }
            tmp=await bcrypt.hash(data['password'],saltRounds);
            index.db.connect((err)=>{
                if(err){
                    console.log(err)
                    res.status(500)
                    res.send({
                        status:500,
                        data:"Internal Server Error"
                    })
                }
                else{
                    sqlQuery="INSERT INTO health.student VALUES (?);";
                    values=[data['studentID'],tmp,data['name'],data['mobile'],data['address']];
                    index.db.query(sqlQuery,[values],(err,result)=>{
                        if(err){
                            if(err["code"]=="ER_DUP_ENTRY"){
                                res.send({
                                    status:403,
                                    data:"Student ID already exists!"
                                });
                                console.log("Student ID already exists!")
                            }
                            else{
                                console.log(err)
                                res.status(500)
                                res.send({
                                    status:500,
                                    data:"Internal Server Error"
                                })
                            }
                        }
                        else {
                            res.send({
                                status:200
                            });
                            console.log("New Student Registered! with ID : "+data['studentID'])
                        }
                    })
                }
            })
            return tmp;
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
    passwdHash=passwdHashGenerate(req.body);
    
});

module.exports=registerStudent;