const {Router} = require("express");
const Projects = require('../models/projects');

const router = Router();

router.post("/createProject", async(req, res) =>{
    const body = req.body;
    try{
        const result = await Projects.create({
            name: body.name,
            project_key: body.project_key,
            description: body.description,
            project_url: body.project_url,
            github_url: body.github_url,
            assigned_to: body.assigned_to,
        });
    
        return res.status(201).json({msg: "success", project: result});
    }
    catch(error){
        return res.json({error: "error occured"});
    }
});

router.get("/getProjects", async(req, res) =>{
    const allProjects = await Projects.find({});
    return res.json(allProjects);
});



module.exports = router;