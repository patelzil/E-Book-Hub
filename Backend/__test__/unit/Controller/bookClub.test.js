const mongoose = require('mongoose');
const { mockRequest, mockResponse } = require('mock-req-res')
const bookClub = require('../../../models/bookClubModel')
const {createBookclub , addUserToClub, saveMessage, getAllClubs, removeUserfromClub, getBookclub} = require('../../../Controller/bookclubController')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

beforeAll( async ()=> {
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
    await bookClub.findOneAndDelete({bookclubName:'TimePassBookClub'})
    await mongoose.connection.close();
})

describe('Book Club Create, Add users, remove users, get all book club tests', () => {
    
    test('Create book club', async ()=>{
        const req = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                info: 'TestBookClub',
                user: 'trialuser'
            },
            method: 'POST',
            headers: { 'x-auth-username': 'trialuser' },
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

        await createBookclub(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.message).toBe('new Bookclub is created!!')
            expect(res.json.data.newBookclub.bookclubName).toBe('TimePassBookClub')
            expect(res.json.data.newBookclub.info).toBe('TestBookClub')
        })

    })

    test('Add more users to book club', async ()=>{
        const req = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                info: 'TestBookClub',
                user: 'Zeel'
            },
            method: 'POST',
            headers: { 'x-auth-username': 'Zeel' },
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

        await addUserToClub(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.message).toBe('new user Zeel added!')
        })

    })

    test('Get all book club', async ()=>{
        const req = await mockRequest({
            method: 'GET',
            headers: { 'x-auth-username': 'trialuser' },
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

        await getAllClubs(req,res).then( async()=> {
            expect(res.json.status).toBe('Pass');
        })
    })

    test('Find specific book club', async ()=>{
        const req = await mockRequest({
            params:{
                bookclubName: 'TimePassBookClub'
            },
            method: 'GET',
            headers: { 'x-auth-username': 'trialuser' },
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

        await getBookclub(req,res).then( async()=> {
            expect(res.json.status).toBe('Success');
            expect(res.json.message.bookclubName).toBe('TimePassBookClub')
        })
    })

    test('Send messages into the book club', async ()=>{
        const req = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                data:
                {
                    sender: "trialuser",
                    time:"test time",
                    message:"Hello trialuser!"
                }
            },
            method: 'POST',
            headers: { 'x-auth-username': 'trialuser' },
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

        await saveMessage(req,res).then( async()=> {
            expect(res.json.status).toBe('Success');
            expect(res.json.message).toBe('message got from trialuser')
        })

        const req1 = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                data:
                {
                    sender: "Zeel",
                    time:"test time",
                    message:"Hello Zeel!"
                }
            },
            method: 'POST',
            headers: { 'x-auth-username': 'Zeel' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res1 = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })

        await saveMessage(req1,res1).then( async()=> {
            expect(res1.json.status).toBe('Success');
            expect(res1.json.message).toBe('message got from Zeel')
            expect(res1.json.data[0].message).toBe('Hello trialuser!')
            expect(res1.json.data[1].message).toBe('Hello Zeel!')
        })
    })

    test('Delete book club', async ()=>{
        const req = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                info: 'TestBookClub',
                user: 'trialuser'
            },
            method: 'POST',
            headers: { 'x-auth-username': 'trialuser' },
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

        await removeUserfromClub(req,res).then( async()=> {
            expect(res.json.status).toBe('Success');
            expect(res.json.message).toBe('User trialuser is been successfully remove from book club!!')
        })

        const req1 = await mockRequest({
            body: { 
                bookclubName: 'TimePassBookClub',
                info: 'TestBookClub',
                user: 'Zeel'
            },
            method: 'POST',
            headers: { 'x-auth-username': 'Zeel' },
            header: function (header) {
                return this.headers[header]
            }
        })
        const res1 = await mockResponse({
            hostname: 'tester',
            status: function (statusCode) {
                this.status = statusCode
            },
            json: function (body) {
                this.json = body
            }
        })

        await removeUserfromClub(req1,res1).then( async()=> {
            expect(res1.json.status).toBe('Success');
            expect(res1.json.message).toBe('User Zeel is been successfully remove from book club!!')
        })
    })

})