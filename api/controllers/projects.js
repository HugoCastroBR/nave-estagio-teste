
const Projects = require('../models/Projects')

module.exports = app =>{

    app.route('/projects')
        .get((req,res) => {
            Projects.search(res)
        })
        .post((req,res) => {
            const project = req.body
            Projects.add(project,res)
            // adicionar projects 
        })

    app.get('/projects/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        
        Projects.search(res,id)
        
        })


}