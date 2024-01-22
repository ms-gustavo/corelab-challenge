const validColors = require("./ValidColors");

function isValidColor(color) {
  return validColors.includes(color);
}

module.exports = {
  isValidColor,
};
