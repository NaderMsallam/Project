const { chatModel } = require("../models/chat");
const { mongoose } = require("mongoose");

const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

class chatHistoryService {
  //get all previous chat history of the user via email
  async getChatHistory(email) {
    return await chatModel.find({ email: email }).exec();
  }

  //add chat givin to the chat-history database
  async addToChatHistory(data) {
    return await chatModel.create(data, function (err, collection) {
      if (err) {
        console.log(err);
      } else {
        console.log("chat inserted succesfully");
        return data;
      }
    });
  }
}
module.exports = { chatHistoryService: new chatHistoryService() };
