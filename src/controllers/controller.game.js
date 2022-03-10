const gameModel = require('../models/model.game');
const response = require('../commons/helpers/error_handler');

exports.showAllGame = async (req, res, next) => {
  try {
    const result = await gameModel.getAllgame();
    return response.okRead(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.showDetailGame = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await gameModel.getDetailGame(id);
    return response.okRead(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.addGame = async (req, res, next) => {
  try {
    const result = await gameModel.createGame(req.body);
    return response.okCreate(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.destroyGame = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await gameModel.deleteGame(id);
    return response.okDeleted(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.updateGame = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await gameModel.editGame(id, req.body);
    return response.okPatch(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
