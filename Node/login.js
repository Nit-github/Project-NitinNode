const express=require("express");
const postgreysql=require("./Postgreysql.js");
const router=express.Router();

router.get('/',function(req,res){
  res.sendfile("Html/login.html");
  })

router.post('/user',async function(req,res){    
    //var query=`select * from usermst where Isactive=1 and right(Mobileno,10)='${req.body.UID}'`;
    var query=`select * from usermst where Isactive=1 and right(Mobileno,10)=$1 and upwd=$2`;
    const params = [];  
    try{
      params.push(`${req.body.UID}`);
      params.push(`${req.body.PWD}`);
        let result = await postgreysql.executequery(query,params);
        let finalresult="No User Found!";
        if(result.rowCount==1)
        {
          let UserName=result.rows[0].uname;
          //let UUID=result.rows[0].uuid.replace(/-/g, "");          
          req.session.uuid = result.rows[0].uuid;
          console.log(req.session);
          finalresult="/user";
        }
        //let jsonresult=JSON.stringify(result);
        //console.log(result.rowCount);
      return res.send(finalresult); 
    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
})
module.exports= router
