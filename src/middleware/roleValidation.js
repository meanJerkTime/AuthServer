'use strict';

module.exports = (req, res, next)=>{
  const roleErr = {message_spec: 'User role can NOT be modified', statusCode:401, statusMessage:'Authorization error'};
  if (req.body.role && req.body.role != 'user'){
    next(roleErr);
    return;
  }
  next();
};
