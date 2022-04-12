const Users = require('../../../models/userModel');
const boughtBooks = require("../../../models/boughtBookModel");
const checkPaymentValidation = require("../../../Controller/purchaseController");
const app = require('../../../app');
let supertest = require('supertest');
let request = supertest(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

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
    //making sure that we have deleted the test user from the database
    await Users.findOneAndDelete({username: 'TestUser1'})
    await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
    await mongoose.connection.close();
})

describe('Add book to the Users Dashboard', () => {

    describe('User should not be able to add book with invalid username',() =>
    {
        test('User is not found in database',async () =>
        {
            const expectedResponse = {
                status: 404,
                success: 'failed',
                msg: 'No user found'
            }
            jest.setTimeout(30000);
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'NOT FOUND USER',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            });
            expect(response.status).toBe(expectedResponse.status);
        })
    })

    describe('User should be able to add book with valid username',() =>
    {
        test('Add user in the database', async() => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail1@com.ca',
                username: 'TestUser1',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
        })
        test('Purchase book and add it to the Specific user account', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            
            expect(response.status).toBe(expectedResponse.status);
            await Users.findOneAndDelete({username: 'TestUser1'});
            await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
        })
    })

    describe('Retriving all of the added books in user account',() =>
    {
        test('Add user in the database', async() => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail1@com.ca',
                username: 'TestUser1',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
        })
        test('Purchase book and add it to the Specific user account', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '8134sda74rw2sfe324dcvd723', 
                username: 'TestUser1',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response.status).toBe(expectedResponse.status);

            const response1 = await request.post('/EBookHub/books/purchase/payment').send({
                id: '8134sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book unique',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response1.status).toBe(expectedResponse.status);
        })

        const expectedResponse1 = {
            id: '8134sda74rw2sfe324dcvd723'
        }
        const expectedResponse2 = {
            id: '8134sda74rw2sfdcvd723'
        }

        test('User should not be able to access book if username not exits', async() =>{
            const response = await request.get('/EBookHub/books/purchase/boughtBooks/getAll').query(
                {
                    username:'TestUserInvalid'
                }
            )
            const obj = JSON.parse(response.text);
            expect(obj.status).toBe('failed');
        })

        test('User should be able to Get all added books', async() =>{
            const response = await request.get('/EBookHub/books/purchase/boughtBooks/getAll').query({
                username:'TestUser1'
            })
            const obj = JSON.parse(response.text);
            expect(obj.found[0].id).toMatch(expectedResponse1.id);
            expect(obj.found[1].id).toMatch(expectedResponse2.id);
            
            await Users.findOneAndDelete({username: 'TestUser1'});
            await boughtBooks.findOneAndDelete({id: '8134sda74rw2sfdcvd723'});
            await boughtBooks.findOneAndDelete({id: '8134sda74rw2sfe324dcvd723'});
        })
    })
    
    describe('User should not be able to add book with the same if it is already exists',() =>
    {
        test('Add user in the database', async() => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail1@com.ca',
                username: 'TestUser1',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
        })
        test('Purchase book and add it to the Specific user account', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response.status).toBe(expectedResponse.status);
        })

        test('User should not be able to add the same book as before', async() => {
            
            const expectedResponse = {
                status: 404,
                success: 'failed',
                msg: 'Book already exists'
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response.status).toBe(expectedResponse.status);
            await Users.findOneAndDelete({username: 'TestUser1'});
            await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
        })
    })

    describe('User should be able to add more than one unique books to their dashboard',() =>
    {
        test('Add user in the database', async() => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail1@com.ca',
                username: 'TestUser1',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
        })
        test('Purchase book and add it to dashboard', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '8134sda74rw2sfdcvddadsa723', 
                username: 'TestUser1',
                title: 'test book1',
                subTitle: 'test sub title1',
                category: 'test category1',
                description: 'test description1'
            })
            expect(response.status).toBe(expectedResponse.status);
            
            const response1 = await request.post('/EBookHub/books/purchase/payment').send({
                id: '8134sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book unique',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response1.status).toBe(expectedResponse.status);
            await Users.findOneAndDelete({username: 'TestUser1'});
            await boughtBooks.findOneAndDelete({id: '8134sda74rw2sfdcvd723'});
            await boughtBooks.findOneAndDelete({id: '8134sda74rw2sfdcvddadsa723'});
        })
    })

    describe('Two different user should be able to add same book to their own dashboard',() =>
    {
        test('Add first user in the database', async() => {
            const response = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName',
                lastName: 'TestLastName',
                eMail: 'TestEmail1@com.ca',
                username: 'TestUser1',
                password: 'Test123@'
            }) 
            expect(response.statusCode).toBe(201);
            
            const response1 = await request.post('/EBookHub/users/createUser').send({
                firstName: 'TestFirstName1',
                lastName: 'TestLastName1',
                eMail: 'TestEmail2@com.ca',
                username: 'TestUser2',
                password: 'Test123@'
            }) 
            expect(response1.statusCode).toBe(201);
        })

        test('Purchase first user book and add it to dashboard', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'TestUser1',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response.status).toBe(expectedResponse.status);
        })

        test('Purchase second user book and add it to dashboard', async() => {
            
            const expectedResponse = {
                status: 200
            }
            
            jest.setTimeout(30000);
            
            const response = await request.post('/EBookHub/books/purchase/payment').send({
                id: '81hf8fsdg334sda74rw2sfdcvd723', 
                username: 'TestUser2',
                title: 'test book',
                subTitle: 'test sub title',
                category: 'test category',
                description: 'test description'
            })
            expect(response.status).toBe(expectedResponse.status);
            
            await Users.findOneAndDelete({username: 'TestUser1'});
            await Users.findOneAndDelete({username: 'TestUser2'});
            await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
            await boughtBooks.findOneAndDelete({id: '81hf8fsdg334sda74rw2sfdcvd723'});
        })
    })
})
