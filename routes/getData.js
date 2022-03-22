const express=require('express');
const geData=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');
const jwt = require('jsonwebtoken')
geData.use(cors());

geData.use(bodyParser.json());
geData.use(bodyParser.urlencoded({extended:false}));

geData.post('/getData', (req,res)=>{
    console.log("Request made by studentID : ",req.body)
    async function getPrescriptionID(data,callback){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            index.db.connect((err)=>{
                if(err) throw err;
                else{
                    sqlQuery="SELECT health.prescription.prescriptionID,`name`,dose,`time` FROM\
                    (SELECT prescriptionID,`name`,dose FROM\
                    (SELECT * FROM health.prescription_desc WHERE prescriptionID IN(SELECT prescriptionID FROM health.prescription WHERE studentID=?)) AS tmp\
                    INNER JOIN\
                    health.medicine ON medicine.medicineID=tmp.medicineID) AS tmp2\
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
        catch(error){
            res.send("Forbidden")
        }
    }
    function comp(){
        getPrescriptionID(req.body,(err,prescriptionID)=>{
            res.send(prescriptionID)
        })
        
    }
    comp() 
});

module.exports=geData;