const disasterService = require("../service/disaster.service");
const logger = require("../logger/api.logger");
const {
  uploadImageDisaster
} = require("../util/gcs.util");

module.exports.AddDisaster = async (req, res) => {
  try {
    const disasterData = req.body;
    const dataUser = req.user;
    if (req.file) {
      const pictureUrl = await uploadImageDisaster(req.file);
      disasterData.picture = pictureUrl;
    } else if (req.body.picture) {
      disasterData.picture = req.body.picture;
    }
    disasterData.user_detail = dataUser._id;
    const disaster = await disasterService.publishDisaster(disasterData);
    res.status(200).json({
      message: "Disaster added",
      status: true,
      data: disaster,
    });
  } catch (error) {
    logger.error(error.message);
    if (error.message.includes("it is undefined")) {
      res.status(400).json({
        status: false,
        message: "There's something wrong with the picture",
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    }
  }
};

module.exports.GetListDisaster = async (req, res) => {
  try {
    const {
      search,
      sort,
      status
    } = req.query;
    const filter = {};
    if (search) {
      filter.search = search;
    }
    if (sort) {
      filter.sort = sort;
    }
    if (status) {
      filter.status = status;
    }
    const listDisaster = await disasterService.getListDisaster(filter);
    res.status(200).json({
      message: "OK",
      success: true,
      data: listDisaster,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.GetDisasterById = async (req, res) => {
  try {
    const {
      disasterId
    } = req.params;
    const existingDisaster = await disasterService.getDisasterById(disasterId);

    if (!existingDisaster) {
      return res.status(400).json({
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
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.DeleteDisaster = async (req, res) => {
  try {
    const {
      disasterId
    } = req.params;
    const existingDisaster = await disasterService.getDisasterById(disasterId);

    if (!existingDisaster) {
      return res.status(400).json({
        status: false,
        message: "Disaster not found",
      });
    }

    await disasterService.deleteDisasterById(disasterId);
    return res.status(200).json({
      status: true,
      message: "Disaster deleted",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.UpdateDisaster = async (req, res) => {
  try {
    logger.info("Updating disaster::", req.params);
    const {
      disasterId
    } = req.params;
    const updateFields = req.body;
    const dataUser = req.user;

    if (req.file) {
      const pictureUrl = await uploadImageDisaster(req.file);
      updateFields.picture = pictureUrl;
    } else if (req.body.picture) {
      updateFields.picture = req.body.picture;
    }

    updateFields.user_detail = dataUser._id;

    const updatedDisaster = await disasterService.updateDisasterById(
      disasterId,
      updateFields
    );

    res.status(200).json({
      success: true,
      message: "Disaster updated",
      data: updatedDisaster,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.AddPeopleGone = async (req, res) => {
  try {
    logger.info("Adding missing people::", req.params);
    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const {
      disasterId
    } = req.params;
    const peopleData = req.body;
    const disaster = await disasterService.addPeopleGone(
      disasterId,
      peopleData
    );
    res.status(200).json({
      message: "OK",
      status: true,
      data: disaster,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.DeletePeopleGone = async (req, res) => {
  try {
    logger.info("Deleting missing people::", req.params);
    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const peopleGone = await disasterService.deletePeopleGone(
      req.params.disasterId,
      req.params.id
    );
    res.status(200).json({
      status: true,
      message: "Person successfully deleted",
      data: peopleGone,
    });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(500)
      .json({
        status: false,
        message: "Internal server error."
      });
  }
};

module.exports.AddDiscuss = async (req, res) => {
  try {
    logger.info("Adding discuss::", req.params);
    const {
      disasterId
    } = req.params;
    const discussData = req.body;
    discussData.userId = req.user._id;
    const discuss = await disasterService.addDiscussion(
      disasterId,
      discussData
    );
    res.status(200).json({
      status: true,
      message: "OK",
      data: discuss,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.GetDiscussById = async (req, res) => {
  try {
    logger.info("Getting discuss::", req.params);
    const {
      disasterId
    } = req.params;
    const discuss = await disasterService.getDiscussionById(disasterId);
    res.status(200).json({
      status: true,
      message: "OK",
      data: discuss,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.GetWeeklyReports = async (req, res) => {
  try {
    logger.info("Getting weekly reports");
    const reports = await disasterService.weeklyReport();
    res.status(200).json({
      status: true,
      message: "OK",
      data: reports,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.AddImage = async (req, res) => {
  try {
    logger.info("Adding image");
    const file = req.file;
    const pictureUrl = await uploadImageDisaster(file);
    res.status(200).json({
      status: true,
      message: "OK",
      data: pictureUrl,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports.GetLatLong = async (req, res) => {
  try {
    logger.info("Getting latitude and longitude::");

    const latlong = await disasterService.getLatLong();
    res.status(200).json({
      status: true,
      message: "OK",
      data: latlong,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};