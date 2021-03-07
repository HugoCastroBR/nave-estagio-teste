const connect = require('../sctructure/database/connect.js')
const _query = require('../sctructure/database/queries.js')

const return_error = require('../sctructure/functions/Return_error.js')
const objToQuerry_str = require('../sctructure/functions/objToQuerry_str.js')

const NaversProjects = require('./NaversProjects.js')

class Navers{
    
    maior_id = 0
    

    // async maiorId(){
        

    //     await connect.query('select * from navers order by id desc limit 1',async (error,results) => {
    //         if(error){
    //             console.log('erro')
    //             console.log(error)
    //         }else{
    //             return await results[0].id
    //         }
    //     })


    // }



    async add(naver,res){

        try{
            let projects = (naver.projects).split(',')
            let maiorID = 0
            projects = projects.map(nmr => {
                return parseInt(nmr)
            })

            connect.query('select * from navers order by id desc limit 1', (error,results) => {
            if(error){
                console.log('erro')
                console.log(error)
            }else{
                maiorID =  results[0].id
                projects.forEach( project => {
                    NaversProjects.add([maiorID + 1,project],res)
                })
        
                delete naver.projects
                const sql = ('INSERT INTO navers SET ?')
                _query(sql,res,naver)  
            }
        })
        }
        catch(error){
            const sql = ('INSERT INTO navers SET ?')
            _query(sql,res,naver)  
        }
    }
    


    async search(res,id = null){

        let resposta = 0
        let respostas_idProject = []
        let lista_projetos = []
        let Naver_p = false

       
        if (id == null){
            const sql = 'SELECT * FROM nave.navers'
            _query(sql,res)
        }else{
            const sql = `
            
                SELECT 
                navers.id AS id,
                navers.name AS name,
                birthdate,admission_date,job_role
                ,idProject,
                projects.name AS project_name
                FROM 
                navers
                INNER JOIN
                naversprojects
                on 
                navers.id = naversprojects.idNaver
                INNER JOIN projects on naversprojects.idProject = projects.id
                WHERE navers.id = ${id};
            
            ` // <= coloca tudo em uma unica querry

            connect.query(sql,(error, results) =>{
                if(error){
                    console.log('error')
                    console.log(error)
                    return res.status(400).json({error})
                }else{
                    resposta = results.map(result => { // formatando o JSON
                        return({
                            "id":result.idProject,
                            "name":result.project_name
                        })
                    })
                    try{
                        Naver_p = results[0]
                        delete Naver_p.idProject  // deixando apenas os campos necessarios
                        delete Naver_p.project_name
                        Naver_p.projects = resposta // adicionandos os projetos na saida
                        return res.status(200).json(Naver_p) // enviando resposta

                    }catch(error){ // se nao tiver projetos retorne sem projetos
                        const sql = `SELECT * FROM navers where id = ${id};` 
                        connect.query(sql,(error, results) => {
                            if(error){
                                return res.status(404).json(results)
                            }else{
                                return res.status(200).json(results)
                            }
                        })
                    }
                }
            })


            // const sql = `SELECT * FROM nave.navers WHERE id=${id}`
            // connect.query(sql,(error, results) =>{
            //     if(error){
            //         console.log('error')
            //         console.log(error)
            //             return res.status(400).json({error})
            //     }else{
            //         console.log(results[0].id)
                            
                        
                    
            //     }})
        }

    }
        

    delete(res, id){
        const sql = `Delete from nave.navers where id=${id}`
        _query(sql,res)
    }

    update(id,naver,res){
        const sql = `UPDATE nave.navers SET ? where id=${id}`
        _query(sql,res,naver)
    }



}

module.exports = new Navers