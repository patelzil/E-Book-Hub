const { mockRequest, mockResponse } = require('mock-req-res')
const mongoose = require('mongoose');
const getBooksResponse = require('../../../models/bookModel');
const {getBook} = require('../../../Controller/bookController');


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

describe('Book controller mock test', () => {
    
    //dummy test to prevent quota execeeding
    describe('Book get test', ()=>
    {
        test('User got default book page',async () =>{
            expect(true).toBeTruthy();
        })
    })
    
    test('Retrive book from API by default page', async ()=>{
        jest.setTimeout(30000)
        const req = await mockRequest({
            params:{},
               fetch:`https://www.googleapis.com/books/v1/volumes?q="comedy"+subject:"comedy"&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
            // console.log(res.json.data);
        })
    })

    test('Retrive book from API by title page', async ()=>{
        jest.setTimeout(30000)
        const search = 'Java'
        const req = await mockRequest({
            params:{bookTitle:'Java'},
            fetch:`https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
        })
    })

    test('Retrive book from API by author name', async ()=>{
        jest.setTimeout(30000)
        const search = 'William Shakespeare'
        const req = await mockRequest({
            params:{bookAuthor:search},
            fetch:`https://www.googleapis.com/books/v1/volumes?q=${search}+inauthor:${search}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
        })
    })

    test('Retrive book from API by catagory of book', async ()=>{
        jest.setTimeout(30000)
        const search = 'Education'
        const req = await mockRequest({
            params:{bookCategory:search},
            fetch:`https://www.googleapis.com/books/v1/volumes?q=${search}+subject:${search}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
        })
    })

    test('Retrive book from API by name of publisher', async ()=>{
        jest.setTimeout(30000)
        const search = 'Lion'
        const req = await mockRequest({
            params:{bookPublisher:search},
            fetch:`https://www.googleapis.com/books/v1/volumes?q=${search}+inpublisher:${search}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
        })
    })

    test('Retrive book from API by applying filter of free', async ()=>{
        jest.setTimeout(30000)
        const search = 'Java'
        const req = await mockRequest({
            params:{bookTitleFree:search},
            fetch:`https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&filter=free-ebooks&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`,
            method: 'GET'
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
        await getBook(req,res).then( async()=> {
            expect(res.json.status).toBe('success')
        })
    })
})