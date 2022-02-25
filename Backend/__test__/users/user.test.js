const user = require('../../models/userModel');
const app = require('../../app');
let supertest = require('supertest');
let request = supertest(app);
const mongoose = require('mongoose');

beforeAll( async ()=> {
    const uri = "mongodb+srv://zeelkhokhariya:Webito@123@cluster0.acf3e.mongodb.net/EbookHub?retryWrites=true&w=majority";
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,   
        useFindAndModify: false,
    }
    await mongoose.connect(uri,mongooseOpts);
})

afterAll( async () => {
    await mongoose.connection.close();
})

describe('User signin/Login test', () => {
    describe('Enter new User',() =>{
        test('User has provided all details correct',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail',
                username: 'TestUser',
                password: 'Test123'
            }) 
            expect(response.statusCode).toBe(201);
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    } )
    
    describe('Enter new User with out password' ,() => {
        test('User has missing password',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail',
                username: 'TestUser',
                password: ''

            }) 
            expect(response.statusCode).toBe(400);   
        });
    })

    describe('Enter new user without username', () => {
        test('User has missing username',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail',
                username: '',
                password: 'Test123'
            }) 
            expect(response.statusCode).toBe(400);   
        });
    })

    describe('Enter new user without email', () => {
        test('User has missing email',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: '',
                username: 'Testuser',
                password: 'Test123'
            }) 
            expect(response.statusCode).toBe(400);   
        });
    })

    describe('Enter new user without firstname', () => {
        test('User has missing firstname',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: '',
                lastName: 'TestLastName',
                eMail: 'TestEmail',
                username: 'Testuser',
                password: 'Test123'
            }) 
            expect(response.statusCode).toBe(400);   
        });
    })

    describe('Enter new user without lastname', () => {
        test('User has missing lastname',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: '',
                eMail: 'TestEmail',
                username: 'Testuser',
                password: 'Test123'
            }) 
            expect(response.statusCode).toBe(400);   
        });
    })
    
    describe('Enter new user without username and password', () => {
        test('User has missing username and password both',async () => {
            jest.setTimeout(30000)
            const response = await request.post('/EBookHub/users/createUser').send({
                username: '',
                password: ''
            }) 
            expect(response.statusCode).toBe(400);   
        });
    })

    describe('Enter existing username' , () => {
        test('User has entered duplicate details',async () => {
            jest.setTimeout(30000)
            await request.post('/EBookhub/users/createUser').send({
                username: 'TestUser',
                password: 'Test123'
            }) 
            const response1 = await request.post('/EBookhub/users/createUser').send({
                username: 'TestUser',
                password: 'Test123'
            }) 
            expect(response1.statusCode).toBe(400);
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })
    
})