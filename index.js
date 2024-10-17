const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const userRoute = require('./routes/user');
const projectRoute = require('./routes/projects');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

// // app.use(cors({ origin: 'http://127.0.0.1:4200' }));
// app.use(cors())
const corsOptions = {
    origin: 'http://127.0.0.1:4200',  // Allow requests from this specific origin
    credentials: true,  // Allow cookies to be sent
};


mongoose.connect('mongodb://localhost:27017/projmanag').then(e => console.log('MongoDb connected'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/projects", projectRoute);

app.listen(PORT, () => console.log(`Server is started at PORT ${PORT}`));