const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.pgun,
    host: process.env.pghost,
    database: process.env.pgdb,
    password: process.env.pgpwd,
    port: parseInt(process.env.pgport),
    ssl:true
  })
  
function FetchQuery(query,params){
  //console.log(query,params);
    return new Promise(async function(resolve,reject)
    {    
            const client = await pool.connect()
            try {
              const res = await client.query(query,params)            
              return resolve(res);
            }
             catch(err) {
                 console.log(err);
                return reject(err);              
            } finally {              
                client.release()
              }
    })
}
function InsertQuert(query,params){
  return new Promise(async function(resolve,reject)
  {
    const client = await pool.connect()
    client.query(query,params,function(err,result){
      if (err) {  
        console.log(err);      
        reject(err);
    } else {    
      console.log("OK");    
        //resolve("OK");
    }        
    })
  })
}

module.exports={FetchQuery,InsertQuert}
console.log("hello india");
