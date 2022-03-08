const express=require('express');
const updateTest=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2');

updateTest.use(cors());

updateTest.use(bodyParser.json());
updateTest.use(bodyParser.urlencoded({extended:false}));

updateTest.post('/updateTest', (req,res)=>{
    
    async function update(data){

        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="UPDATE health.investigation SET result=? WHERE prescriptionID=? and testID=?;";
                index.db.query(sqlQuery,[data["result"],data["prescriptionID"],data["testID"]],(err,result)=>{
                    if(err) throw(err)
                    else console.log(result)
                })
            }
        })
        res.send({
            status:"OK"
        });
        return 0;
    }
    passwdHash=update(req.body);
    
});

module.exports=updateTest;