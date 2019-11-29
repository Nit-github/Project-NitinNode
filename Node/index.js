require('dotenv').config()
const express=require("express");
const ejs=require("ejs");
const session = require('express-session');
const login=require("./login.js");
const uprofile=require("./userdetails.js");
const logout=require("./logout.js");
const bodyparser=require("body-parser");
const path=require("path");

var app=express();
app.set("view engine","ejs");
app.set("views","./Html");
app.use(bodyparser.json());
app.use(express.static("GlobalData",))
app.use(session({
  key: 'uuid',
  secret: process.env.sessecret,
  resave: false,
  saveUninitialized: true,
  cookie: {expires: 3600000}
}))
    app.use('/login',login);
app.use('/user',uprofile);
app.use('/logout',logout);

var sessionChecker = (req, res, next) => {  
  if (req.session.uuid) {    
      res.redirect('/user');
  } else {  
      next();
  }    
};


app.get('/',sessionChecker,function(req,res){  
  res.sendfile("Html/index.html");
})



const port = process.env.PORT || 4000;
app.listen(port,function(){
  console.log("Started on the PORT "+port);
})