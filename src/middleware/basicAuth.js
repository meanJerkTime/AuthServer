'use strict';

const base64 = require('base-64');

const userModel = require('../model/userModel');

module.exports = async (req, res, next)=>{

  let error = { 'message_spec': 'Invalid User ID/Password', 'statusCode': 401, 'statusMessage': 'Unauthorized' };

  if (! req.headers.authorization) {
    next(error);
    return;
  }

  try{

    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1];
    let credentials = base64.decode(encoded);
    let [username, password] = credentials.split(':');

    let validUser = await userModel.basicValidation(username, password);

    if (validUser) {
      req.token = await validUser.tokenGenerator();
      req.user = validUser;
      next();
    } else {
      next(error);
      return;
    }
  }
  catch (err) {
    next(err);
  }
};
