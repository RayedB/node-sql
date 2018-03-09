const express = require('express');
const mysql = require('mysql');
const sqlrequire = require('require-sql');
const createDB = require('./assets/sql/createDB.sql')
const createTable = require('./assets/sql/createTable.sql')
const populate = require('./assets/sql/populateTable.sql')
const app = express();
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  multipleStatements: true
});


conn.connect(function(){
  console.log("connected to db")
})

conn.query('SHOW DATABASES;',function(err,res,fields){
  if (!res.find(db => db.Database == "masterdb")) {
    conn.query(createDB, function() {
      conn.query(createTable, function(){
        conn.query(populate,function(){
          console.log("you're all set")
        })
      })
    })
  } else {

  }

})

app.get('/api/sql/requete1')

app.listen(8080);
