const fetch = require("node-fetch");
const bookModel = require("../models/bookModel");

let getAPI = (req) => {
    let api_url;
    let search;
    if (req.params.hasOwnProperty("bookTitle")) {
        search = String(req.params.bookTitle).replaceAll(" ", "%20");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    } else if (req.params.hasOwnProperty("bookAuthor")) {
        search = String(req.params.bookAuthor).replaceAll(" ", "%20");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${search}+inauthor:${search}&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    } else if (req.params.hasOwnProperty("bookCategory")) {
        search = String(req.params.bookCategory).replaceAll(" ", "%20");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${search}+subject:${search}&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    } else if (req.params.hasOwnProperty("bookPublisher")) {
        search = String(req.params.bookPublisher).replaceAll(" ", "%20");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${search}+inpublisher:${search}&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    } else if (req.params.hasOwnProperty("bookTitleFree")) {
        search = String(req.params.bookTitleFree).replaceAll(" ", "%20");
        api_url = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&filter=free-ebooks&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    } else {
        api_url = `https://www.googleapis.com/books/v1/volumes?q="comedy"+subject:"comedy"&printType=books&maxResults=40&key=AIzaSyBODjfrXSyW7jn5UYWA0OMRZ-5q7pH2P-8`;
    }

    return api_url;
};

exports.getBook = async(req, res) => {
    let api_url = getAPI(req);
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