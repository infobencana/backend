const disasterService = require("../service/disaster.service");
const { body, validationResult } = require("express-validator");
const logger = require("../logger/api.logger");

module.exports.AddDisaster = async (req, res) => {
  try {
    const disasterData = req.body;
    const disaster = await disasterService.publishDisaster(
      disasterData,
      req.file,
    );
    res.status(200).json({
      message: "Disaster added",
      status: true,
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

module.exports.GetDisasterById = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const existingDisaster = await disasterService.getDisasterById(disasterId);

    if (!existingDisaster) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Disaster not found",
        });
    } else {
      res.status(200).json({
        message: "OK",
        success: true,
        data: existingDisaster,
      });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
}

module.exports.DeleteDisaster = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const existingDisaster = await disasterService.getDisasterById(disasterId);

    if (!existingDisaster) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Disaster not found",
        });
    }

    await disasterService.deleteDisasterById(disasterId);
    return res
        .status(200)
        .json({
          status: true,
          message: "Disaster deleted",
        });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
}

module.exports.UpdateDisaster = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const updateFields = req.body;

    const updatedDisaster = await disasterService.updateDisasterById(
      disasterId,
      updateFields,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Disaster updated",
      data: updatedDisaster,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
}

module.exports.AddPeopleGone = async (req, res) => {
  try {
    logger.info("Adding missing people::", req.params);
    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { disasterId } = req.params;
    const peopleData = req.body;
    const disaster = await disasterService.addPeopleGone(disasterId, peopleData);
    res.status(200).json({message: "OK", status: true, data: disaster});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error."});
  }
}

module.exports.DeletePeopleGone = async (req, res) => {
  try {
    logger.info("Deleting missing people::", req.params);
    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const peopleGone = await disasterService.deletePeopleGone(req.params.disasterId, req.params.id);
    res.status(200).json({ status: true, message: "Person successfully deleted", data: peopleGone });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
}
