const express=require('express');
const addMedicine=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')
const jwt=require('jsonwebtoken')
addMedicine.use(cors());

addMedicine.use(bodyParser.json());
addMedicine.use(bodyParser.urlencoded({extended:false}));

addMedicine.post('/addMedicine', (req,res)=>{
    async function passwdHashGenerate(data){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]!=2){
                console.log("Student/Doctor/Admin tried to add new medicine")
                res.status(403)
                res.send({
                    status:403,
                    data:"Only staff allowed to add new medicine"
                })
            }
            else{
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
                        sqlQuery="INSERT INTO health.medicine(name,manufacturer) VALUES (?);";
                        values=[data['name'],data['manufacturer']];
                        try{
                        index.db.query(sqlQuery,[values],(err,result)=>{
                            if(err){
                                if(err["code"]=="ER_DUP_ENTRY"){
                                    res.send({
                                        status:403,
                                        data:"Medicine ID already exists!"
                                    });
                                    console.log("Medicine ID already exists!")
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
                                console.log("New Medicine added! with ID : "+result.insertId+" name : "+data["name"]);
                                values2=[result.insertId,0]
                                index.db.query("INSERT INTO health.pharmacy VALUES (?);",[values2])
                            }
                        })
                        }
                        catch(err){
                            console.log(err)
                        }
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
    passwdHash=passwdHashGenerate(req.body);
    
});

module.exports=addMedicine;