const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    enum: ["bike", "equipment", "other"],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
