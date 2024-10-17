const {Router} = require("express");
const User = require('../models/user');

const router = Router();

router.post("/signup", async(req, res) =>{
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.status(201).json({msg: "success"});
});

router.post('/signin', async(req, res) => {
    const {email, password} = req.body;
    try{
        const token = await User.matchPassword(email, password);

        // console.log("User", user);
        // return res.status(201).json({msg: "success", token: token}).cookie("token", token);
        return res.cookie("token", token);
    } catch(error){
        return res.json({error: "incorrect email or password"});
    }
    
})

module.exports = router;