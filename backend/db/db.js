const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoApp");

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo: Todo,
  User: User,
};


