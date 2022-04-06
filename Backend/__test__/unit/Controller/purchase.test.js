const mongoose = require('mongoose');
const { mockRequest, mockResponse } = require('mock-req-res')
const boughtBooks = require('../../../models/boughtBookModel')
const {checkPaymentValidation , getAllBooks} = require('../../../Controller/purchaseController');

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
    await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
    await mongoose.connection.close();
})

describe('Book purchase check payment validation and get all book tests', () => {
    
    test('Purchase book with correct crenditial', async ()=>{
        const req = await mockRequest({
            body: { 
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'trialuser',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
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

        await checkPaymentValidation(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
            expect(res.json.found.id).toBe('81hf8fsdg334sda74rw2sfdcvd723')
            expect(res.json.found.username).toBe('trialuser')
            expect(res.json.found.title).toBe('test book')
            expect(res.json.found.subTitle).toBe('test sub title')
            expect(res.json.found.description).toBe('test description')
        })
    })

    test('Purchase book with wrong user name', async ()=>{
        const req = await mockRequest({
            body: { 
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'trialuserNotExists',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            },
            method: 'POST',
            headers: { 'x-auth-username': 'trialuserNotExists' },
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

        await checkPaymentValidation(req,res).then( async()=> {
            expect(res.json.status).toBe('failed');
            expect(res.json.message).toBe('No such user: trialuserNotExists')
        })
    })

    test('Purchase book if it is already exists', async ()=>{
        const req = await mockRequest({
            body: { 
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'trialuser',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
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

        await checkPaymentValidation(req,res).then( async()=> {
            expect(res.json.status).toBe('failed');
            expect(res.json.message).toBe('Book already exist title: test book')
        })
    })

    test('Get all purchased book', async ()=>{
        const req = await mockRequest({
            query: { 
                username: 'trialuser',
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

        await getAllBooks(req,res).then( async()=> {
            expect(res.json.status).toBe('success');
        })
    })
})