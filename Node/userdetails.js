const express=require("express");
const postgreysql=require("./Postgreysql.js");
const router=express.Router();
const path=require("path");

router.get('/',async function(req,res){
try{
    if(req.session.uuid!=null)
    {           
        var query=`select * from usermst where Isactive=1 and uuid=$1`;
        const params = [];
        params.push(`${req.session.uuid}`);
        let result = await postgreysql.FetchQuery(query,params);        
        if(result.rowCount==1)
        {
            res.render('userdetails.ejs', {data:result.rows});
        }
        else{            
            res.sendFile(path.resolve(__dirname+"/../","Html","logout.html"))
        }                     
    }else
    {
        res.sendFile(path.resolve(__dirname+"/../","Html","logout.html"))
    }
}catch(err)
{
    console.log(err);
        res.status(401).send(err);
}
    })



module.exports=router