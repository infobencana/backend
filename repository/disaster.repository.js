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
    data = await Disaster.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_detail",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          detail: 1,
          place: 1,
          victim: 1,
          latitude: 1,
          longitude: 1,
          donations: 1,
          picture: 1,
          people_gone: 1,
          user_detail: {
            name: {
              $ifNull: [{ $arrayElemAt: ["$user.full_name", 0] }, ""],
            },
            picture: {
              $ifNull: [{ $arrayElemAt: ["$user.photo_profile", 0] }, ""],
            },
          },
          timestamp: 1,
        },
      },
    ]);
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
    const disaster = await Disaster.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(disasterId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_detail",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          detail: 1,
          place: 1,
          victim: 1,
          latitude: 1,
          longitude: 1,
          donations: 1,
          picture: 1,
          people_gone: 1,
          user_detail: {
            name: {
              $ifNull: [{ $arrayElemAt: ["$user.full_name", 0] }, ""],
            },
            picture: {
              $ifNull: [{ $arrayElemAt: ["$user.photo_profile", 0] }, ""],
            },
          },
          timestamp: 1,
        },
      },
    ]);

    return disaster[0];
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
        ...updateFields.detail,
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
    _id: personId,
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
  return disaster.discuss;
}

async function getDiscussionById(disasterId) {
  try {
    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
      throw new Error("Disaster not found");
    }

    return disaster.discuss;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function weeklyReport(oneWeekAgo) {
  const result = await Disaster.aggregate([
    {
      $match: {
        timestamp: {
          $gte: oneWeekAgo,
        },
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
        totalVictims: {
          $sum: "$victim",
        },
        totalPeopleGone: {
          $sum: {
            $size: "$people_gone",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        totalVictims: 1,
        totalPeopleGone: 1,
      },
    },
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
  addDiscussion,
  getDiscussionById,
  weeklyReport,
};
