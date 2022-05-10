const { Router } = require("express");
const { UsersModel } = require("../models/users");
const router = Router();
const { mongoose } = require("mongoose");
const { userService } = require("../services/userService");
const jsonwebtoken = require("jsonwebtoken");
const { json } = require("express/lib/response");
const bcrypt = require("bcrypt");
const { generateToken, validateToken, validateAdminToken } = require("../Auth/JWT");

//add new user
router.post("/register", async function(req, res) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const id = req.body.id;
    const address = req.body.address;
    const email = req.body.email;
    const pass = await bcrypt.hash(req.body.password, 10);
    const phone = req.body.phone;
    const photo = req.body.photo;
    const role = req.body.role;
    console.log("here:");
    console.log(req.body);

    const data = {
        name: name,
        email: email,
        password: pass,
        phone: phone,
        photo: photo,
        lastName: lastName,
        id: id,
        address: address,
        role: role,
    };
    try { res.json(await userService.registerUser(data)); } catch (e) {
        console.log(e);
        res.json(null);
    }
});

//delete existing user
router.post("/deleteUser", validateToken, async function(req, res) {
    const _id = req.body._id;

    const data = {
        _id: _id,
    };

    res.json(await userService.deleteUser(data));
});

//change old password with new one
router.post('/changePassword', validateToken, async function(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;
    const data = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    }
    res.json(await userService.changePassword(data));
})

//edit user info
router.post("/edit", validateToken, async function(req, res) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const id = req.body.id;
    const address = req.body.address;
    const email = req.body.email;
    const pass = req.body.password;
    const phone = req.body.phone;
    const photo = req.body.photo;

    console.log("here:");
    console.log(req.body);

    const data = {
        name: name,
        email: email,
        password: pass,
        phone: phone,
        photo: photo,
        lastName: lastName,
        id: id,
        address: address,
    };

    res.json(await userService.editUser(data));
});

// login, if user is found generate token and put it in coockies
router.post("/login", async(req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    const data = {
        email: email,
        password: pass,
    };
    console.log("hada ho");

    try {
        const user = await userService.loginUser(data);
        if (!user) {
            res.status(404).send("something wronggg");
        } else {
            data.role = user.role;
            const token = generateToken(data);
            res.cookie("tokenCookie", token, {
                secure: true,
                httpOnly: true,
                maxAge: 1000 * 60 * 5, //5 mins
            });
            console.log(token);
            res.json(user);
        }
    } catch (error) {
        console.log(error);
    }
});


//get all users for user list of admin
router.get("/getAllUsers", validateAdminToken, async(req, res) => {
    res.json(await userService.getAllUsers());
});

//logout and clear cookies of token
router.get("/logout", async(req, res) => {
    console.log("res.cookie");
    res.clearCookie("tokenCookie", { path: "/" });
    res.status(200).json("User Logged out");

});

module.exports = router;