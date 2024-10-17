const express = require("express");
const mongoose = require("mongoose");

const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/projmanag').then(e => console.log('MongoDb connected'));

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is started at PORT ${PORT}`));