const mongoose = require("mongoose");
const Disaster = require("../model/disaster.model");
const logger = require("../logger/api.logger");

async function addDisaster(disaster) {
  let data = {};
  try {
    data = await Disaster.create(disaster);
  } catch (error) {
    logger.error(error.message);
  }
  return data;
}

async function getListDisaster(query) {
  let data = {};
  try {
    data = await Disaster.find(query);
  } catch (error) {
    logger.error(error.message);
  }
  return data;
}

async function addPeopleGone(disasterId, peopleData) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  disaster.people_gone.push(peopleData);
  await disaster.save();
  return disaster;
}

// Here
async function updatePeopleGone(disasterId, personId, updateFields) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  const person = disaster.people_gone.id(personId);
  if (!person) {
    throw new Error("Person not found");
  }

  Object.assign(person, updateFields);
  await disaster.save();
  return disaster;
}

async function getDisasterById(disasterId) {
  try {
    // Construct the filter object to find by ID
    const filter = {
      _id: new mongoose.Types.ObjectId(disasterId)
    };

    // Use the filter object in the find() method
    const disaster = await Disaster.findOne(filter);

    return disaster;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function deleteDisasterById(disasterId) {
  try {
    return await Disaster.findByIdAndDelete(disasterId);
  } catch (error) {
    throw error;
  }
}

async function updateDisasterById(disasterId, updateFields) {
  let data = {};
  try {
    data = await Disaster.findByIdAndUpdate(disasterId, updateFields, {
      new: true
    });
  } catch (error) {
    logger.error(error.message);
  }
  return data;
}

async function deletePeopleGone(disasterId, personId) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  const person = disaster.people_gone.id(personId);
  if (!person) {
    throw new Error("Person not found");
  }

  // Instead of person.remove(), use the following to remove the person:
  disaster.people_gone.pull({
    _id: personId
  });

  await disaster.save();
  return disaster;
}

async function addDiscussion(disasterId, disscussData) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  disaster.people_gone.push(disscussData);
  await disaster.save();
  return disaster;
}

async function weeklyReport(oneWeekAgo) {
  const result = await Disaster.aggregate([{
      $match: {
        timestamp: {
          $gte: oneWeekAgo
        }
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1
        }, // Count the documents
        totalVictims: {
          $sum: '$victim'
        }, // Sum the 'victim' field
        totalPeopleGone: {
          $sum: {
            $size: '$people_gone'
          }
        } // Sum the size of 'people_gone' array
      }
    }
  ]);
  return result;
}

module.exports = {
  addDisaster,
  getListDisaster,
  addPeopleGone,
  updatePeopleGone,
  getDisasterById,
  deleteDisasterById,
  updateDisasterById,
  deletePeopleGone,
  weeklyReport,
};