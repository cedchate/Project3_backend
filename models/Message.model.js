const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  content: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sendBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sendTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
