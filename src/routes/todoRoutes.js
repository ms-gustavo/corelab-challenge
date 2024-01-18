const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers");

router.post("/todos", todoController.createTodo);

router.get("/todos", todoController.getAllTodos);

router.get("/todos/:id", todoController.getTodoById);

router.put("/todos/:id", todoController.updateTodo);

router.delete("/todos/:id", todoController.deleteTodo);

router.put("/todos/:id/favorite", todoController.markAsFavorite);

router.put("/todos/:id/color", todoController.setColor);

router.get("/todos/favorites", todoController.getAllFavoriteTodos);

router.get("/todos/color/:color", todoController.getTodosByColor);

module.exports = router;
