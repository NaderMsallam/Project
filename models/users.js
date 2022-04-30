const {mongoose} = require('mongoose');
const UsersSchema = new mongoose.Schema({
    name: String,
    lastName:String,
    id:{type: Number, unique: true},
    address:{zip:Number, state:String, street:String},
    phone:String ,
    email: { type: String, unique: true, required: "requiered email" },
    password: String,
    photo: { type: String},
    role:String,
  });
  const UsersModel = mongoose.model("Users1", UsersSchema);
   module.exports={UsersModel}
