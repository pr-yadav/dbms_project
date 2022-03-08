const express=require('express');
const updatePharmacy=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2');

updatePharmacy.use(cors());

updatePharmacy.use(bodyParser.json());
updatePharmacy.use(bodyParser.urlencoded({extended:false}));

updatePharmacy.post('/updatePharmacy', (req,res)=>{
    
    async function update(data){

        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="UPDATE health.pharmacy SET availability=? WHERE medicineID=?;";
                index.db.query(sqlQuery,[data["availability"],data["medicineID"]],(err,result)=>{
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

module.exports=updatePharmacy;