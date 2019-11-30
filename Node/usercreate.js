const express=require("express");
const postgreysql=require("./Postgreysql.js");
const router=express.Router();

router.get('/',function(req,res){
    res.sendfile("Html/usercreate.html");
    })

router.post('/create',async function(req,res){ 
    try{        
            var query=`Insert into usermst(uname,mobileno,emailid,address) values($1,$2,$3,$4) `;
            const params = [];            
            params.push(`${req.body.UName}`);
            params.push(`${req.body.Mob}`);
            params.push(`${req.body.Email}`);
            params.push(`${req.body.Address}`);
            let result = await postgreysql.InsertQuert(query,params);  
            console.log(result);
            res.send(result);                              
    }catch(err)
    {
        console.log(err);
        res.status(401).send(err);
    }
});

module.exports= router