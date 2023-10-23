const MissingPeople = require("../model/reqmissingpeople.model");
const logger = require("../logger/api.logger");
const { default: mongoose } = require("mongoose");

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
    const result = await MissingPeople.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "req_by",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          address: 1,
          gender: 1,
          last_seen: 1,
          req_status: 1,
          weight: 1,
          req_by: {
            $arrayElemAt: ["$user.full_name", 0],
          },
          bencana_id: 1,
          name: 1,
          bencana_name: 1,
          missing_people_id: 1,
          age: 1,
          status: 1,
          height: 1,
          timestamp: 1,
        },
      },
    ]);
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function findMissingPeople() {
  try {
    const result = await MissingPeople.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "req_by",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          address: 1,
          gender: 1,
          last_seen: 1,
          req_status: 1,
          weight: 1,
          req_by: {
            $arrayElemAt: ["$user.full_name", 0],
          },
          bencana_id: 1,
          name: 1,
          bencana_name: 1,
          missing_people_id: 1,
          age: 1,
          status: 1,
          height: 1,
          timestamp: 1,
        },
      },
    ]);
    return result;
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

module.exports = {
  createMissingPeople,
  findMissingPeople,
  findMissingPeopleById,
  deleteMissingPeopleById,
  updateMissingPeople,
};
