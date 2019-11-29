const express=require("express");
const postgreysql=require("./Postgreysql.js");
const router=express.Router();

router.get('/',async function(req,res){
try{
    if(req.session.uuid!=null)
    {           
        var query=`select * from usermst where Isactive=1 and uuid=$1`;
        const params = [];
        params.push(`${req.session.uuid}`);
        let result = await postgreysql.executequery(query,params);        
        if(result.rowCount==1)
        {
            res.render('userdetails.ejs', {data:result.rows});
        }
        else{
            res.sendfile("Html/logout.html");
        }                     
    }else
    {
        res.sendfile("Html/logout.html");
    }
}catch(err)
{
    console.log(err);
        res.status(401).send(err);
}
    })



module.exports=router