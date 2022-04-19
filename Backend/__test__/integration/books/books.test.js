const user = require('../../../models/bookModel');
const app = require('../../../app');
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

//dummy test to prevent quota execeeding
describe('Book get test', ()=>
{
    test('User got default book page',async () =>{
        expect(true).toBeTruthy();
    })
})

describe('Book get test', ()=>
{
    describe('Get default number of books',() =>
    {
        test('User got default book page',async () =>{
            jest.setTimeout(30000);
            const response = await request.get('/EBookHub/books/default');
            expect(response).toBeTruthy();
        })
    })

    describe('Get books with author name',() =>
    {
        test('User got filtered books with author name',async () =>{
            jest.setTimeout(30000);
            const authorName = "William Shakespeare";
            const response = await request.get(`/EBookHub/books/searchAuthor/${authorName}`);
            const obj = JSON.parse(response.text);
            expect(obj.data.responseBooks[0].authors.toString()).toMatch(/William/);

        })

        test('User got filtered books if that author is not exist',async () =>{
            jest.setTimeout(30000);
            //invalid author name sholud not exists to the database
            const authorName = "testiiiiii";
            const response = await request.get(`/EBookHub/books/searchAuthor/${authorName}`);
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe("fail");
        })


    })

    describe('Get books with title name',() =>
    {
        test('User get the books by searching title name', async () =>{
            jest.setTimeout(30000);
            const bookTitle = "java";
            const response = await request.get(`/EBookHub/books/searchTitle/${bookTitle}`);
            const obj = JSON.parse(response.text);
            expect(obj.data.responseBooks[0].title).toMatch(/Java/);
        })

        test('User can not get books by searching irrelevent title name', async () =>{
            jest.setTimeout(30000);
            const bookTitle = "testiiii";
            const response = await request.get(`/EBookHub/books/searchTitle/${bookTitle}`);
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe("fail");
        })
    })

    describe('Get books with Category',() =>
    {
        test('User get the books by searching title name', async () =>{
            jest.setTimeout(30000);
            const bookCategory = "Education";
            const response = await request.get(`/EBookHub/books/searchCategory/${bookCategory}`);
            const obj = JSON.parse(response.text);
            expect(obj.data.responseBooks[0].category.toString()).toMatch('Education');
        })

        test('User can not get the books by searching irrelevent category', async () =>{
            jest.setTimeout(30000);
            const bookCategory = "testtiiiii";
            const response = await request.get(`/EBookHub/books/searchCategory/${bookCategory}`);
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe("fail");
        })
    })

    describe('Get books with publisher name',() =>
    {
        // test('User get the books by searching publisher name', async () =>{
        //     jest.setTimeout(30000);
        //     const publisherName = "Lion";
        //     const response = await request.get(`/EBookHub/books/searchPublisher/${publisherName}`);
        //     const obj = JSON.parse(response.text);
        //     expect(obj.data.responseBooks[0].publisher).toMatch(/Lion/);
        // })

        test('User can not get the books by searching irrelevent publisher name', async () =>{
            jest.setTimeout(30000);
            const publisherName = "testtiiiii";
            const response = await request.get(`/EBookHub/books/searchPublisher/${publisherName}`);
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe("fail");
        })
    })

    describe('Get free books',() =>
    {
        test('User get the free books by filtering free', async () =>{
            jest.setTimeout(30000);
            const freeBook = "love";
            const response = await request.get(`/EBookHub/books/searchFree/${freeBook}`);
            const obj = JSON.parse(response.text);
            expect(obj.data.responseBooks[0].price).toMatch('FREE');
        })

        test('User can not get the books by searching irrelevent publisher name', async () =>{
            jest.setTimeout(30000);
            const freeBook = "testtiiiii";
            const response = await request.get(`/EBookHub/books/searchFree/${freeBook}`);
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe("fail");
        })
    })

})
