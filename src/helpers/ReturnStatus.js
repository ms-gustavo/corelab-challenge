function handleNotFoundError(res) {
  return res.status(404).json({ error: "Todo not found" });
}

function handleInternalServerError(res) {
  return res.status(500).json({ error: "Internal Server Error" });
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

module.exports = {
  handleNotFoundError,
  handleInternalServerError,
  sendSuccessWithData,
  sendNoContent,
  sendCreatedWithData,
};
