const express=require('express');
const registerStudent=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const saltRounds=1;
const mysql=require('mysql2')
const jwt=require('jsonwebtoken')

registerStudent.use(cors());

registerStudent.use(bodyParser.json());
registerStudent.use(bodyParser.urlencoded({extended:false}));

registerStudent.post('/resetPersonalDetailsStudent', (req,res)=>{

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
                    sqlQuery="UPDATE health.student SET name=?, mobile=?, address=? WHERE studentID=?;";
                    console.log(data)
                    values=[data['name'],parseInt(JSON.parse(data['mobile'])),data['address'],data['studentID']];
                    index.db.query(sqlQuery,values,(err,result)=>{
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
                            if(result["affectedRows"]==0){
                                res.status(404)
                                res.send({
                                    status:404,
                                    data:"Entry not found"
                                });
                                console.log("Tried to change personal details but entry not found")
                            }
                            else{
                                res.status(200)
                                res.send({
                                    status:200
                                });
                                console.log("Personal Details of Student with ID : "+data['studentID']+" changed")
                            }
                        }
                    })
                }
            })
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

module.exports=registerStudent;