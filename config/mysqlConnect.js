var mysql = require('mysql');

var db = initializePool();

function initializePool() {
    return mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_SCHEMA
    })
}

module.exports = {
    mysqlcon: db
}