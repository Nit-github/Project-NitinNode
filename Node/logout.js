const express=require("express");
const router=express.Router();
const path=require("path");

router.get('/',function(req,res){    
    res.clearCookie('uuid');        
    res.sendFile(path.resolve(__dirname+"/../","Html","logout.html"))
    })

module.exports= router