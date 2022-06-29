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
module.exports = config;