const Navers = require('../models/Navers.js')




module.exports = app => {


    app.route('/navers')
        .get((req,res) => {
            Navers.search(res)
        })
        .post((req,res) => {
            const naver = req.body
            Navers.add(naver,res)
            // adicionar projects 
        })

    app.get('/navers/:id', (req, res) => { 
        const id = parseInt(req.params.id);
    
        Navers.search(res,id)
    
        })

    

}