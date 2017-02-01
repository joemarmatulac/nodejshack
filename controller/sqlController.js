var conn = require('../config/mysqlConnect')

module.exports = (app) => {
    app.use('/', (req, res, next) => {
        console.log('Request URI: ' + req.url);
        return new Promise((resolve, reject) => {
            conn.mysqlcon.query('SELECT * FROM user', (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        }).then(data => {
            res.end(JSON.stringify(data[0]));
        }).catch(error => {
            console.log(error);
        });
    });
}