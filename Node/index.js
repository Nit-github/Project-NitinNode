require('dotenv').config()
const express=require("express");
const session = require('express-session');
const signup=require("./usercreate.js");
const login=require("./login.js");
const uprofile=require("./userdetails.js");
const ueditprofile=require("./userdetailsedit.js");
const logout=require("./logout.js");
const bodyparser=require("body-parser");

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
app.use('/signup',signup);
app.use('/login',login);
app.use('/user',uprofile);
app.use('/logout',logout);
app.use('/edit',ueditprofile);

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