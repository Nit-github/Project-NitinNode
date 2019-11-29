const express=require("express");
const router=express.Router();

router.get('/',function(req,res){    
    res.clearCookie('uuid');    
    res.sendfile("Html/logout.html");
    })

module.exports= router