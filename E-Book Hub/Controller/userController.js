//MiddleWear to check for user ID
exports.checkUserID = (req, res, next, val) => {
    next();
};

exports.createUser = (req, res) => {
    res.status("500").json({
        status: "err",
        message: "route not yet implemented",
    });
};

exports.updateUser = (req, res) => {
    res.status("500").json({
        status: "err",
        message: "route not yet implemented",
    });
};

exports.getUser = (req, res) => {
    res.status("500").json({
        status: "err",
        message: "route not yet implemented",
    });
};