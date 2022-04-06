//importing Modules
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const purchaseRouter = require("./routes/buyRoutes");
const bookclubRouter = require("./routes/bookclubRoutes");

//Middlewares - output in console a response status
app.use(cors());

//allow to parse between javascript object and Json
app.use(express.json());

//Routes to use mini application
app.use("/EBookHub/users", userRouter);

app.use("/EBookHub/books", bookRouter);

app.use("/EBookHub/books/purchase", purchaseRouter);

app.use("/EBookHub/books/bookclub", bookclubRouter);

//exporting app
module.exports = app;
