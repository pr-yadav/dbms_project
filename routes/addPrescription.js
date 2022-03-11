const express=require('express');
const addPrescription=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')

addPrescription.use(cors());

addPrescription.use(bodyParser.json());
addPrescription.use(bodyParser.urlencoded({extended:false}));

addPrescription.post('/addPrescription', (req,res)=>{
    // data=JSON.parse(req.body);
    data=req.body
    console.log(data)
    async function add(data){
        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="INSERT INTO health.prescription(studentID,doctorID) VALUES(?)";
                values=[data["studentID"],data["doctorID"]]
                index.db.query(sqlQuery,[values],(err,result)=>{
                    if(err) throw(err)
                    else {
                        prescriptionID=result.insertId
                        console.log(prescriptionID)
                        // sqlQuery="SELECT MAX(prescriptionID) FROM health.prescription";
                        // // values=[data['username'],tmp,data['name'],data['mobile'],data['address']];
                        // index.db.query(sqlQuery,(err,result)=>{
                        //     if(err) throw(err)
                        //     else {
                        //         prescriptionID=result
                        //     }
                        // })
                        // prescriptionID=prescriptionID['MAX(prescriptionID)']
                        // console.log(typeof(prescriptionID))
                        // console.log(data["medicine"])
                        // console.log(data["medicine"])
                        for (medicine in data["prescription_desc"]){
                            dose=data["prescription_desc"][medicine]["dose"]
                            sqlQuery1="SELECT medicineID from health.medicine where `name`=?"
                            values=[data["prescription_desc"][medicine]["medicineID"]]
                            index.db.query(sqlQuery1,[values],(err,result)=>{
                                if(err) throw(err)
                                else {
                                    i=0
                                    id=result[0]["medicineID"]
                                    console.log(id,dose)
                                    sqlQuery2="INSERT INTO health.prescription_desc(prescriptionID,medicineID,dose) VALUES(?)";
                                    // values=[data['username'],tmp,data['name'],data['mobile'],data['address']];
                                    values=[prescriptionID,id,dose]
                                    index.db.query(sqlQuery2,[values],(err,result)=>{
                                        if(err) throw(err)
                                        else {
                                            // console.log(result)
                                        }
                                    })
                                }
                            })
                        }

                        for (test in data["investigation"]){
                            sqlQuery1="SELECT testID from health.test where `name`=?"
                            values=[data["investigation"][test]["testID"]]
                            console.log(values)
                            index.db.query(sqlQuery1,[values],(err,result)=>{
                                if(err) throw(err)
                                else {
                                    i=0
                                    while(i<1000000)
                                        i+=1
                                    console.log(result)
                                    id=result[0]["testID"]
                                    console.log(id)
                                    sqlQuery2="INSERT INTO health.investigation VALUES(?)";
                                    // values=[data['username'],tmp,data['name'],data['mobile'],data['address']];
                                    values=[prescriptionID,id,""]
                                    index.db.query(sqlQuery2,[values],(err,result)=>{
                                        if(err) throw(err)
                                        else {
                                            // console.log(result)
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
                
                
                res.send("ok")
            }
        })
        
        // return tmp;
    }
    passwdHash=add(req.body);
    
});

module.exports=addPrescription;