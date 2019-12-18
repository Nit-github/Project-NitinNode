const express=require("express");
const postgreysql=require("./Postgreysql.js");
const hashedpassword=require("./hashedpassword.js");
const router=express.Router();
const path=require("path");

router.get('/',function(req,res){  
  res.sendFile(path.resolve(__dirname+"/../","Html","login.html"))
})

router.post('/userlogin',async function(req,res){        
    var query=`select * from usermst where Isactive=1 and right(Mobileno,10)=$1`;
    const params = [];  
    try{
      params.push(`${req.body.UID}`);      
        let result = await postgreysql.FetchQuery(query,params);
        let finalresult="No User Found!";
        if(result.rowCount==1)
        {
          if(hashedpassword.verifyhashpwd(req.body.PWD,result.rows[0].upwd))
          {
          req.session.uuid = result.rows[0].uuid;         
          finalresult="/user";
          }else
          {
            finalresult="Incorrect Password!";
          }
        }                
      return res.send(finalresult); 
    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
})
module.exports= router
