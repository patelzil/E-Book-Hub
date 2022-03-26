//importing Modules
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);

const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");

// Socket server setup
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3005, () => {
    console.log('listening on *:3005');
});

// --- Socket server set up ends ---

//Middlewares - output in console a response status
app.use(cors());

//allow to parse between javascript object and Json
app.use(express.json());

//Routes to use mini application
app.use("/EBookHub/users", userRouter);

app.use("/EBookHub/books", bookRouter);

//exporting app
module.exports = app;
