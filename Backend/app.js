//importing Modules
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
//Middlewares - output in console a response status
app.use(cors())

//allow parsing between javascript object and Json
app.use(express.json());

//Routes to use mini application
app.use("/EBookHub/users", userRouter);

//exporting app
module.exports = app;
