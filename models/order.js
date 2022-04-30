const {mongoose} = require('mongoose');
const OrderSchema = new mongoose.Schema({
    email: String,
    date: { type: Date, default: Date.now },
    order: [{title: String,
    description:String ,
    price:Number}]
  });
  const orderModel = mongoose.model("orders", OrderSchema);
   module.exports={orderModel}
