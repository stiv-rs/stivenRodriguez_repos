const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1903',
    database: 'stivenrodriguez_repos'
});

mysqlConnection.connect(function(err){
    if (err) {
        console.log(err);
    }else{
        console.log('la bd esta conectada');
    }
});

module.exports = mysqlConnection;