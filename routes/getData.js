const express=require('express');
const geData=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');

geData.use(cors());

geData.use(bodyParser.json());
geData.use(bodyParser.urlencoded({extended:false}));

geData.post('/getData', (req,res)=>{
    // data=JSON.parse(req.body);
    console.log("Request made by studentID : ",req.body)
    async function getPrescriptionID(data,callback){
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
                index.db.query(sqlQuery,[data["id"]],(err,result)=>{
                    if(err) throw(err)
                    else{
                        return callback(null,result)
                    }
                })
            }
        })
    }
    // async function getPrescription_desc(data,callback){
    //     index.db.connect((err)=>{
    //         if(err) throw err;
    //         else{
    //             sqlQuery="SELECT * FROM health.prescription_desc WHERE prescriptionID=?";
    //             index.db.query(sqlQuery,data,(err,result)=>{
    //                 if(err) throw(err)
    //                 else{
    //                     return callback(null,result)
    //                 }
    //             })
    //         }
    //     })
    // }
    function comp(){
        getPrescriptionID(req.body,(err,prescriptionID)=>{
            console.log(prescriptionID)
            res.send(prescriptionID)
        })
        
    }
    comp() 
});

module.exports=geData;