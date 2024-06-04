const zod = require("zod");

const createTodo = zod.object({
  title: zod.string().min(1),
  description: zod.string(),
});

const updateTodo = zod.object({
  id: zod.string(),
  title: zod.string().min(1),
  description: zod.string(),
});

const deleteTodo = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
