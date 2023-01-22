const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Must be at least 1 character long"],
  },
  lastLogin: { type: String, required: true },
  regTime: { type: String, required: true },
  isBlocked: { type: Boolean, required: true },
});

// Static signup method
userSchema.statics.signup = async function (_id, name, email, password, lastLogin, regTime, isBlocked) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ _id, name, email, password: hash, lastLogin, regTime, isBlocked });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  if (user.isBlocked) {
    throw Error("User is blocked");
  }

  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
