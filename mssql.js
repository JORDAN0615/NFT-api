const sql = require("mssql")
const config = {
  user: "sa",
  password: "reallyStrongPwd123",
  database: "fruit",
  server: "localhost",
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

sql.on('error', err => {
    console.log(err.meassage)
})

async function getDB() {
    try {
     // make sure that any items are correctly URL encoded in the connection string
     let pool = await sql.connect(config)
     let result = await pool.request().query('select * from fruitlists')
     console.log(result);
     sql.close()
    } catch (err) {
      console.log(err.message);
      sql.close();
    }
}
getDB()

//reallyStrongPwd123



// const sql = require('mssql')
// const db =
//     {
//         "user": "sa",
//         "password": "reallyStrongPwd123",
//         "server": "localhost",
//         "database": "fruit"
//     };

// sql.connect(db, function (err) {
//     sql.close();
// });

// var request = new sql.Request();
// request.query("select * from fruitlists", function (err, result) {
//     console.log( result );
// });

