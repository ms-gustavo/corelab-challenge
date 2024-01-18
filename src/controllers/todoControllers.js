const Todo = require("../models/Todo");
const {
  handleNotFoundError,
  handleInternalServerError,
  sendSuccessWithData,
  sendNoContent,
  sendCreatedWithData,
} = require("../helpers/ReturnStatus");

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return sendCreatedWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return sendSuccessWithData(res, todos);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getAllFavoriteTodos = async (req, res) => {
  try {
    const favoriteTodos = await Todo.find({ isFavorite: true });
    return sendSuccessWithData(res, favoriteTodos);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return handleNotFoundError(res);
    }
    return sendSuccessWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getTodosByColor = async (req, res) => {
  try {
    const todosByColor = await Todo.find({ color: req.params.color });
    return sendSuccessWithData(res, todosByColor);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return handleNotFoundError(res);
    }
    return sendSuccessWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return handleNotFoundError(res);
    }
    return sendNoContent(res);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.markAsFavorite = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        isFavorite: true,
      },
      { new: true }
    );
    if (!todo) {
      return handleNotFoundError(res);
    }
    return sendSuccessWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.setColor = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { color: req.body.color },
      { new: true }
    );
    if (!todo) {
      return handleNotFoundError(res);
    }
    return sendSuccessWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};
