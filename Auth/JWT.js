const jwt = require("jsonwebtoken");

const SECRET = "the world is round";
const TIME = 60 * 5; // five minutes

function generateToken(user) {

    return jwt.sign({...user }, SECRET, { expiresIn: TIME });
}

function validateToken(req, res, next) {
    if (!req.cookies) req.cookies = {};

    const token = req.cookies.tokenCookie;
    console.log(token);
    jwt.verify(token, SECRET, (err, data) => {
        if (err) {
            res.status(403).send("Invalided token");
        } else {
            return next();
        }
    });
}

function validateAdminToken(req, res, next) {
    if (!req.cookies) req.cookies = {};

    const token = req.cookies.tokenCookie;
    console.log(token);
    jwt.verify(token, SECRET, (err, data) => {

        if (err) {

            res.status(403).send("Invalided token");
        } else if (data.role != "Admin") {
            console.log("entered not admin");
            return res.status(403).send("Invalided token");
        } else {

            return next();
        }
    });
}
module.exports = { generateToken, validateToken, validateAdminToken };