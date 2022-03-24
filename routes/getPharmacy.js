const express=require('express');
const getPharmacy=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');

getPharmacy.use(cors());

getPharmacy.use(bodyParser.json());
getPharmacy.use(bodyParser.urlencoded({extended:false}));

getPharmacy.post('/getPharmacy', (req,res)=>{
    // data=JSON.parse(req.body);
    console.log("Request made to get pharmacy status")
    async function getData(data,callback){
        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="SELECT medicine.medicineID,`name`,availability\
                FROM health.pharmacy \
                INNER JOIN health.medicine \
                ON medicine.medicineID=pharmacy.medicineID"
                index.db.query(sqlQuery,[data["id"]],(err,result)=>{
                    if(err) throw(err)
                    else{
                        return callback(null,result)
                    }
                })
            }
        })
    }
    function comp(){
        getData(req.body,(err,result)=>{
            res.send(result)
        })
        
    }
    comp() 
});

module.exports=getPharmacy;