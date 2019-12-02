const express=require("express");
const passwordHash = require('password-hash');

function hashpwd(password){ return  passwordHash.generate(password); }
function verifyhashpwd(password,hashedpassword){ return passwordHash.verify(password, hashedpassword);}

module.exports={hashpwd,verifyhashpwd}