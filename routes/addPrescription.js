const express=require('express');
const addPrescription=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')
const jwt=require('jsonwebtoken')
 
addPrescription.use(cors());

addPrescription.use(bodyParser.json());
addPrescription.use(bodyParser.urlencoded({extended:false}));
errc=1
addPrescription.post('/addPrescription', (req,res)=>{
    data=req.body
    async function add(data){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]!=1){
                errc=0
                console.log("Student/Admin/Staff tried to add prescription")
                res.status(403)
                res.send({
                    status:403,
                    data:"Only Doctor allowed to add prescription"
                })
            }
            else{
                index.db.connect((err)=>{
                    if(err){
                        errc=0
                        console.log(err)
                        res.status(500)
                        res.send({
                            status:500,
                            data:"Internal Server Error"
                        })
                    }
                    else{
                        sqlQuery="INSERT INTO health.prescription(studentID,doctorID) VALUES(?)";
                        values=[data["studentID"],data["doctorID"]]
                        index.db.query(sqlQuery,[values],(err,result)=>{
                            prescriptionID=result.insertId
                            if(err){
                                errc=0
                                console.log(err)
                                res.status(404)
                                res.send({
                                    status:404,
                                    data:"Use correct studentID and doctorID"
                                })
                            }
                            else {
                                for (medicine in data["prescription_desc"]){
                                    dose=data["prescription_desc"][medicine]["dose"]
                                    medicineID=data["prescription_desc"][medicine]["medicineID"]
                                    sqlQuery2="INSERT INTO health.prescription_desc(prescriptionID,medicineID,dose) VALUES(?)";
                                    values=[prescriptionID,medicineID,dose]
                                    index.db.query(sqlQuery2,[values],(err,result)=>{
                                        if(err && errc){
                                            errc=0
                                            console.log(err)
                                            res.status(404)
                                            res.send({
                                                status:404,
                                                data:"Use correct medicineID"
                                            })
                                        }
                                    })
                                }

                                for (test in data["investigation"]){
                                    sqlQuery2="INSERT INTO health.investigation VALUES(?)";
                                    values=[prescriptionID,data["investigation"][test]["testID"],""]
                                    index.db.query(sqlQuery2,[values],(err,result)=>{
                                        if(err && errc){
                                            errc=0
                                            console.log(err)
                                            res.status(404)
                                            res.send({
                                                status:404,
                                                data:"Use correct testID"
                                            })
                                        }
                                    })
                                }
                            }
                            if(errc){
                                res.send({
                                    status:200
                                });
                                console.log("New Prescription added with ID : "+prescriptionID)
                            }
                        })
                        
                    }
                })
            }
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
    passwdHash=add(req.body);
    
});

module.exports=addPrescription;