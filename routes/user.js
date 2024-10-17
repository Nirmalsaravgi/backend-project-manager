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

        return res.cookie("token", token, { httpOnly: true }).json({ message: "success", token: token });  // Set cookie with appropriate options
    } catch(error){
        return res.json({error: "incorrect email or password"});
    }
});

// router.post('/signin', async(req, res) => {
//     const {email, password} = req.body;
//     const token = await User.matchPassword(email, password);
//     res.cookie("token", token);  // Set cookie with appropriate options
    
// });

// router.post('/signin', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Log to check that this is running before the response
//         console.log("Request received, matching password");

//         // Match the password and get the token
//         const token = await User.matchPassword(email, password);

//         // Log to confirm token generation
//         console.log("Token generated, setting cookie");

//         // Set the cookie with the token
//         res.cookie("token", token, {
//             httpOnly: true, // Secure flag for cookies
//             maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
//         });

//         // Send response after setting cookie
//         console.log("Sending success response");
//         res.status(200).json({ message: "Logged in successfully" });
//     } catch (error) {
//         // Log the error before sending the response
//         console.log("Error occurred:", error.message);

//         // Ensure no further response is sent after this point
//         if (!res.headersSent) {
//             // Catch any errors and send appropriate response
//             res.status(400).json({ error: error.message });
//         } else {
//             console.error("Headers already sent, cannot respond with error");
//         }
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }
  
//     try {
//       const token = await User.matchPassword(email, password);
//       res.cookie('token', token, {
//         httpOnly:

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }
  
//     try {
//       // Use the static method we defined in the User model
//       const token = await User.matchPassword(email, password);
//       return res.json({ token });
//     } catch (error) {
//       console.error('Login error:', error);
//       return res.status(401).json({ error: error.message });
//     }
//   });
  

// router.post('/signin', async(req, res) => {
//     const {email, password} = req.body;
//     try{
//         const token = await User.matchPassword(email, password);

//         // console.log("User", user);
//         // return res.status(201).json({msg: "success", token: token}).cookie("token", token);
//         res.cookie("token", token);  // Set cookie with appropriate options
//         res.send("Log yinn");
//     } catch(error){
//         return res.json({error: "incorrect email or password"});
//     }
    
// });


// router.post("/signin", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const token = await User.matchPassword(email, password);
  
//       return res.cookie("token", token);
//     } catch (error) {
//     }
//   });

// router.post("/signin", async (req, res) => {
//     const { email, password } = req.body; // Extract email and password from the request body
//     try {
//         // Use the matchPassword function to verify the user's credentials
//         const token = await User.matchPassword(email, password);
        
//         // If credentials are correct, set the cookie and send a success response
//         return res
//             .cookie("token", token, { 
//                 httpOnly: true, // Prevent access via client-side JavaScript
//                 secure: process.env.NODE_ENV === 'production', // Use secure in production
//                 sameSite: 'strict', // Prevent CSRF attacks
//             })
//             .status(200);
//               // Optionally return the token
//     } catch (error) {
//         console.error("Error occurred during login: ", error);
//         // If there's an error, return a meaningful message
//         return res.status(400);
//     }
// });





module.exports = router;