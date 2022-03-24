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

registerStaff.post('/resetPersonalDetailsStaff', (req,res)=>{
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
                    sqlQuery="UPDATE health.staff SET name=?, mobile=?, department=?, address=? WHERE staffID=?;";
                    values=[data['name'],parseInt(JSON.parse(data['mobile'])),data['dept'],data["address"],data['staffID']];
                    index.db.query(sqlQuery,values,(err,result)=>{
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
                                console.log("Personal Details of staff with ID : "+data['staffID']+" changed")
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

module.exports=registerStaff;