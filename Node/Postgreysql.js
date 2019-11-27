const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.pgun,
    host: process.env.pghost,
    database: process.env.pgdb,
    password: process.env.pgpwd,
    port: process.env.pgport,
    ssl:true
  })
  
function Temp(){
	return "hello";
}

function executequery(query){
    return new Promise(async function(resolve,reject)
    {    
            const client = await pool.connect()
            try {
              const res = await client.query(query)            
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
