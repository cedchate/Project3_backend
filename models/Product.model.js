const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: {
    type: Number,
    min: 0,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/diwb7ixo1/image/upload/v1678786905/Project3/t1vh3hhueo8zifqawqw2.jpg",
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
