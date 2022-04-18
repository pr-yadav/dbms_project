const express=require('express');
const getTest=express.Router();
const index=require('../index');
const bodyParser=require('body-parser');
const cors = require('cors');
const { resolve } = require('path');

getTest.use(cors());

getTest.use(bodyParser.json());
getTest.use(bodyParser.urlencoded({extended:false}));

getTest.post('/getTest', (req,res)=>{
    // data=JSON.parse(req.body);
    console.log("Request made to get all tests")
    async function getData(data,callback){
        index.db.connect((err)=>{
            if(err) throw err;
            else{
                sqlQuery="SELECT * FROM health.test"
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

module.exports=getTest;