let getBooksResponse = function(bookArray) {
    //Generate Book Array to return
    let bookShelf = [];

    for (i = 0; i < 40; i++) {
        let book = {
            title: bookArray.items[i].volumeInfo.title,
            //
        };

        bookShelf.push(book);
    }

    return bookShelf;
};

module.exports.getBooksResponse = getBooksResponse;