const { isValid } = require("date-fns");

exports.validateInputDisaster = (req, res, next) => {
  const { name, place, detail } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ status: false, message: "Name can't be empty" });
  }

  if (!isValid(new Date(detail.date))) {
    return res.status(400).json({
      status: false,
      message: "Invalid date format, please use ISO 8601",
    });
  }

  if (!detail.type) {
    return res
      .status(400)
      .json({ status: false, message: "Detail type can't be empty" });
  }

  if (!detail.description) {
    return res
      .status(400)
      .json({ status: false, message: "Detail description can't be empty" });
  }

  if (!place) {
    return res
      .status(400)
      .json({ status: false, message: "Place can't be empty" });
  }

  if (!detail.status) {
    return res
      .status(400)
      .json({ status: false, message: "Detail status can't be empty" });
  }

  if (!detail.status) {
    return res
      .status(400)
      .json({ status: false, message: "Detail status can't be empty" });
  }

  const validStatusValues = ["aman", "waspada", "pemulihan", "darurat"];
  if (!validStatusValues.includes(detail.status)) {
    return res.status(400).json({
      status: false,
      message: "Invalid status value. Status should be aman, waspada, pemulihan, or darurat",
    });
  }

  next();
};

exports.validateDisasterSchema = (req, res, next) => {
  const allowedFields = [
    'name',
    'detail',
    'place',
    'victim',
    'latitude',
    'longitude',
    'donations',
    'picture',
    'people_gone',
    'discuss',
    'timestamp',
  ];

  const requestData = req.body;
  const invalidFields = [];

  for (const field in requestData) {
    if (!allowedFields.includes(field)) {
      invalidFields.push(field);
    }
  }

  if (invalidFields.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Invalid argument names: ${invalidFields.join(', ')}`,
    });
  }

  next();
};

exports.validateDonationSchema = (req, res, next) => {
  const donationFields = ['type', 'platform_name', 'source', 'holder_name'];

  const requestData = req.body.donations;
  const invalidFields = [];

  for (const field in requestData) {
    if (!donationFields.includes(field)) {
      invalidFields.push(field);
    }
  }

  if (invalidFields.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Invalid argument names in donationSchema: ${invalidFields.join(', ')}`,
    });
  }

  next();
};



exports.validateAddPeopleGone = (req, res, next) => {
    const { name, status, last_seen } = req.body;
    if (!name) {
        return res
          .status(400)
          .json({ status: false, message: "Name can't be empty" });
    }

    if (!status) {
        return res
          .status(400)
          .json({ status: false, message: "Status can't be empty" });
    }

    if (!last_seen) {
      return res
        .status(400)
        .json({ status: false, message: "Last seen can't be empty" });
    }
}