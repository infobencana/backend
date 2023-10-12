const MissingPeople = require("../model/reqmissingpeople.model");
const logger = require("../logger/api.logger");

async function createMissingPeople(data) {
  try {
    return await MissingPeople.create(data);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function findMissingPeopleById(id) {
  try {
    return await MissingPeople.findById(id);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function findMissingPeople() {
  try {
    return await MissingPeople.find();
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function deleteMissingPeopleById(id) {
  try {
    return await MissingPeople.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function updateMissingPeople(id, updateFields) {
  try {
    return await MissingPeople.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

// Export the repository functions
module.exports = {
  createMissingPeople,
  findMissingPeople,
  findMissingPeopleById,
  deleteMissingPeopleById,
  updateMissingPeople,
};
