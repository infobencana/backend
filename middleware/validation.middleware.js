const { validationResult } = require("express-validator");

const validateRequestBody = (model) => (req, res, next) => {
  const schemaFields = Object.keys(model.schema.paths);
  const requestFields = Object.keys(req.body);

  const invalidFields = requestFields.filter(
    (field) => !schemaFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }
  next();
};

const validateFieldPresence = (...fieldNames) => {
  return (value, { req }) => {
    const requestKeys = Object.keys(req.body);
    console.log(requestKeys);
    const invalidFields = requestKeys.filter(fieldName => !fieldNames.includes(fieldName));
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }
    return true;
  };
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ status: false, message: errorMessages[0] });
  }
  next();
};

module.exports = {
  validateRequestBody,
  validateFieldPresence,
  handleValidationErrors,
};
