const jwt = require("jsonwebtoken");

const secret = "the world is round";

function generateToken(user) {
  let time = 60; // One minute
  return jwt.sign({ ...user }, secret, { expiresIn: time });
}

function validateToken(req, res, next) {
  if (!req.cookies) req.cookies = {};

  const token = req.cookies.tokenCookie;
  console.log(token);
  jwt.verify(token, secret, (err, data) => {
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
  jwt.verify(token, secret, (err, data) => {
   
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
