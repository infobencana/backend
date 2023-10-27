const disasterRepository = require("../repository/disaster.repository");

async function publishDisaster(disasterData) {
  const {
    name,
    detail,
    place,
    victim,
    latitude,
    longitude,
    donations,
    picture,
    people_gone,
    discuss,
    user_detail,
    timestamp,
  } = disasterData;

  const disaster = await disasterRepository.addDisaster({
    name,
    detail,
    place,
    victim,
    latitude,
    longitude,
    donations,
    picture,
    people_gone,
    discuss,
    user_detail,
    timestamp,
  });

  return disaster;
}

async function getListDisaster(filter) {
  return await disasterRepository.getListDisaster(filter);
}

async function addPeopleGone(disasterId, peopleData) {
  return await disasterRepository.addPeopleGone(disasterId, peopleData);
}

async function updatePeopleGone(disasterId, personId, updateFields) {
  return await disasterRepository.updatePeopleGone(
    disasterId,
    personId,
    updateFields
  );
}

async function getDisasterById(disasterId) {
  return await disasterRepository.getDisasterById(disasterId);
}

async function deleteDisasterById(disasterId) {
  return await disasterRepository.deleteDisasterById(disasterId);
}

async function updateDisasterById(disasterId, updateFields) {
  const {
    discuss,
    ...validUpdateFields
  } = updateFields;
  return await disasterRepository.updateDisasterById(
    disasterId,
    validUpdateFields
  );
}

async function deletePeopleGone(disasterId, personId) {
  return await disasterRepository.deletePeopleGone(disasterId, personId);
}

async function addDiscussion(disasterId, disscussData) {
  return await disasterRepository.addDiscussion(disasterId, disscussData);
}

async function getDiscussionById(disasterId) {
  return await disasterRepository.getDiscussionById(disasterId);
}

async function weeklyReport() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return await disasterRepository.weeklyReport(oneWeekAgo);
}

async function getLatLong() {
  return await disasterRepository.getLatLong();
}

module.exports = {
  publishDisaster,
  getListDisaster,
  addPeopleGone,
  updatePeopleGone,
  getDisasterById,
  deleteDisasterById,
  updateDisasterById,
  deletePeopleGone,
  addDiscussion,
  getDiscussionById,
  weeklyReport,
  getLatLong
};