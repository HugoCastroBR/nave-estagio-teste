const connect = require('../sctructure/database/connect.js')
const _query = require('../sctructure/database/queries.js')

const return_error = require('../sctructure/functions/Return_error.js')
const objToQuerry_str = require('../sctructure/functions/objToQuerry_str.js')



class naversprojects{
    

    async add(naversprojects,res){
        const sql = await(`INSERT INTO naversprojects SET idNaver = ${naversprojects[0]}, idProject = ${naversprojects[1]}`)
        await connect.query(sql)
    }

    // search(res,id = null){
    //     if (id == null){
    //         const sql = 'SELECT * FROM nave.naversprojects'
    //         _query(sql,res)
    //     }else{
    //         const sql = `SELECT * FROM nave.naversprojects WHERE id=${id}`
    //         _query(sql,res)
    //     }
        
    // }

    // delete(res, id){
    //     const sql = `Delete from nave.naversprojects where id=${id}`
    //     _query(sql,res)
    // }

    // update(id,naver,res){
    //     const sql = `UPDATE nave.naversprojects SET ? where id=${id}`
    //     _query(sql,res,naver)
    // }



}

module.exports = new naversprojects