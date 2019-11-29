const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.pgun,
    host: process.env.pghost,
    database: process.env.pgdb,
    password: process.env.pgpwd,
    port: parseInt(process.env.pgport),
    ssl:true
  })
  
function executequery(query,params){
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
module.exports={executequery}
console.log("hello india");
