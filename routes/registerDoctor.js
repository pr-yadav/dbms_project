const express=require('express');
const login=express.Router();
const index=require('../index');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
const saltRounds=1;
const mysql=require('mysql2')

login.use(cors());

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({extended:false}));

login.post('/registerDoctor', (req,res)=>{
    // data=JSON.parse(req.body);
    
    async function passwdHashGenerate(data){
        tmp=await bcrypt.hash(data['password'],saltRounds);
        console.log(tmp);
        // index.db.execute(
        //     "INSERT INTO student VALUES(?,?,?,?,?)",[data['username'],tmp,data['name'],data['mobile'],data['address']],(err,result)=>{
        //         if(err){
        //             res.end("Something bad happened");
        //         }
        //         else{
        //             res.end(result);
        //         }
        //     }
        // ),(err,result)=>{
        //     console.log(err)
        // };
        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="INSERT INTO health.doctor VALUES (?);";
                values=[data['username'],tmp,data['name'],data['mobile'],data['address']];
                index.db.query(sqlQuery,[values],(err,result)=>{
                    if(err) throw(err)
                    else console.log(result)
                })
            }
        })
        res.send({
            status:"OK"
        });
        return tmp;
    }
    passwdHash=passwdHashGenerate(req.body);
    
});

module.exports=login;