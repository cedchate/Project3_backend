const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  content: String,
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,

    ref: "Product",

  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
