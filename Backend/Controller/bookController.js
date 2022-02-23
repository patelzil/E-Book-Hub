const fetch = require("node-fetch");

exports.getBook = async(req, res) => {
    try {
        const api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.bookname}+inauthor:keyes&key=AIzaSyC4JQ0rgJkbS1AB828COl6fV_kUxsGX3Ao`;

        const fetch_response = await fetch(api_url);
        const fetchObject = await fetch_response.json();
        res.status(200).json({
            status: "success",
            data: {
                fetchObject,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};