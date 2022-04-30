const {mongoose} = require('mongoose');
const ChatSchema = new mongoose.Schema({
    email: String,
    history:String ,
  });
  const chatModel = mongoose.model("chat", ChatSchema);
   module.exports={chatModel}
