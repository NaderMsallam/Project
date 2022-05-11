const { itemModel } = require("../models/items");
const { mongoose } = require("mongoose");


const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
    //console.log("connection succeeded");
});
class itemService {
    // add new item 
    async addItem(data) {
            return await itemModel.create(data, function(err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("item inserted succesfully");
                    return data;
                }
            });
        }
        // delete item based on it's _id
    async deleteItem(data) {

        return await itemModel.findOneAndDelete({ title: data.title }, (err, item) => {
            if (err) console.log(err);
            else return item;
        }).clone();
    }

    //get item based on it's title
    async getItem(data) {
        return await itemModel.findOne({ title: data.title }, (err, item) => {
            if (err) {
                console.log(err);
            } else return item;
        }).clone();
    }

    // get all items
    async getAllItems() {
        return await itemModel.find({});
    }

    //edit item based on it's _id
    async editItem(data) {
        return await itemModel.findOneAndUpdate({ title: data.title }, {

            title: data.title,
            description: data.description,
            price: data.price,
        }, (error, item) => {
            if (error) console.log(error);
            else {
                return item;
            }
        }).clone();


    }
}


module.exports = { itemService: new itemService() };