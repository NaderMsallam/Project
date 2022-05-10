const { mongoose } = require("mongoose");
const { orderModel } = require("../models/order");

const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
    //console.log("connection succeeded");
});

class orderService {
    // add new order
    async addOrder(data) {
            return await orderModel.create(data, function(err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("order inserted succesfully");
                    return data;
                }
            });
        }
        // get all orders based on the email given
    async getAllOrders(email) {
        return await orderModel.find({ email: email }).exec();
    }

    // get all orders
    async AdminGetAllOrders() {
        return await orderModel.find({});
    }
}
module.exports = { orderService: new orderService() };