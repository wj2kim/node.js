// using 'Mysql' as project dependency
let mysql = require('mysql');
// mysql과의 연결 매개변수 = 1.host 2.user 3.password 4.database
let db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'2472',
   database:'opentutorials',
});
// mysql과 연결 
db.connect();

module.exports = db;