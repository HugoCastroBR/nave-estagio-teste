const { table } = require("console")

class Tables {
    init(connect){
        this.connect = connect
        this.criarBD()
    }

    criarBD(){

        
        const sqlNavers = `CREATE TABLE IF NOT EXISTS Navers(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(80) NOT NULL, birthdate DATE NOT NULL,
        admission_date DATE NOT NULL, job_role varchar(100))`

        const sqlProjects = `CREATE TABLE IF NOT EXISTS Projects(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(80) NOT NULL)`

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
}

module.exports = new Tables    