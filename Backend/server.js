const app = require("./app");
const mongoose = require("mongoose");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
//Database config
mongoose
    .connect(
        "mongodb+srv://zeelkhokhariya:Webito@123@cluster0.acf3e.mongodb.net/EbookHub?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log("DB connection successful");
    });

const port = 5000;
app.listen(port, () => {
    console.log("App running on port ${port}");
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
