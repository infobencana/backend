const missingPeopleService = require("../service/reqmissingpeople.service");
const disasterService = require("../service/disaster.service");
const logger = require("../logger/api.logger");

async function createMissingPeople(req, res) {
  try {
    logger.info("Create missing people::", req.body);
    const data = req.body;
    const missingPeople = await missingPeopleService.createMissingPeople(data);
    res.status(201).json({
      message: "Missing people added",
      status: true,
      data: missingPeople,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getMissingPeopleById(req, res) {
  try {
    logger.info("Get missing people::", req.params);
    const { id } = req.params;
    const missingPeople = await missingPeopleService.getMissingPeopleById(id);

    if (!missingPeople) {
      return res.status(404).json({ message: "Missing people not found" });
    }
    res.status(200).json({ message: "OK", status: true, data: missingPeople });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getMissingPeople(req, res) {
  try {
    logger.info("Get missing people::", req.params);
    const missingPeople = await missingPeopleService.getMissingPeople();
    res.status(200).json({ message: "OK", status: true, data: missingPeople });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function deleteMissingPeople(req, res) {
  try {
    logger.info("Delete missing people::", req.params);
    const { id } = req.params;
    const existingMissingPerson =
      await missingPeopleService.getMissingPeopleById(id);

    if (!existingMissingPerson) {
      return res
        .status(404)
        .json({ message: "Missing person not found", status: false });
    }
    await missingPeopleService.deleteMissingPeopleById(id);
    res.status(200).json({ message: "Missing people deleted", status: true });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
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
      return res.status(404).json({ message: "Disaster not found" });
    }

    // Find missingPeople based on missing_people_id
    const missingPeople = disaster.people_gone.find(
      (person) => person._id.toString() === missing_people_id,
    );

    if (!missingPeople) {
      return res.status(404).json({ message: "Missing people not found" });
    }

    // Create an object to hold the missing people data
    const missingPeopleData = {
      name: name || missingPeople.name,
      bencana_id: disaster._id,
      missing_people_id: missingPeople._id,
      gender: gender || missingPeople.gender,
      status: status || missingPeople.status,
      weight: weight || missingPeople.weight,
      height: height || missingPeople.height,
      age: age || missingPeople.age,
      address: address || missingPeople.address,
      last_seen: last_seen || missingPeople.last_seen,
    };

    const newMissingPeople =
      await missingPeopleService.createMissingPeople(missingPeopleData);

    res.status(201).json({
      message: "Req missing people added",
      status: true,
      data: newMissingPeople,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function updatePeopleGoneInDisaster(req, res) {
  try {
    logger.info("Update people_gone in Disaster::", req.body);
    const { reqMissingPeopleId } = req.body;

    console.log(reqMissingPeopleId);

    // Check if the missing people exist
    const missingPeople =
      await missingPeopleService.getMissingPeopleById(reqMissingPeopleId);

    if (!missingPeople) {
      return res.status(404).json({ message: "Missing people not found" });
    }

    // Update the people_gone field in the disaster document
    const updatedDisaster = await disasterService.updatePeopleGone(
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
      },
    );

    res
      .status(200)
      .json({ message: "OK", status: true, data: updatedDisaster });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createMissingPeople,
  getMissingPeopleById,
  getMissingPeople,
  deleteMissingPeople,
  addMissingPeopleFromDisaster,
  updatePeopleGoneInDisaster,
};
