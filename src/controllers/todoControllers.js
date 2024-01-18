const Todo = require("../models/Todo");
const {
  handleNotFoundError,
  handleInternalServerError,
  sendSuccessWithData,
  sendNoContent,
  sendCreatedWithData,
  handleInvalidColor,
  handleValidationError,
  sendSuccessIfDontFindTodos,
  handleInvalidColorError,
} = require("../helpers/ReturnStatus");
const validColors = require("../helpers/ValidColors");
const { isValidColor } = require("../helpers/isValidColors");

exports.createTodo = async (req, res) => {
  try {
    const requiredFields = ["title", "description"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(`Missing ${field}`);
      }
    });
    if (missingFields.length > 0) {
      return handleValidationError(res, missingFields);
    }
    const todo = await Todo.create(req.body);
    return sendCreatedWithData(res, todo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return sendSuccessIfDontFindTodos(res);
    }

    return sendSuccessWithData(res, todos);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.getAllFavoriteTodos = async (req, res) => {
  try {
    const favoriteTodos = await Todo.find({ isFavorite: true });
    if (favoriteTodos.length === 0) {
      return sendSuccessIfDontFindTodos(res);
    }
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
  const requestedColor = req.params.color.toLowerCase();

  if (!isValidColor(requestedColor)) {
    return handleInvalidColorError(res);
  }

  try {
    const todosByColor = await Todo.find({ backgroundColor: requestedColor });
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
    const todo = await Todo.findById(req.params.id);
    if (todo === null) {
      return handleNotFoundError(res);
    }
    todo.isFavorite = !todo.isFavorite;
    const updatedTodo = await todo.save();
    return sendSuccessWithData(res, updatedTodo);
  } catch (error) {
    return handleInternalServerError(res);
  }
};

exports.setColor = async (req, res) => {
  try {
    const { backgroundColor, textColor } = req.body;

    if (
      !validColors.includes(backgroundColor) ||
      !validColors.includes(textColor)
    ) {
      return handleInvalidColor(res);
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        backgroundColor,
        textColor,
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
