const express=require('express');
const login=express.Router();
const index=require('../index');
const path=require('path');

login.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','login.html'));
});

module.exports=login;