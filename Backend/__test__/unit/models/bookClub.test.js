const mongoose = require('mongoose');
const bookClub = require('../../../models/bookClubModel');
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
    
    bookClubData = {
        bookclubName: 'TestBookClub',
        info: 'Test Info about the book',
        Users: 'TestUserRutu',
        MessagesInfo: [
            {sender:'TestUserRutu',
            time:'---',
            message:'Test message from TestUserRutu'}
        ]
    }

    let newBookClub = new bookClub(bookClubData);
    await newBookClub.save()
})

afterAll( async () => {
    await bookClub.findOneAndDelete({bookclubName:'TestBookClub'})
    await mongoose.connection.close();
})

describe('Book club Model test', () => {
    
    test('find book club by book club name test', async ()=>{
        jest.setTimeout(30000)
        newBookClub = 'TestBookClub'
        const bookClubs = await bookClub.findOne({bookclubName: newBookClub});
        expect(bookClubs.bookclubName).toBe(newBookClub);
    })

    test('find book club by user name', async ()=>{
        jest.setTimeout(30000)
        userBookClub = 'TestUserRutu'
        const bookClubs = await bookClub.findOne({Users: userBookClub});
        expect(bookClubs.Users[0]).toBe(userBookClub);
    })
    
    test('find out book club info', async ()=>{
        jest.setTimeout(30000)
        infoBookClub = 'Test Info about the book'
        const bookClubs = await bookClub.findOne({info: infoBookClub});
        expect(bookClubs.info).toBe(infoBookClub);
    })
    
    test('find out messages in book club', async ()=>{
        jest.setTimeout(30000)
        senderBookClub = 'TestUserRutu',
        timeBookClub = '---',
        messageBookClub = 'Test message from TestUserRutu'
        
        const bookClubs = await bookClub.findOne({bookclubName: newBookClub});
        expect(bookClubs.MessagesInfo[0].sender).toBe(senderBookClub);
        expect(bookClubs.MessagesInfo[0].time).toBe(timeBookClub);
        expect(bookClubs.MessagesInfo[0].message).toBe(messageBookClub);
    })
    
})