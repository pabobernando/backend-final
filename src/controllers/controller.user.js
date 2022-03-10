const userModel = require('../models/model.user');
const response = require('../commons/helpers/error_handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../commons/helpers/env');
const { getToken } = require('../commons/utils/get.token');

exports.showAllUser = async (req, res, next) => {
  try {
    const result = await userModel.getAllUser();
    return response.okRead(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.showDetailUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userModel.getDetailUser(id);
    return response.okRead(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const find = await userModel.findByEmail(req.body.email);
    if (find.length > 0) {
      return response.conflictExist(res, []);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      const result = await userModel.createUser(req.body);
      return response.okCreate(res, result);
    }
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.destroyUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userModel.deleteUser(id);
    return response.okDeleted(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.updateUSer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userModel.editUser(id, req.body);
    return response.okPatch(res, result);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

exports.localStrategy = async (email, password, done) => {
  try {
    // 1 cari user ke mongodb
    //let result = await User.findOne({ email }).select('-__v -createdAt -updatedAt -token'); // --> pindahkan ke model
    let result = await userModel.localStrategy(email);
    // 2 jika user tidak ditemukan, akhiri proses login
    if (!result) return done();
    // 3 sampai sini artinya user ditemukan, cek password sesuai atau tidak
    if (bcrypt.compareSync(password, result.password)) {
      ({ password, ...userWithoutPassword } = result.toJSON());
      // akhiri pengecekan, user berhasil login
      // berikan data user tanpa password
      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null); // <--- penangan error
  }
  done();
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    // jika terjadi error dari hasil localStrategy kita akan serahkan ke Express
    if (err) return next(err);

    //cek apakah hasil dari localStrategy membuahkan user atau tidak
    if (!user) return res.json({ error: 1, message: 'email or password incorrect' });

    //(1) Buat JWT
    let signed = jwt.sign(user, config.secretKey); // <-- ganti secret key dengan yang sulit ditebak

    //(2) Simpan token tersebut ke user terkait
    // await User.findOneAndUpdate({ _id: user._id }, { $push: { token: signed } }, { new: true }); //-> pindahkan ke model
    await userModel.login(user._id, signed);

    //(3) respon ke _client_
    return res.json({
      message: 'logged in successfully',
      user: user,
      token: signed,
    });
  })(req, res, next);
};

exports.me = (req, res, next) => {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Your're not login or token expired`,
    });
  }
  return res.json(req.user);
};

exports.logout = async (req, res, next) => {
  //(1) dapatkan token dari request
  let token = getToken(req);

  //(2) Hapus `token` dari `user`
  //let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token } }, { useFindAndModify: false });
  let user = await userModel.logout(token);

  // cek user atau token
  if (!user || !token) {
    return res.json({
      error: 1,
      message: `No User Found`,
    });
  }
  //Logout Berhasil
  return res.json({
    error: 0,
    message: `Logout Berhasil`,
  });
};
