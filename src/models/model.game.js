const { Game } = require('../database/schema');
const { ObjectId } = require('mongoose').Types;

exports.getAllgame = async () => {
  try {
    const result = await Game.find();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getDetailGame = async (id) => {
  try {
    const result = await Game.findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createGame = async (payload) => {
  try {
    const result = new Game(payload);
    return await result.save();
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteGame = async (id) => {
  try {
    const result = await Game.findOneAndDelete({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.editGame = async (id, payload) => {
  try {
    const result = await Game.findByIdAndUpdate({ _id: ObjectId(id) }, payload);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
