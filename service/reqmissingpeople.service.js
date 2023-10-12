const missingPeopleRepository = require("../repository/reqmissingpeople.repository");

async function createMissingPeople(data) {
  return await missingPeopleRepository.createMissingPeople(data);
}

async function getMissingPeopleById(id) {
  return await missingPeopleRepository.findMissingPeopleById(id);
}

async function getMissingPeople() {
  return await missingPeopleRepository.findMissingPeople();
}

async function deleteMissingPeopleById(id) {
  return await missingPeopleRepository.deleteMissingPeopleById(id);
}

module.exports = {
  createMissingPeople,
  getMissingPeople,
  getMissingPeopleById,
  deleteMissingPeopleById,
};
