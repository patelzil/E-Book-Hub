let checkBookValue = function(book) {
    if (book.title === undefined) {
        book.title = "NOT AVAILABLE";
    }
    if (book.subTitle === undefined) {
        book.subTitle = "NOT AVAILABLE";
    }
    if (book.authors === undefined) {
        book.authors = "NOT AVAILABLE";
    }

    if (book.publisher === undefined) {
        book.publisher = "NOT AVAILABLE";
    }
    if (book.publishDate === undefined) {
        book.publishDate = "NOT AVAILABLE";
    }
    if (book.description === undefined) {
        book.description = "NOT AVAILABLE";
    }

    if (book.pageCount === undefined) {
        book.pageCount = "NOT AVAILABLE";
    }

    if (book.imageLink === undefined) {
        book.imageLink = "NOT AVAILABLE";
    }
    if (book.price === undefined) {
        book.price = "FREE";
    }

    return book;
};

let getBooksResponse = function(bookArray) {
    //Generate Book Array to return
    let bookShelf = [];

    for (i = 0; i < 40; i++) {
        if (typeof bookArray.items[i].volumeInfo !== undefined) {
            let book = {
                title: bookArray.items[i].volumeInfo.title,
                subTitle: bookArray.items[i].volumeInfo.subtitle,
                authors: bookArray.items[i].volumeInfo.authors,
                publisher: bookArray.items[i].volumeInfo.publisher,
                publishDate: bookArray.items[i].volumeInfo.publishedDate,
                description: bookArray.items[i].volumeInfo.description,
                pageCount: bookArray.items[i].volumeInfo.pageCount,
                imageLink: bookArray.items[i].volumeInfo.imageLinks,
                price: bookArray.items[i].saleInfo.retailPrice,
            };

            book = checkBookValue(book);

            bookShelf.push(book);
        }
    }

    return bookShelf;
};

module.exports.getBooksResponse = getBooksResponse;