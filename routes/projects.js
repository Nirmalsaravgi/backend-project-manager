const {Router} = require("express");
const cookieParser = require('cookie-parser');
const Projects = require('../models/projects');
const {decodeToken} = require('../utils/authentication');

const router = Router();
router.use(cookieParser());

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

// New route to get projects assigned to the user
router.get("/getUserProjects", async (req, res) => {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // console.log("Received token:", token);
        const decoded = decodeToken(token); // Decode the token to get user info
        // console.log("decoded: ", decoded);
        const userId = decoded._id; // Extract the user ID from the decoded token
        // console.log("userId: ", userId);
        const projects = await Projects.find({ assigned_to: userId }); // Find projects assigned to this user

        return res.status(200).json({ projects }); // Return the found projects
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(401).json({ message: error.message });
    }
});

router.put('/updateProject/:id', async (req, res) => {
    const { id } = req.params;  // Get the project ID from URL
    const updateData = req.body;  // Data to update, coming from the request body

    try {
        // Find project by ID and update with new data
        const updatedProject = await Projects.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Error updating project", error });
    }
});

router.delete('/deleteProject/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from URL

    try {
        // Find project by ID and delete
        const deletedProject = await Projects.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Error deleting project", error });
    }
});


module.exports = router;