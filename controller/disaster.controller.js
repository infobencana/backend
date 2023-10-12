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

// Missing People = people_gone
module.exports.UpdateMissingPeople = async (req, res) => {
  try {
    logger.info("Update missing people::", req.params);
    const { id } = req.params;
    const updateFields = req.body;
    const missingPeople = await missingPeopleService.updateMissingPeople(
      id,
      updateFields
    );
    res.status(200).json({ message: "OK", status: true, data: missingPeople});
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error."});
  }
}

// Add a person to people_gone
module.exports.AddPeopleGone = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const peopleData = req.body;
    const disaster = await disasterService.addPeopleGone(disasterId, peopleData);
    res.status(200).json({message: "OK", status: true, data: disaster});
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error."});
  }
}

// // Update a person in people_gone
// module.exports.UpdatePeopleGone = async (req, res) => {
//   try {
//     const { disasterId, personId } = req.params;
//     const updateFields = req.body;
//     const disaster = await disasterService.updatePeopleGone(disasterId, personId, updateFields);
//     res.status(200).json(disaster);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

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

// Please make delete missing people or people gone in disaster.controller.js
module.exports.DeletePeopleGone = async (req, res) => {
  try {
    logger.info("Deleting missing people::", req.params);
    const peopleGone = await disasterService.deletePeopleGone(req.params.disasterId, req.params.id); // Call the correct function
    // Respond with a success message
    res.status(200).json({ status: true, message: "Person successfully deleted", data: peopleGone });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
}
