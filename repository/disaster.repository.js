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
  try {
    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
      throw new Error("Disaster not found");
    }

    if (updateFields.detail && disaster.detail) {
      updateFields.detail = {
        ...disaster.detail,
        ...updateFields.detail
      };
    }

    const data = await Disaster.findByIdAndUpdate(disasterId, updateFields, {
      new: true,
    });
    return data;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
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

  disaster.discuss.push(disscussData);
  await disaster.save();
  return disaster;
}

async function getDiscussionById(disasterId) {
  try {
    const result = await Disaster.aggregate([{
        $match: {
          _id: new mongoose.Types.ObjectId(disasterId)
        }
      },
      {
        $unwind: '$discuss'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'discuss.userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$discuss._id',
          user_id: '$discuss.userId',
          username: '$user.full_name',
          photo: '$user.photo_profile',
          role: '$user.role',
          comment: '$discuss.comment',
          timestamp: '$discuss.timestamp'
        }
      }
    ]).exec();
    return result;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
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
        },
        totalVictims: {
          $sum: '$victim'
        },
        totalPeopleGone: {
          $sum: {
            $size: '$people_gone'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        count: 1,
        totalVictims: 1,
        totalPeopleGone: 1
      }
    }
  ]);
  return result;
}

async function getLatLongById(disasterId) {
  try {
    const latlong = await Disaster.aggregate([{
        $match: {
          _id: new mongoose.Types.ObjectId(disasterId)
        }
      },
      {
        $addFields: {
          type: '$detail.type',
          date: '$detail.date'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          type: 1,
          date: 1,
          latitude: 1,
          longitude: 1
        }
      }
    ]);
    return latlong;

  } catch (error) {
    logger.error(error.message);
    throw error;
  }
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
  addDiscussion,
  getDiscussionById,
  weeklyReport,
  getLatLongById
};