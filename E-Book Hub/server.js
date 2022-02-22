const app = require("./app");
const mongoose = require("mongoose");

//Database config
mongoose
    .connect(
        "mongodb+srv://zeelkhokhariya:Webito@123@cluster0.acf3e.mongodb.net/EbookHub?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log("DB connection successful");
    });

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});