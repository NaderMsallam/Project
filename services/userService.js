const { UsersModel } = require("../models/users");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("connection succeeded");
});
class userService {
    //add new user
    async registerUser(data) {
        const newUser = await UsersModel.create(data);
        return newUser;
    }

    //edit existing user based on email given
    async editUser(data) {
        return await UsersModel.findOneAndUpdate({ email: data.email }, {
                email: data.email,
                name: data.name,
                phone: data.phone,
                photo: data.photo,
                lastName: data.lastName,
                id: data.id,
                address: data.address,
                role: data.role,
            },
            (error, user) => {
                if (error) console.log(error);
                else {
                    return user;
                }
            }
        ).clone();
    }

    //login, find all user info based on email given, returns null or error if email or password are incorrect
    async loginUser(data) {
            const user = await UsersModel.findOne({ email: data.email }).exec();
            try {
                console.log(await bcrypt.compare(data.password, user.password));
                if (await bcrypt.compare(data.password, user.password)) {


                    return user;
                } else {
                    console.log("wrong password");
                    return null;
                }
            } catch (error) {
                console.log("no user found");
            }


            return user;
        }
        // get all user info based on email given
    async getUserbyId(data) {
            let user = await UsersModel.findOne({ email: data.email });
        }
        // get all users
    async getAllUsers() {
            return await UsersModel.find({});
        }
        //delete existing user
    async deleteUser(data) {
        return await UsersModel.findOneAndDelete({ _id: data._id }, (err, user) => {
            if (err) console.log(err);
            else return user;
        }).clone();
    }

    // change old password with new one, returns error or null if email was valid but password was wrong
    async changePassword(data) {
        const user = await UsersModel.findOne({ email: data.email }).exec();
        if (await bcrypt.compare(data.oldPassword, user.password)) {
            const newPassHashed = await bcrypt.hash(data.newPassword, 10);
            return await UsersModel.findOneAndUpdate({ email: data.email }, {
                    password: newPassHashed,
                },
                (error, user) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("changed password, new user:");
                        console.log(user);
                        return user;
                    }
                }
            ).clone();
        } else {
            console.log("wrong password");
            return null;
        }
    }
}
module.exports = { userService: new userService() };