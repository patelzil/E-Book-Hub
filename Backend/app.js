//importing Modules
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const app = express();
//Middlewares - output in console a response status
app.use(cors());

//Middlewares
//output in console a response status

//allow to parse between javascript object and Json
app.use(express.json());

//Routes to use mini application
app.use("/EBookHub/users", userRouter);

app.use("/EBookHub/books", bookRouter);

//exporting app
module.exports = app;