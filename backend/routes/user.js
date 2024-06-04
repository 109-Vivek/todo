const { Router } = require("express");
const { User, Todo } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { createTodo, updateTodo, deleteTodo } = require("../types");
const userMiddleware = require("../middleware/user");
const router = Router();

//User Signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await User.create({ username: username, password: password });
  res.json({
    msg: "User created successfully",
  });
});

//User Signin
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({ username: username, password: password });
  if (user.length > 0) {
    const token = jwt.sign(
      { username: username, password: password },
      JWT_SECRET
    );
    res.json({ token });
  } else {
    res.json("Incorrect username or password");
  }
});

//User create todo
router.post("/createtodo", userMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Something wrong with your inputs",
    });
    return;
  } else {
    const newTodo = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });
    // newTodo._id;
    const response = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = response.username;

    const user = await User.findOne({ username: username });
    if (user.todos && user.todos.includes(newTodo._id)) {
      res.status(401).json({
        msg: "Todo Already present",
      });
    }

    await User.updateOne(
      { username: username },
      { $push: { todos: newTodo._id } }
    );
    res.json({
      msg: "Todo created",
    });
  }
});

//User updates todo
router.put("/update", userMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = updateTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(400).json({
      msg: "Invalid input format",
    });
  }

  try {
    const response = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = response.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const todoId = req.body.id;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    if (user.todos.includes(todoId)) {
      await Todo.findByIdAndUpdate(todoId, {
        title: createPayload.title,
        description: createPayload.description,
        completed: createPayload.completed,
      });
      return res.json({
        msg: "Todo marked as completed",
      });
    } else {
      return res.status(403).json({
        msg: "You cannot Update someone else's todo",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

//user fetches its todos
router.get("/mytodos", userMiddleware, async (req, res) => {
  try {
    const response = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = response.username;
    const user = await User.findOne({ username });
    const mytodos = await Todo.find({
      _id: { $in: user.todos },
    });

    res.status(200).json({
      mytodos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//Delete Todo
router.post("/delete", userMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = deleteTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(400).json({
      msg: "Invalid input format",
    });
  }

  try {
    const response = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = response.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const todoId = req.body.id;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    if (user.todos.includes(todoId)) {
      //Delete from Todo table
      await Todo.findByIdAndDelete(todoId);

      //update todo array of user
      await User.updateOne(
        { username: username },
        { $pull: { todos: todoId } }
      );
      return res.json({
        msg: "Todo Deleted !",
      });
    } else {
      return res.status(403).json({
        msg: "You cannot delete someone else's todo",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;
