const app = require("./app");
const mongoose = require("mongoose");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
//Database config
const DB = process.env.DATABASE;
mongoose
    .connect(
            DB , {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("DB connection successful");
    });

const port = 5000;
app.listen(port, () => {
    console.log("App running on port 5000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
})

server.listen(3005, () => {
    console.log('listening on *:3005');
});
