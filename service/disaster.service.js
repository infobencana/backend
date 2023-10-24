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
    timestamp,
  });

  return disaster;
}

async function getListDisaster(queryParams) {
  let query = {};

  if (queryParams.name) {
    query.name = { $regex: new RegExp(queryParams.name, "i") };
  }
  if (queryParams.place) {
    query.place = { $regex: new RegExp(queryParams.place, "i") };
  }
  if (queryParams.type) {
    query["detail.type"] = { $regex: new RegExp(queryParams.type, "i") };
  }
  if (queryParams.date) {
    query["detail.date"] = queryParams.date;
  }

  return await disasterRepository.getListDisaster(query);
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
  const { discuss, ...validUpdateFields } = updateFields;
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

async function weeklyReport(oneWeekAgo){
  return await disasterRepository.weeklyReport(oneWeekAgo);
}

async function getLatLongById(disasterId) {
  return await disasterRepository.getLatLongById(disasterId);
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
  getLatLongById
};
