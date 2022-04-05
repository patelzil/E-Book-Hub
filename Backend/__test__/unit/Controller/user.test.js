const {createUser , updateUser, getUser} = require('../../../Controller/userController');
const { mockRequest, mockResponse } = require('mock-req-res')
const mongoose = require('mongoose');
const Users = require('../../../models/userModel');

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
    await Users.findOneAndDelete({username: 'TestUserRutu'});
    await mongoose.connection.close();
})

describe('User Signin mock test', () => {
    
    test('Create User test', async ()=>{
        const req = await mockRequest({
            body: { 
                    firstName: 'TestFirstName',
                    lastName: 'TestLastName',
                    eMail: 'TestEmailRutu@com.ca',
                    username: 'TestUserRutu',
                    password: 'Test123@' 
            },
            method: 'POST',
            headers: { 'x-auth-username': 'TestUserRutu' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })
        await createUser(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.message).toBe('new user created');
            expect(res.json.data.newUser.username).toBe('TestUserRutu');
        })
    })

    test('Update information user test', async ()=>{
        const req = await mockRequest({
            params: { username: 'TestUserRutu' },
            body: {
                    firstName: 'TestFirstName',
                    lastName: 'TestLastName',
                    eMail: 'TestEmailRutu1234@com.ca',
                    username: 'TestUserRutu',
                    password: 'Test123@' 
            },
            method: 'PATCH',
            headers: { 'x-auth-username': 'TestUserRutu' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })
        await updateUser(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.message).toBe('updated user');
            expect(res.json.data.user.username).toBe('TestUserRutu');
            expect(res.json.data.user.eMail).toBe('TestEmailRutu1234@com.ca');
        })
    })

    test('Get user test with right credentials', async ()=>{
        const req = await mockRequest({
            params: { username: 'TestUserRutu', password: 'Test123@' },
            method: 'GET',
            headers: { 'x-auth-username': 'TestUserRutu' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })
        await getUser(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.message).toBe('Found user');
            expect(res.json.data.user.username).toBe('TestUserRutu');
            expect(res.json.data.user.eMail).toBe('TestEmailRutu1234@com.ca');
        })
    })

    test('Get user test with wrong credentials', async ()=>{
        const req = await mockRequest({
            params: { username: 'TestUserRutu', password: 'Test123@456' },
            method: 'GET',
            headers: { 'x-auth-username': 'TestUserRutu' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })
        await getUser(req,res).then( async()=> {
            expect(res.json.status).toBe('fail');
            expect(res.json.description).toBe('not found user');
        })
    })
})