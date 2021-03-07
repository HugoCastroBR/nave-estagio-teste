
const connect = require('./structure/database/connect.js')

class Tables {
    init(connect){
        this.connect = connect
        this.criarBD() // ExcluirBD(), Adicionar(ITEM,TABLE), Delete(id,table) 
    }

    criarBD(){

        
        const sqlNavers = `CREATE TABLE IF NOT EXISTS Navers(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(80) NOT NULL, birthdate DATE NOT NULL,
        admission_date DATE NOT NULL, job_role varchar(100), created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP)`

        const sqlProjects = `CREATE TABLE IF NOT EXISTS Projects(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(80) NOT NULL , created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP)`

        const sqlNaversProjects = `CREATE TABLE IF NOT EXISTS NaversProjects(idNaver int NOT NULL, idProject int NOT NULL)`
        
        const Sqls = [sqlNavers, sqlProjects, sqlNaversProjects]

        Sqls.forEach(sql => {
            this.connect.query( sql,erro => {
                if (erro){
                    console.log(erro)
                }else{
                    console.log('Tables conectada com sucesso')
                }
            })
        })

    }

    ExcluirBD(){


        const DeleteALLSQLNavers = `DROP TABLE navers  `
        const DeleteALLSQLProjects = `DROP TABLE projects`
        const DeleteALLSQLNaversProjects = `DROP TABLE naversprojects`

        const Sqls = [DeleteALLSQLNavers, DeleteALLSQLProjects, DeleteALLSQLNaversProjects]

        Sqls.forEach(sql => {
            this.connect.query( sql,erro => {
                if (erro){
                    console.log(erro)
                }else{
                    console.log('Tables deletadas com sucesso')
                }
            })
        })
    }


    Adicionar(Item,Table){

        const SQL = `INSERT INTO ${Table} SET ?`
        this.connect.query(sql,Item,erro => {
            if (erro){
                console.log(erro)
            }else{
                console.log('Tables deletadas com sucesso')
            }
        })
    }

    Deletar(id, Table){

        const SQL = `DELETE FROM ${Table} where id = ${id}`
        
        this.connect.query(sql,erro => {
            if (erro){
                console.log(erro)
            }else{
                console.log('Tables deletadas com sucesso')
            }
        })
    }
}

const tables = new Tables

connect.connect(error => {
    if (error){
        console.log(error)
    }else{
        console.log('Conectado ao banco de dados com sucesso, porta 3306')

        tables.init(connect)

    }
})