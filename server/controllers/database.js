var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123321",
    database: "httt"
});
con.connect(function (err) {
    if (err) throw err;
    console.log('Da ket noi database');
});
module.exports = con;