function handleNotFoundError(res) {
  return res.status(404).json({ error: "Todo not found" });
}

function handleValidationError(res, errors) {
  return res.status(400).json({ error: "Validation Error", details: errors });
}

function handleInternalServerError(res) {
  return res.status(500).json({ error: "Internal Server Error" });
}

function handleInvalidColorError(res) {
  return res.status(400).json({ error: "Invalid color" });
}

function sendSuccessIfDontFindTodos(res) {
  return res.status(200).json({ message: "No todos found yet" });
}

function sendSuccessWithData(res, data) {
  return res.status(200).json(data);
}

function sendNoContent(res) {
  return res.status(204).end();
}

function sendCreatedWithData(res, data) {
  return res.status(201).json(data);
}

function handleInvalidColor(res) {
  return res.status(400).json({
    error: "Invalid color(s)",
    details: "Please provide valid values for backgroundColor and textColor.",
  });
}

module.exports = {
  handleNotFoundError,
  handleInternalServerError,
  sendSuccessWithData,
  sendNoContent,
  sendCreatedWithData,
  handleInvalidColor,
  handleValidationError,
  sendSuccessIfDontFindTodos,
  handleInvalidColorError,
};
