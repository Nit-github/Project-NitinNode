const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.pgun,
    host: process.env.pghost,
    database: process.env.pgdb,
    password: process.env.pgpwd,
    port: process.env.pgport,
    ssl:true
  })
  
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
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release()
              }

//or

//             client.connect()
//   client.query(query, (err, res) => {
//     console.log(err, res)    
//     client.end()
//     resolve(res);
//   })
    })
}
module.exports={executequery}