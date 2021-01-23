'use strict';

const userModel = require('../model/userModel.js');

async function signup (req, res, next){
  let missingKeyError = { 'message_spec': 'username, password are all required when registering a new user, please try again', 'statusCode': 403, 'statusMessage': 'Missing Key info' };

  let requiredKeys = ['username', 'password'];
  let userInput = Object.keys(req.body);
  if (!requiredKeys.every(key=>userInput.includes(key))) {
    next(missingKeyError);
    return;
  }

  let uniqueError = { 'message_spec': 'Username taken, please choose another one', 'statusCode': 403, 'statusMessage': 'Unique Fail' };
  try {
    let user = new userModel(req.body);
    let valid = await userModel.findOne({username: user.username});
    if(!valid){
      try{
        let savedUser = await user.save();
        let token = savedUser.tokenGenerator();
        res.status(200).send({token:token});
      } catch (error) {
        next(error);
      }
    } else {
      next(uniqueError);
    }
  }
  catch (err){
    next(err);
  }
}

async function signin (req, res, next){
  res.cookie('auth', req.token);
  const user = {
    _id: req.user._id,
    username: req.user.username,
    profileImgUrl: req.user.profileImgUrl,
  }
  res.send({token: req.token, user});
}


function handlerGenerator (method){
  return async (req, res, next)=>{
    const id = req.params.id ? {_id:req.params.id } : {};

    try{
      let result;
      switch(method){
      case 'find':
        result = await userModel.find(id);
        break;
      case 'updatePassword':
        result = await userModel.findOneAndUpdate({username:req.body.username}, {password:req.body.password}, {new:true});
        break;
      case 'delete':
        result = await userModel.findByIdAndDelete(id);
      }
      res.json(result);
    }
    catch (err){
      next(err);
    }
  };
}

const getAll = handlerGenerator('find');
const getOne = handlerGenerator('find');
const updatePassword = handlerGenerator('updatePassword');
const deleteOne = handlerGenerator('delete');


module.exports = {signup, signin, getAll, getOne, updateOne: updatePassword, deleteOne};
