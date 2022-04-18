const express=require('express');
const geData=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');
const jwt=require('jsonwebtoken')
geData.use(cors());

geData.use(bodyParser.json());
geData.use(bodyParser.urlencoded({extended:false}));

geData.post('/getData2', (req,res)=>{
    console.log("Request made by jwt : ",req.body)
    async function getPrescriptionID(data,callback){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            if(decoded["userType"]>1){
                console.log("Admin/Staff tried to see medicl history")
                res.status(403)
                res.send({
                status:403,
                data:"Only student and doctor allowed to see history"
                })
            }
            else if(decoded["userType"]==0){
                index.db.connect((err)=>{
                    if(err) throw err;
                    else{
                        sqlQuery="SELECT health.prescription.prescriptionID,`name`,result,`time` FROM\
                        (SELECT prescriptionID,`name`,result FROM\
                        (SELECT * FROM health.investigation WHERE prescriptionID IN(SELECT prescriptionID FROM health.prescription WHERE studentID=?)) AS tmp\
                        INNER JOIN\
                        health.test ON test.testID=tmp.testID) AS tmp2\
                        INNER JOIN\
                        health.prescription ON prescription.prescriptionID=tmp2.prescriptionID ORDER BY prescriptionID DESC;";
                        index.db.query(sqlQuery,[decoded["userID"]],(err,result)=>{
                            if(err) throw(err)
                            else{
                                return callback(null,result)
                            }
                        })
                    }
                })
            }
            else{
                index.db.connect((err)=>{
                    if(err) throw err;
                    else{
                        sqlQuery="SELECT health.prescription.prescriptionID,`name`,result,`time` FROM\
                        (SELECT prescriptionID,`name`,result FROM\
                        (SELECT * FROM health.investigation WHERE prescriptionID IN(SELECT prescriptionID FROM health.prescription WHERE studentID=?)) AS tmp\
                        INNER JOIN\
                        health.test ON test.testID=tmp.testID) AS tmp2\
                        INNER JOIN\
                        health.prescription ON prescription.prescriptionID=tmp2.prescriptionID ORDER BY prescriptionID DESC;";
                        index.db.query(sqlQuery,[data["studentID"]],(err,result)=>{
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
            console.log("Someone tried to hack!!")
            res.status(403)
            res.send({
                status:403,
                data:"Forbidden"
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

module.exports=geData;