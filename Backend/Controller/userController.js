const Users = require("../models/userModel");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

exports.createUser = async(req, res) => {
    try {
        if (Boolean(req.body.password)) {
            req.body.password = cryptr.encrypt(req.body.password);
        }
        let newUser = await Users.create(req.body);
        
        newUser.password = cryptr.decrypt(newUser.password);
        res.status(201).json({
            status: "success",
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

exports.updateUser = async(req, res) => {
    try {
        
        if (Boolean(req.body.password)) {
            req.body.password = cryptr.encrypt(req.body.password);
        }
        const updateUser = await Users.findOneAndUpdate({ username: req.params.username },
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        if (updateUser == null) {
            throw err;
        }
        updateUser.password = cryptr.decrypt(updateUser.password);
        res.status(200).json({
            status: "success",
            message: "updated user",
            data: {
                user: updateUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
            description: "Fail to update the user",
        });
    }
};

exports.getUser = async(req, res) => {
    try {
        const user = await Users.findOne({ username: req.params.username });
        user.password = cryptr.decrypt(user.password);

        if (user == null) {
            throw err;
        }

        if (user.password === req.params.password) {
            res.status(200).json({
                status: "success",
                message: "Found user",
                data: {
                    user: user,
                },
            });
        } else {
            throw err;
        }
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
            description: "not found user",
        });
    }
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "err",
        message: "route not yet implemented",
    });
};