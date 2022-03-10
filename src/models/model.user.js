const { User } = require('../database/schema');
const { ObjectId } = require('mongoose').Types;

exports.getAllUser = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getDetailUser = async (id) => {
  try {
    //ini bukan id saja harus ditambah _id: ObjectId(id)
    //const result = await User.findOne(id);

    const result = await User.findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createUser = async (payload) => {
  try {
    const result = new User(payload);
    return await result.save();
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUser = async (id) => {
  try {
    //ini bukan id saja harus ditambah _id: ObjectId(id)
    //const result = await User.findOneAndDelete(id);
    const result = await User.findOneAndDelete({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.editUser = async (id, payload) => {
  try {
    const result = await User.findByIdAndUpdate({ _id: ObjectId(id) }, payload);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

//verifikasi email terdaftar atau belum
exports.findByEmail = async (email) => {
  try {
    const result = await User.find({ email: email });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
exports.localStrategy = async (email) => {
  try {
    const result = await User.findOne({ email }).select('-__v -createdAt -updatedAt -token');
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.login = async (user, signed) => {
  try {
    const result = await User.findOneAndUpdate({ _id: user }, { $push: { token: signed } }, { new: true });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.logout = async (token) => {
  try {
    const result = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token } }, { useFindAndModify: false });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
