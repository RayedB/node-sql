const express = require('express');
const mysql = require('mysql');
const sqlrequire = require('require-sql');
const createDB = require('./assets/sql/createDB.sql')
const selectDB = require('./assets/sql/selectDB.sql')
const createTable = require('./assets/sql/createTable.sql')
const populate = require('./assets/sql/populateTable.sql')
const select = require('./assets/sql/select.sql')
const app = express();
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

app.use(express.static(__dirname + '/public'));

conn.connect(function(){
  console.log("connected to db")
})

conn.query('SHOW DATABASES;',function(err,res,fields){
  if (!res.find(db => db.Database == "masterdb")) {
    conn.query(createDB);
    conn.query(selectDB);
    conn.query(createTable);
    conn.query(populate);
  } else {
    conn.query(selectDB);
  }

})

app.get('/api/sql/requete1', function(request,response){
  conn.query(select, function (err,res,fields){
    response.json(res)
  });
})

app.listen(8080);
