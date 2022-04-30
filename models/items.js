const {mongoose} = require('mongoose');
const ItemSchema = new mongoose.Schema({
    title: String,
    description:String ,
    price:Number,
  });
  const itemModel = mongoose.model("items", ItemSchema);
   module.exports={itemModel}
