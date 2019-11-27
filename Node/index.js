require('dotenv').config()
const express=require("express");
const postgreysql=require("./Postgreysql");
const bodyparser=require("body-parser");

var app=express();
app.use(bodyparser.json());

app.get('/',function(req,res){
res.sendfile("Html/login.html");
})

app.post('/login',async function(req,res){
    var query=`select * from usermst where Isactive=1 and right(Mobileno,10)='${req.body.UID}'`;
    try{
        let result = await postgreysql.executequery(query);
        console.log(result);
      return res.send(result); 
    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
})

const port = process.env.PORT || 4000;
app.listen(port,function(){
  console.log("Started on PORT "+port);
})