const Users = require("../models/userModel");

exports.createUser = async(req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status("201").json({
            status: "sucess",
            message: "new user created",
            data: {
                newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
            description: "Fail to create new user",
        });
    }
};

exports.updateUser = (req, res) => {
    res.status("500").json({
        status: "err",
        message: "route not yet implemented",
    });
};

exports.getUser = async(req, res) => {
    try {
        const user = await Users.findOne({ username: req.params.username });
        if (user == null) {
            throw err;
        }
        res.status("200").json({
            status: "sucess",
            message: "Found user",
            data: {
                user: user,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
            description: "not found user",
        });
    }
};

exports.deleteUser = (req, res) => {
    res.status("500").json({
        status: "err",
        message: "route not yet implemented",
    });
};