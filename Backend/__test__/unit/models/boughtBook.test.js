const mongoose = require('mongoose');
const boughtBooks = require('../../../models/boughtBookModel');
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
    
    bookData = {
        id: 'D02LWkkBxn4C',
        title: 'The Complete Works of William Shakespeare',
        subTitle: 'JAVA SE',
        category: 'Education',
        authors: 'William',
        publisher: 'Wordsworth Editions',
        publishDate: '1996',
        description: 'Gathers all of Shakespeare plays, sonnets, and poems.',
        pageCount: 1263,
        imageLink: 'NOT AVAILABLE',
        price: 'FREE',
        rating: '1.5'
    }

    let newBook = new boughtBooks(bookData);
    await newBook.save();
})

afterAll( async () => {
    await boughtBooks.findOneAndDelete({id:'D02LWkkBxn4C'});
    await mongoose.connection.close();
})

describe('Book Model test', () => {
    
    test('Search for book title', async ()=>{
        jest.setTimeout(30000)
        bookName = 'The Complete Works of William Shakespeare'
        const books = await boughtBooks.findOne({title: bookName});
        expect(books.title).toBe(bookName);
    })

    test('Searching for sub title', async ()=>{
        jest.setTimeout(30000)
        subTitleBook = 'JAVA SE'
        const books = await boughtBooks.findOne({subTitle: subTitleBook});
        expect(books.subTitle).toBe(subTitleBook);
    })

    test('Searching for publisher', async ()=>{
        jest.setTimeout(30000)
        publisherBook = 'Wordsworth Editions'
        const books = await boughtBooks.findOne({publisher: publisherBook});
        expect(books.publisher).toBe(publisherBook);
    })

    test('Searching for publisher date', async ()=>{
        jest.setTimeout(30000)
        publisherDateBook = '1996'
        const books = await boughtBooks.findOne({publishDate: publisherDateBook});
        expect(books.publishDate).toBe(publisherDateBook);
    })

    test('Searching for description', async ()=>{
        jest.setTimeout(30000)
        descriptionBook = 'Gathers all of Shakespeare plays, sonnets, and poems.'
        const books = await boughtBooks.findOne({title: 'The Complete Works of William Shakespeare'});
        expect(books.description).toBe(descriptionBook);
    })

    test('Searching for pageCount', async ()=>{
        jest.setTimeout(30000)
        pageCountBook = 1263
        const books = await boughtBooks.findOne({pageCount: pageCountBook});
        expect(books.pageCount).toBe(pageCountBook);
    })

    test('Searching for price', async ()=>{
        jest.setTimeout(30000)
        priceBook = 'FREE'
        const books = await boughtBooks.findOne({price: priceBook});
        expect(books.price).toBe(priceBook);
    })

})