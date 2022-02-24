//importing Modules
const express = require("express");
<<<<<<< HEAD
const fetch = require("node-fetch");

const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
=======
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

>>>>>>> 36d75a78d1a32ba42b68e728d9f1e0acfa8c5d75
const app = express();
//Middlewares - output in console a response status
app.use(cors())

<<<<<<< HEAD
//Middlewares
//output in console a response status

//allow to parse between javascript object and Json
=======
//allow parsing between javascript object and Json
>>>>>>> 36d75a78d1a32ba42b68e728d9f1e0acfa8c5d75
app.use(express.json());

//Routes to use mini application
app.use("/EBookHub/users", userRouter);

app.use("/EBookHub/books", bookRouter);

//exporting app
module.exports = app;
