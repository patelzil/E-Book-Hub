const user = require('../../../models/userModel');
const app = require('../../../app');
let supertest = require('supertest');
let request = supertest(app);
const mongoose = require('mongoose');

beforeAll( async ()=> {
    jest.useFakeTimers('legacy')
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
    //make we have deleted the test user from the database
    await user.findOneAndDelete({username: 'TestUser'})
    await user.findOneAndDelete({username: 'TestUser1RRRR'})
    await mongoose.connection.close();
})

describe('User signin/Login test', () => {
    
    describe('Enter new User',() =>{
        test('User has provided all details correct',async () => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
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
                eMail: 'TestEmail@com.ca',
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
                eMail: 'TestEmail@com.ca',
                username: '',
                password: 'Test123@'
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
                password: 'Test123@'
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
                eMail: 'TestEmail@com.ca',
                username: 'Testuser',
                password: 'Test123@'
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
                eMail: 'TestEmail@com.ca',
                username: 'Testuser',
                password: 'Test123@'
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
                password: 'Test123@'
            }) 
            const response1 = await request.post('/EBookhub/users/createUser').send({
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response1.statusCode).toBe(400);
        });
    })
    
})

//get user testing 
describe('User retriving test by username and password', () => {

    describe('Enter correct username and password to get user', () =>
    {
        test('User has provided all details correct',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail123311@com.ca',
                username: 'TestUser1RRRR',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);

            const response1 = await request.get('/EBookHub/users/TestUser1RRRR/Test123@');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('success');
            await user.findOneAndDelete({username: 'TestUser1RRRR'});
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    })

    describe('Enter incorrect password to get user', () =>
    {
        test('User has not provided all details correct',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            //incorrect password provided in route
            const response1 = await request.get('/EBookHub/users/TestUser/Test1234');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('fail');
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    })

    describe('Enter incorrect username to get user', () =>
    {
        test('User has not provided all details correct',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            //incorrect password provided in route
            const response1 = await request.get('/EBookHub/users/TestUser111/Test123@');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('fail');
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    })

    describe('Enter no username to get user', () =>
    {
        test('User has not provided all details correct',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            //incorrect password provided in route
            const response1 = await request.get('/EBookHub/users/""/Test123@');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('fail');
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    })

    describe('Enter no password to get user', () =>
    {
        test('User has not provided all details correct',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            //incorrect password provided in route
            const response1 = await request.get('/EBookHub/users/TestUser/" "');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('fail');
            await user.findOneAndDelete({username: 'TestUser'});    
        });
    })
})

//update user testing


describe('Updating user information', () => {

    describe('find user and update information', () =>
    {
        test('User does not exists in database',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            //try to get not exists user 
            const response1 = await request.patch('/EBookHub/users/TestUser111');
            const obj = JSON.parse(response1.text);
            expect(obj.status).toMatch('fail');
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })

    describe('find user and update firstname', () =>
    {
        test('User exists in database and updating firstname',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            const firstName = "TestFirstNameUpdated"
            const response1 = await request.patch('/EBookHub/users/TestUser');
            const obj = JSON.parse(response1.text);
            obj.data.user.password = firstName;
            expect(obj.data.user.password).toMatch('TestFirstNameUpdated')
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })

    describe('find user and update lastName', () =>
    {
        test('User exists in database and updating lastName',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            const firstName = "TestLastNameUpdated"
            const response1 = await request.patch('/EBookHub/users/TestUser');
            const obj = JSON.parse(response1.text);
            obj.data.user.password = firstName;
            expect(obj.data.user.password).toMatch('TestLastNameUpdated')
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })

    describe('find user and update email', () =>
    {
        test('User exists in database and updating email',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            const firstName = "TestEmailUpdated@com.ca"
            const response1 = await request.patch('/EBookHub/users/TestUser');
            const obj = JSON.parse(response1.text);
            obj.data.user.password = firstName;
            expect(obj.data.user.password).toMatch('TestEmailUpdated@com.ca')
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })

    describe('find user and update password', () =>
    {
        test('User exists in database and updating password',async () => {
            jest.setTimeout(30000)
            //first we will create user to find one if it is exists or not
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail@com.ca',
                username: 'TestUser',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            const updatedPassword = "Test1234"
            const response1 = await request.patch('/EBookHub/users/TestUser');
            const obj = JSON.parse(response1.text);
            obj.data.user.password = updatedPassword;
            expect(obj.data.user.password).toMatch('Test1234')
            await user.findOneAndDelete({username: 'TestUser'});
        });
    })
})