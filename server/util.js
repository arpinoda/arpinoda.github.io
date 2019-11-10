exports.isInt = function(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
};

exports.createLogItem = function(type, details, message, stack, date) {
  return (
    `
    -----
    Log Item Received
    ${type}: ${message}
    Client Date: ${date}
    Details: ${details}
    Stack: ${stack}
    -----
    `
  );
}