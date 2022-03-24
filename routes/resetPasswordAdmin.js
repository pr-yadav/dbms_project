const express=require('express');
const reset=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')
const jwt = require('jsonwebtoken')
reset.use(cors());

reset.use(bodyParser.json());
reset.use(bodyParser.urlencoded({extended:false}));

reset.post('/resetPasswordAdmin', (req,res)=>{    
    async function passwdHashGenerate(data){
        try{
            const decoded = jwt.verify(data["token"], "hello");
            console.log("Password reset request by : "+decoded["userID"])
            tmp=await bcrypt.hash(data['password'],saltRounds);
            var typeS = JSON.stringify(data["userType"]);
            var typeD = JSON.parse(typeS);
            index.db.connect((err)=>{
                if(err) throw err;
                else{
                    if(typeD==0){
                        sqlQuery="UPDATE health.student SET password=? WHERE studentID=?"
                        values=[tmp,parseInt(data["userID"])];
                    }
                    else if(typeD==1){
                        sqlQuery="UPDATE health.doctor SET password=? WHERE doctorID=?"
                        values=[tmp,parseInt(data["userID"])];
                    }
                    else if(typeD==2){
                        sqlQuery="UPDATE health.staff SET password=? WHERE staffID=?"
                        values=[tmp,parseInt(data["userID"])];
                    }
                    
                    index.db.query(sqlQuery,values,(err,result)=>{
                        if(err) throw(err)
                        else{
                            console.log("Password reset for : "+data["userID"]+" by Admin")
                        }
                    })
                }
            })
            res.send({
                status:200,
            })
            return tmp;
        }
        catch(error){
            console.log(error)
            console.log("Someone tried to hack!!")
            res.status(403)
            res.send({
                status:403,
                token:"JWT tampered"
            })
        }
    }
    passwdHash=passwdHashGenerate(req.body);
    
});

module.exports=reset;