const express=require('express');
const getData3=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');
const jwt = require('jsonwebtoken')
getData3.use(cors());

getData3.use(bodyParser.json());
getData3.use(bodyParser.urlencoded({extended:false}));

getData3.post('/getData3', (req,res)=>{
    console.log("Request made by jwt : ",req.body)
    async function getPrescriptionID(data,callback){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]==3){
                console.log("Admin  tried to see personal info")
                res.status(403)
                res.send({
                status:403,
                data:"Admin has no personal record"
                })
            }
            else{
                index.db.connect((err)=>{
                    if(err) throw err;
                    else{
                        if(decoded["userType"]==0){
                            sqlQuery="SELECT studentID,name,mobile,address FROM health.student WHERE studentID=?"
                        }
                        else if(decoded["userType"]==1){
                            sqlQuery="SELECT doctorID,name,mobile,department FROM health.doctor WHERE doctorID=?"
                        }
                        else{
                            sqlQuery="SELECT staffID,name,mobile,address,department FROM health.staff WHERE staffID=?"
                        }
                        index.db.query(sqlQuery,[decoded["userID"]],(err,result)=>{
                            if(err) throw(err)
                            else{
                                return callback(null,result)
                            }
                        })
                    }
                })
            }
        }
        catch(error){
            console.log(error)
            console.log("Someone tried to hack!!")
            res.status(403)
            res.send({
                status:403,
                data:"JWT tampered"
            })
        }
    }
    function comp(){
        getPrescriptionID(req.body,(err,prescriptionID)=>{
            res.send({
                status:200,
                data:prescriptionID
            })
        })
        
    }
    comp() 
});

module.exports=getData3;