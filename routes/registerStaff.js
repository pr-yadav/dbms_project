const express=require('express');
const registerStaff=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')
const jwt=require('jsonwebtoken')

registerStaff.use(cors());

registerStaff.use(bodyParser.json());
registerStaff.use(bodyParser.urlencoded({extended:false}));

registerStaff.post('/registerStaff', (req,res)=>{
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
                    sqlQuery="INSERT INTO health.staff VALUES (?);";
                    values=[data['staffID'],tmp,data['name'],data['mobile'],data['address']];
                    index.db.query(sqlQuery,[values],(err,result)=>{
                        if(err){
                            if(err["code"]=="ER_DUP_ENTRY"){
                                res.send({
                                    status:403,
                                    data:"Staff ID already exists!"
                                });
                                console.log("Staff ID already exists!")
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
                            console.log("New Staff Registered! with ID : "+data['staffID'])
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

module.exports=registerStaff;