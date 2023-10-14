const { validationResult } = require("express-validator");

const validateRequestBody = (model) => (req, res, next) => {
  const schemaFields = Object.keys(model.schema.obj);
  const requestFields = Object.keys(req.body);

  const missingFields = schemaFields.filter(
    (field) => !requestFields.includes(field),
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Required fields missing: ${missingFields.join(', ')}`,
    });
  }
  next();
};

const validateFieldPresence = (...fieldNames) => {
  return (value, { req }) => {
    const requestKeys = Object.keys(req.body);
    const missingFields = fieldNames.filter(fieldName => !requestKeys.includes(fieldName));
    if (missingFields.length > 0) {
      throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
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
