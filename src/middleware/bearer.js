'use strict';
require('dotenv').config();

const userModel = require('../model/userModel.js');

module.exports = async (req, res, next) => {

  const invalidErr = {message_spec: 'You are not authorized. Please login again.', statusCode: 401, statusMessage:'Unauthorized'};

  if (!req.headers.authorization) {
    next(invalidErr);
    return;
  }

  const token = req.headers.authorization.split(' ').pop();

  let validUser;
  try{
    validUser = await userModel.authenticateToken(token);
  }
  catch (err){
    next(invalidErr);
    return;
  }

  if (validUser) {
    const userInfo = {
      username: validUser.username,
      _id: validUser._id,
      role: validUser.role
    }
    req.user = userInfo;
    req.token = token;

    next();
  } else {
    next(invalidErr);
  }
};
