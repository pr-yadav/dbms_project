const express=require('express');
const geData=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');

geData.use(cors());

geData.use(bodyParser.json());
geData.use(bodyParser.urlencoded({extended:false}));

geData.post('/getData2', (req,res)=>{
    console.log("Request made by studentID : ",req.body)
    async function getPrescriptionID(data,callback){
        try{
            const decoded = jwt.verify(data["token"], "hello");
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