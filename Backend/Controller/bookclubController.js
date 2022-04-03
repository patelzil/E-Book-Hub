const bookclub = require("../models/bookClubModel");
const users = require("../models/userModel");

exports.createBookclub = async(req, res) => {
    let bookclubExist = await bookclub.findOne({
        bookclubName: req.body.bookclubName,
    });

    if (bookclubExist) {
        res.status(404).json({
            status: "Fail",
            Message: "BookClub already exist",
        });
    } else {
        let newBookclub = await bookclub.create(req.body);

        newBookclub = await bookclub.findOneAndUpdate({
            bookclubName: req.body.bookclubName,
        }, { $push: { Users: req.body.user } });

        let userfromUserTable = await users.findOne({ username: req.body.user });

        userfromUserTable.bookclub.push(newBookclub);

        await users.findOneAndUpdate({
                username: req.body.user,
            },
            userfromUserTable, {
                new: true,
                runValidators: true,
            }
        );

        await res.status(201).json({
            status: "success",
            message: "new Bookclub is created!!",
            data: {
                newBookclub,
            },
        });
    }
};

exports.addUserToClub = async(req, res) => {
    let bookclubExist = await bookclub.findOne({
        bookclubName: req.body.bookclubName,
    });

    if (bookclubExist) {
        let user = req.body.user;

        if (await users.findOne({ username: user })) {
            if (bookclubExist.Users.indexOf(user) == -1) {
                await bookclub.findOneAndUpdate({
                    bookclubName: req.body.bookclubName,
                }, { $push: { Users: user } });

                let userfromUserTable = await users.findOne({
                    username: req.body.user,
                });

                userfromUserTable.bookclub.push(bookclubExist);

                await users.findOneAndUpdate({
                        username: req.body.user,
                    },
                    userfromUserTable, {
                        new: true,
                        runValidators: true,
                    }
                );

                res.status(201).json({
                    status: "success",
                    message: `new user ${req.body.user} added!`,
                });
            } else {
                res.status(404).json({
                    status: "Fail",
                    message: `new user ${req.body.user} already exist! or Use`,
                });
            }
        } else {
            res.status(404).json({
                status: "Fail",
                message: `new user ${req.body.user} please first register`,
            });
        }
    }
};

exports.saveMessage = async(req, res) => {
    let message = req.body.data;

    let club = await bookclub.findOne({
        bookclubName: req.body.bookclubName,
    });

    if (club.Users.indexOf(req.body.data.sender) != -1) {
        club.MessagesInfo.push(message);

        let updatedBookclub = await bookclub.findOneAndUpdate({
                bookclubName: req.body.bookclubName,
            },
            club, {
                new: true,
                runValidators: true,
            }
        );

        console.log(club);

        res.status(201).json({
            status: "Success",
            message: `message got from ${req.body.data.sender}`,
            data: updatedBookclub.MessagesInfo,
        });
    } else {
        res.status(201).json({
            status: "Fail",
            message: `User doent exist in bookclub ${req.body.bookclubName}`,
        });
    }
};

exports.getAllClubs = async(req, res) => {
    let allClubs = await bookclub.find();
    console.log(allClubs);
    if (allClubs) {
        res.status(201).json({
            status: "Pass",
            message: allClubs,
        });
    } else {
        res.status(404).json({
            status: "Fail",
            message: "Unable to retrive all book clubs",
        });
    }
};

exports.removeUserfromClub = async(req, res) => {
    let bookclubExist = await bookclub.findOne({
        bookclubName: req.body.bookclubName,
    });

    if (bookclubExist) {
        let users_array = bookclubExist.Users;

        let index = users_array.indexOf(req.body.user);
        if (index != -1) {
            bookclubExist.Users.splice(index, 1);
            await bookclub.findOneAndUpdate({
                    bookclubName: req.body.bookclubName,
                },
                bookclubExist, {
                    new: true,
                    runValidators: true,
                }
            );

            //----------------------------------------------------------------------------------------

            let user = await users.findOne({ username: req.body.user });

            let users_bookclubs = user.bookclub;
            let index_finder = 0;
            for (let i = 0; i < users_bookclubs.length; i++) {
                if (users_bookclubs[i].bookclubName === req.body.bookclubName) {
                    index_finder = i;
                }
            }

            users_bookclubs.splice(index_finder, 1);

            console.log(user);

            await users.findOneAndUpdate({
                    username: req.body.user,
                },
                user, {
                    new: true,
                    runValidators: true,
                }
            );

            //--------------------------------------------------------------------------------------------

            res.status(201).json({
                status: "Success",
                message: `User ${req.body.user} is been successfully remove  from book club!!`,
            });
        } else {
            res.status(404).json({
                status: "Fail",
                message: `User ${req.body.user} does not exist in a book club ${req.body.bookclubName} cannot delete!!`,
            });
        }
    } else {
        res.status(404).json({
            status: "Fail",
            message: `Bookclub ${req.body.bookclubName} doesnt exist so cant delte user`,
        });
    }
};

exports.getBookclub = async(req, res) => {
    let club = await bookclub.findOne({ bookclubName: req.params.bookclubName });
    console.log(club);

    if (club) {
        res.status(201).json({
            status: "Success",
            message: club,
        });
    } else {
        res.status(404).json({
            status: "Fail",
            message: `Unable to find Bookclub ${req.params.bookclubName}`,
        });
    }
};