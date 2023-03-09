const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  Category: {
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
