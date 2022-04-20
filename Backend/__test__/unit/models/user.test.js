const mongoose = require('mongoose');
const Users = require('../../../models/userModel');
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
    userData = {
        firstName: 'TestFirstName',
        lastName: 'TestLastName',
        eMail: 'TestEmailR@com.ca',
        username: 'TestUserR',
        password: 'Test123@'
    }
    let newUser = new Users(userData);
    await newUser.save();
})

afterAll( async () => {
    await Users.findOneAndDelete({username: 'TestUserR'});
    await mongoose.connection.close();
})

describe('User Model test', () => {
    
    test('find User by username test', async ()=>{
        jest.setTimeout(30000)
        username = 'TestUserR'
        const user = await Users.findOne({username});
        expect(user.username).toBe(username);
    })

    test('User should not be find by wrong username', async ()=>{
        jest.setTimeout(30000)
        username = 'TestUserRoman'
        const user = await Users.findOne({username});
        expect(user).toBe(null);
    })
    
    test('User should not be find by wrong password', async ()=>{
        jest.setTimeout(30000)
        password = 'Test123'
        const user = await Users.findOne({password});
        expect(user).toBe(null);
    })

})