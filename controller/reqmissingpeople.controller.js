const missingPeopleService = require("../service/reqmissingpeople.service");
const disasterService = require("../service/disaster.service");
const logger = require("../logger/api.logger");

async function getMissingPeopleById(req, res) {
  try {
    logger.info("Get missing people::", req.params);

    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const missingPeople = await missingPeopleService.getMissingPeopleById(id);

    if (!missingPeople) {
      return res.status(404).json({ message: "Missing people not found" });
    }
    res.status(200).json({ status: true, data: missingPeople });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function getMissingPeople(req, res) {
  try {
    logger.info("Get missing people::", req.params);

    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const missingPeople = await missingPeopleService.getMissingPeople();
    res.status(200).json({ status: true, data: missingPeople });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function deleteMissingPeople(req, res) {
  try {
    logger.info("Delete missing people::", req.params);

    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const existingMissingPerson =
      await missingPeopleService.getMissingPeopleById(id);

    if (!existingMissingPerson) {
      return res
        .status(404)
        .json({ status: false, message: "Orang hilang tidak ditemukan" });
    }
    await missingPeopleService.deleteMissingPeopleById(id);
    res
      .status(200)
      .json({ status: true, message: "Orang hilang berhasil dihapus" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function addMissingPeopleFromDisaster(req, res) {
  try {
    logger.info("Add Missing People from Disaster::", req.body);
    const {
      bencana_id,
      missing_people_id,
      name,
      gender,
      status,
      weight,
      height,
      age,
      address,
      last_seen,
    } = req.body;

    // Check if disaster and missing people exist
    const disaster = await disasterService.getDisasterById(bencana_id);

    if (!disaster) {
      return res
        .status(404)
        .json({ status: false, message: "Bencana tidak ditemukan" });
    }

    // Find missingPeople based on missing_people_id
    const missingPeople = disaster.people_gone.find(
      (person) => person._id.toString() === missing_people_id
    );

    if (!missingPeople) {
      return res
        .status(404)
        .json({ status: false, message: "Orang hilang tidak ditemukan" });
    }

    // Create an object to hold the missing people data
    const missingPeopleData = {
      req_by: req.user._id,
      name: name !== undefined ? name : missingPeople.name,
      bencana_id: disaster._id,
      bencana_name: disaster.name,
      missing_people_id: missingPeople._id,
      gender: gender !== undefined ? gender : missingPeople.gender,
      status: status !== undefined ? status : missingPeople.status,
      weight: weight !== undefined ? weight : missingPeople.weight,
      height: height !== undefined ? height : missingPeople.height,
      age: age !== undefined ? age : missingPeople.age,
      address: address !== undefined ? address : missingPeople.address,
      last_seen: last_seen !== undefined ? last_seen : missingPeople.last_seen,
      req_status: "requested",
    };

    const newMissingPeople =
      await missingPeopleService.createMissingPeople(missingPeopleData);

    res.status(201).json({
      status: true,
      message: "Request missing people sudah ditambahkan",
      data: newMissingPeople,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function updatePeopleGoneInDisaster(req, res) {
  try {
    logger.info("Update people_gone in Disaster::", req.body);

    const roleUser = req.user.role;
    if (roleUser !== "admin") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { req_missing_people_id, req_status } = req.body;

    // Check if the missing people exist
    const missingPeople = await missingPeopleService.getMissingPeopleById(
      req_missing_people_id
    );

    if (!missingPeople) {
      return res
        .status(404)
        .json({ status: false, message: "Orang hilang tidak ditemukan" });
    }

    if (req_status === "accepted") {
      let updatedDisaster = await disasterService.updatePeopleGone(
        missingPeople.bencana_id,
        missingPeople.missing_people_id,
        {
          name: missingPeople.name,
          gender: missingPeople.gender,
          status: missingPeople.status,
          weight: missingPeople.weight,
          height: missingPeople.height,
          age: missingPeople.age,
          address: missingPeople.address,
          last_seen: missingPeople.last_seen,
        }
      );

      if (!updatedDisaster) {
        return res
          .status(404)
          .json({ status: false, message: "Bencana tidak ditemukan" });
      }

      // Update the request status
      await missingPeopleService.updateMissingPeople(req_missing_people_id, {
        req_status,
      });

      return res.status(200).json({
        status: true,
        message: "Berhasil diupdate",
        data: updatedDisaster,
      });
    } else if (req_status === "rejected") {
      // Update the request status
      await missingPeopleService.updateMissingPeople(req_missing_people_id, {
        req_status,
      });

      return res
        .status(200)
        .json({ status: true, message: "Berhasil ditolak" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid request status" });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function getMissingPeopleByIdDetail(req, res) {
  try {
    logger.info("Get missing people::", req.params);

    const { id } = req.params;
    const missingPeople = await missingPeopleService.getMissingPeopleById(id);

    if (!missingPeople) {
      return res.status(404).json({ message: "Missing people not found" });
    }

    // Check if disaster and missing people exist
    const disaster = await disasterService.getDisasterById(
      missingPeople.bencana_id
    );

    if (!disaster) {
      return res
        .status(404)
        .json({ status: false, message: "Bencana tidak ditemukan" });
    }

    // Find missingPeople based on missing_people_id
    const missingPeopleFromDisaster = disaster.people_gone.find(
      (person) =>
        person._id.toString() === missingPeople.missing_people_id.toString()
    );

    if (!missingPeopleFromDisaster) {
      return res
        .status(404)
        .json({ status: false, message: "Orang hilang tidak ditemukan" });
    }

    const {
      req_by,
      bencana_id,
      bencana_name,
      missing_people_id,
      req_status,
      ...afterData
    } = missingPeople;

    const data = {
      _id: missingPeople._id,
      title: missingPeople.bencana_name,
      req_by: missingPeople.req_by,
      date: missingPeople.timestamp,
      before: missingPeopleFromDisaster,
      after: afterData,
    };

    res.status(200).json({ status: true, data: data });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = {
  getMissingPeopleById,
  getMissingPeople,
  deleteMissingPeople,
  addMissingPeopleFromDisaster,
  updatePeopleGoneInDisaster,
  getMissingPeopleByIdDetail,
};
