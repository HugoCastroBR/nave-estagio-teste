const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: {my passowrd <3},
    database: 'nave' 
})

module.exports = conexao
