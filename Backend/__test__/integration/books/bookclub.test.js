const bookclub = require("../../../models/bookClubModel");
const user = require("../../../models/userModel");
const app = require('../../../app');
let supertest = require('supertest');
let request = supertest(app);
const mongoose = require('mongoose');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
})

beforeAll( async ()=> {
    jest.useFakeTimers('legacy')
    const uri = process.env.DATABASE;
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,   
        useFindAndModify: false,
    }
    await mongoose.connect(uri,mongooseOpts);
})

afterAll( async () => {
    //make we have deleted the test user from the database
    await user.findOneAndDelete({username: 'RutuB'})
    await user.findOneAndDelete({username: 'ParthP'})
    await user.findOneAndDelete({username: 'ZeelK'})
    await user.findOneAndDelete({username: 'ZilP'})
    // await user.findOneAndDelete({username: 'VikiM'})
    await bookclub.findOneAndDelete({bookclubName: 'findOneAndDelete'})
    await bookclub.findOneAndDelete({bookclubName: 'findOneAndDeleteAgain'})
    await mongoose.connection.close();
})

describe('User should be able to create a book club', () => {
    
    test('User should be able to create a book club', async() => {
        jest.setTimeout(30000);
        const user1 = await request.post('/EBookHub/users/createUser').send({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            eMail: 'Rutu1@com.ca',
            username: 'RutuB',
            password: 'Test123@'
        })

        const response = await request.post('/EBookHub/books/bookclub/createBookclub').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'RutuB'
        }) 
        expect(response.status).toBe(201);

        const response1 = await request.post('/EBookHub/books/bookclub/createBookclub').send({
            bookclubName: 'findOneAndDeleteAgain',
            info: 'TestBookClub',
            user: 'RutuB'
        }) 
        expect(response1.status).toBe(201);
    })

    test('User should not be able to create a book club if book club already exists', async() => {
        jest.setTimeout(30000);
        const user2 = await request.post('/EBookHub/users/createUser').send({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            eMail: 'Parth1@com.ca',
            username: 'ParthP',
            password: 'Test123@'
        })

        const response = await request.post('/EBookHub/books/bookclub/createBookclub').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ParthP'
        }) 
        expect(response.status).toBe(404);
        
    })

    test('User should not be able to create a book club without username', async() => {
        jest.setTimeout(30000);
        const response = await request.post('/EBookHub/books/bookclub/createBookclub').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'RutuBar'
        }) 
        expect(response.status).toBe(404);
    })
})

describe('User should be able to join a book club', () => {
    // jest.setTimeout(300000);
    test('Multiple User should be able to join same book club', async() => {
        jest.setTimeout(30000);
        const response = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ParthP'
        })
        expect(response.status).toBe(201);

        const user3 = await request.post('/EBookHub/users/createUser').send({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            eMail: 'Zeel1@com.ca',
            username: 'ZeelK',
            password: 'Test123@'
        })

        const response1 = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZeelK'
        })
        expect(response1.status).toBe(201);

        const response2 = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDeleteAgain',
            info: 'TestBookClub',
            user: 'ZeelK'
        })
        expect(response2.status).toBe(201);
    
    })

    test('User should not be able to join book club twice if they have already joined book club', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZeelK'
        })
        expect(response1.status).toBe(404);
    })

    test('User should not be able to join book club with wrong crendentials', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZeelKNotValidUserName'
        })
        expect(response1.status).toBe(404);
    })

})

describe('User should not be able to join a book club', () => {

    test('User should not be able to join book club with wrong crendentials', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/addUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZeelKNotValidUserName'
        })
        expect(response1.status).toBe(404);
    })
})

describe('User should be able to leave a book club', () => {

    test('User should be able to leave from a book club', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/deleteUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZeelK'
        })
        expect(response1.status).toBe(201);
    })

    
    test('User should not be able leave from book club if they have not joined book club yet', async() => {
        jest.setTimeout(30000);
        const user4 = await request.post('/EBookHub/users/createUser').send({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            eMail: 'Zil1@com.ca',
            username: 'ZilP',
            password: 'Test123@'
        })
        expect(user4.status).toBe(201);
        const response1 = await request.post('/EBookHub/books/bookclub/deleteUser').send({
            bookclubName: 'findOneAndDelete',
            info: 'TestBookClub',
            user: 'ZilP'
        })
        expect(response1.status).toBe(404);
    })

    test('User should not be able to leave a book club if book club not exists', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/deleteUser').send({
            bookclubName: 'findOneAndDeleteNotExist',
            info: 'TestBookClub',
            user: 'RutuB'
        })
        expect(response1.status).toBe(404);
    })
})

describe('User should be see a list for available book club', () => {

    test('User should be see a list for bookclub', async() => {
        jest.setTimeout(30000);
        const response1 = await request.get('/EBookHub/books/bookclub/getAllclubs')
        expect(response1.status).toBe(201);
    })
})

describe('User should be search for a available book club ', () => {

    test('User should be search for bookclub', async() => {
        jest.setTimeout(30000);
        const response1 = await request.get('/EBookHub/books/bookclub/getBookclub/findOneAndDelete')
        expect(response1.status).toBe(201);
    })

    test('User should not be able to search for non existing bookclub', async() => {
        jest.setTimeout(30000);
        const response1 = await request.get('/EBookHub/books/bookclub/getBookclub/findOneAndDeleteNotExists')
        expect(response1.status).toBe(404);
    })
})

describe('User should be send a message in joined or created book club', () => {

    test('User should be able to send a message if they have joined book club', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/message').send({
            bookclubName: 'findOneAndDelete',
            data:{
                sender: "RutuB",
                time:"test time",
                message:"Hello ParthP!"
            }
        })
        expect(response1.status).toBe(201);
        const obj = JSON.parse(response1.text)
        expect(obj.status).toBe('Success');
        expect(obj.message).toBe('message got from RutuB');
        expect(obj.data[0].message).toBe('Hello ParthP!');

        const response2 = await request.post('/EBookHub/books/bookclub/message').send({
            bookclubName: 'findOneAndDelete',
            data:{
                sender: "ParthP",
                time:"test time",
                message:"Hello RutuB!"
            }
        })
        expect(response2.status).toBe(201);
        const obj1 = JSON.parse(response2.text);
        expect(obj1.status).toBe('Success');
        expect(obj1.data[0].sender).toBe('RutuB');
        expect(obj1.data[1].sender).toBe('ParthP');
        expect(obj1.data[0].message).toBe('Hello ParthP!');
        expect(obj1.data[1].message).toBe('Hello RutuB!');
    })

    test('User should not be able to send a message if they have not joined book club yet', async() => {
        jest.setTimeout(30000);
        const response1 = await request.post('/EBookHub/books/bookclub/message').send({
            bookclubName: 'findOneAndDeleteAgain',
            data:{
                sender: "ParthP",
                time:"test time",
                message:"Hello ParthP!"
            }
        })
        expect(response1.status).toBe(404);
        const obj = JSON.parse(response1.text)
        expect(obj.status).toBe('Fail');
        expect(obj.message).toBe('User doent exist in bookclub findOneAndDeleteAgain');
    })
})