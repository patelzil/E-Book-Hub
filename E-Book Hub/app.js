//importing Modules
const express = require("express");
const morgan = require("morgan");

const app = express();

//Middlewares

//output in console a response status
app.use(morgan("dev"));

//allow to parse between javascript object and Json
app.use(express.json());

//exporting app
module.exports = app;