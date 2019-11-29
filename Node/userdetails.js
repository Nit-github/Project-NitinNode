const express=require("express");
const router=express.Router();

router.get('/',function(req,res){
    if(req.session.uuid!=null)
    {           
        var data = {name:'Akashdeep'}      
        res.render('userdetails.ejs', {data:data});        
    }else
    {
        res.sendfile("Html/logout.html");
    }
    })

module.exports=router