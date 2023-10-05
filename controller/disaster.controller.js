const disasterService = require("../service/disaster.service");
const { body, validationResult } = require("express-validator");
const logger = require("../logger/api.logger");

module.exports.AddDisaster = async (req, res) => {
  try {
    logger.info("Add disaster : ", req.body);

    const disasterData = req.body;
    const disaster = await disasterService.publishDisaster(
      disasterData,
      req.file,
    );
    res.status(200).json({
      message: "Disaster added",
      success: true,
      data: disaster,
    });
  } catch (error) {
    logger.error(error.message);
    if (error.message.includes("it is undefined")) {
      res
        .status(400)
        .json({
          status: false,
          message: "There's something wrong with the picture",
        });
    } else {
      res.status(500).json({ status: false, message: "Internal server error." });
    }
  }
};

module.exports.GetListDisaster = async (req, res) => {
  try {
    const nameQuery = req.query.name || "";
    const placeQuery = req.query.place || "";
    const typeQuery = req.query.type || "";
    const dateQuery = req.query.date || "";
    const listDisaster = await disasterService.getListDisaster({
      name: nameQuery,
      place: placeQuery,
      type: typeQuery,
      date: dateQuery,
    });
    res.status(200).json({
      message: "OK",
      success: true,
      data: listDisaster,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
