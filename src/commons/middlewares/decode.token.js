const { getToken } = require('../utils/get.token');
const config = require('../../commons/helpers/env');
const User = require('../../database/user');
const jwt = require('jsonwebtoken');

function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = getToken(req); //ok
      if (!token) return next(); //ok
      req.user = jwt.verify(token, config.secretKey); //ok
      let user = await User.findOne({ token: { $in: [token] } }); //ok

      //-- Token Expired jika Use Tidak ditemukan  --//
      if (!user) {
        return res.json({
          error: 1,
          message: `Token expired`,
        });
      }
    } catch (err) {
      // (1) tangani error yang terkait JsonWebTokenError
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }
      // (2) tangani error lainnya
      next(err);
    }
    return next(); // <--
  };
}

module.exports = {
  decodeToken,
};
