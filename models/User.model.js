const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 500,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/diwb7ixo1/image/upload/v1678718285/Project3/bgq8pzippbwxhl4i2xcv.jpg",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
