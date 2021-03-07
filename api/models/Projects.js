const connect = require('../sctructure/database/connect.js')
const _query = require('../sctructure/database/queries.js')

const return_error = require('../sctructure/functions/Return_error.js')
const objToQuerry_str = require('../sctructure/functions/objToQuerry_str.js')

const NaversProjects = require('./NaversProjects.js')

class Projects{


    add(project,res){
        let navers = project.navers

        let maiorID = 0
        if(navers.length > 1){
            navers = navers.split(',')
            navers = navers.map(nmr => {
                return parseInt(nmr)
            })
        }else{
            
        }

        connect.query('select * from projects order by id desc limit 1', (error,results) => {
            if(error){
                console.log('erro')
                console.log(error)
            }else{
                maiorID =  results[0].id
                connect.query('select * from navers order by id desc limit 1', (error,results) => 
                {
                    if(error){
                        console.log('erro')
                        console.log(error)
                    }
                    else
                    {
                        const maiorIdNaver =  results[0].id
                        navers.forEach( naver => {
                        NaversProjects.add([naver,maiorID + 1],res)
                        })
                    }
                })
            }
            delete project.navers
            console.log(project)
            const sql = ('INSERT INTO projects SET ?')
            _query(sql,res,project)
        })
    }

    search(res,id = null){
        if (id == null){
            const sql = 'SELECT * FROM nave.projects'
            _query(sql,res)
        }else{
            const sql = `

            SELECT 
            navers.id AS idNaver,
            navers.name AS nameNaver,
            birthdate,admission_date,job_role
            ,idProject AS CCidProject,
            projects.name AS project_name,
            projects.id AS id_project
            FROM 
            projects
            INNER JOIN
            naversprojects
            on 
            projects.id = naversprojects.idProject
            INNER JOIN navers on naversprojects.idNaver = navers.id
            WHERE projects.id = ${id};
            
            `

            connect.query(sql,(error, results) => {
                if(error){
                    console.log(error)
                }else{
                    try{
                        const resposta = results.map(result => { // formatando o JSON
                            return({
                                "id":result.idNaver,
                                "name":result.name,
                                "birthdate":result.birthdate,
                                "admission_date":result.admission_date,
                                "job_role": result.job_role
                            })
                        })
    
                        const project_act = results.map(result => {
                            return({
                                "id": result.id_project,
                                "project": result.project_name
                            })
                        })
    
    
                        project_act[0].Navers = resposta
                        return res.status(200).json(project_act[0])
                    }
                    catch(error){
                        const sql = `SELECT * FROM projects where id = ${id};` 
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
        }
        
    }

    delete(res, id){
        const sql = `Delete from nave.projects where id=${id}`
        _query(sql,res)
    }

    update(id,naver,res){
        const sql = `UPDATE nave.projects SET ? where id=${id}`
        _query(sql,res,naver)
    }



}

module.exports = new Projects