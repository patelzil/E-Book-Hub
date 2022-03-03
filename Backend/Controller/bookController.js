const fetch = require("node-fetch");
const bookModel = require("../models/bookModel");

let getAPI = (req) => {
    let api_url;
    if (req.params.hasOwnProperty("bookTitle")) {
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookTitle}+intitle:${req.params.bookTitle}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    } else if (req.params.hasOwnProperty("bookAuthor")) {
        console.log("hello");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookAuthor}+inauthor:${req.params.bookAuthor}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    } else if (req.params.hasOwnProperty("bookCategory")) {
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookCategory}+subject:${req.params.bookCategory}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    } else if (req.params.hasOwnProperty("bookPublisher")) {
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookPublisher}+inpublisher:${req.params.bookPublisher}&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    } else if (req.params.hasOwnProperty("bookTitleFree")) {
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookTitleFree}+intitle:${req.params.bookTitleFree}&filter=free-ebooks&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    } else {
        api_url = `https://www.googleapis.com/books/v1/volumes?q="comedy"+subject:"comedy"&printType=books&maxResults=40&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;
    }

    return api_url;
};

exports.getBook = async(req, res) => {
    let api_url = getAPI(req);
    console.log(api_url);
    try {
        const fetch_response = await fetch(api_url);
        const fetchObject = await fetch_response.json();

        responseBooks = bookModel.getBooksResponse(fetchObject);

        res.status(200).json({
            status: "success",
            data: {
                responseBooks,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};