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
});

const Message = model("Message", messageSchema);

module.exports = Message;
