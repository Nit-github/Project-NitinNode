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
            let result = await postgreysql.FetchQuery(query,params);        
            if(result.rowCount==1)
            {
                res.render('userdetailsedit.ejs', {data:result.rows});
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

router.post('/useredit',async function(req,res){ 
try{
    if(req.session.uuid!=null){
        var query=`update usermst set UName=$2,mobileno=$3,emailid=$4,address=$5,updatedate=CURRENT_TIMESTAMP where Isactive=1 and uuid=$1`;
        const params = [];
        params.push(`${req.session.uuid}`);
        params.push(`${req.body.UName}`);
        params.push(`${req.body.Mob}`);
        params.push(`${req.body.Email}`);
        params.push(`${req.body.Address}`);
        let result = await postgreysql.InsertQuert(query,params);  
        //console.log(result);             
        if(result=="OK")
        {     
             res.send("/user");            
        }
        else{
           res.send("/logout");
        }   
    }else
    {
        res.send("/logout");
    }
}catch(err)
{
    console.log(err);
    res.status(401).send(err);
}
});
            
module.exports=router