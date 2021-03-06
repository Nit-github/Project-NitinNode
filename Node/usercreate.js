const express=require("express");
const postgreysql=require("./Postgreysql.js");
const hashedpassword=require("./hashedpassword.js");
const router=express.Router();
const path=require("path");

router.get('/',function(req,res){    
    res.sendFile(path.resolve(__dirname+"/../","Html","usercreate.html"))
})

router.post('/create',async function(req,res){ 
    try{        
            let pwd= hashedpassword.hashpwd(`${req.body.Pwd}`);        
            var query=`Insert into usermst(uname,mobileno,emailid,address,upwd) values($1,$2,$3,$4,$5) `;
            const params = [];            
            params.push(`${req.body.UName}`);
            params.push(`${req.body.Mob}`);
            params.push(`${req.body.Email}`);
            params.push(`${req.body.Address}`);            
            params.push(pwd);
            let result = await postgreysql.InsertQuert(query,params);          
            res.send(result);                              
    }catch(err)
    {
        console.log(err.detail);
        res.status(401).send("Something went wrong! Please try after some time.");
    }
});

module.exports= router