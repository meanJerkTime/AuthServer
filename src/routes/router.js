'use strict';

const express = require('express');
const router = express.Router();



//routes definitions
const {signup, signin, getAll, getOne, updateOne: updatePassword, deleteOne} = require('./userRoutesHandler.js');
const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearer.js');
const adminValidation = require('../middleware/adminValidation.js');
const userValidation = require('../middleware/userValidation.js');
const roleValidation = require('../middleware/roleValidation.js');

router.post('/signup', roleValidation, signup);// regular user sign up, can not have role key other than 'user'. can be blank;

router.post('/adminsignup', bearerAuth, adminValidation, signup); // admin signup, admin can be only added by another admin.

router.post('/signin', basicAuth, signin);

router.get('/allusers', bearerAuth, adminValidation, getAll);

router.get('/user/:id', bearerAuth, userValidation, getOne);

router.patch('/user/:id/password', bearerAuth, userValidation, updatePassword);

router.delete('/user/:id', bearerAuth, userValidation, deleteOne);

router.post('/gamesignin', bearerAuth, signin )

module.exports = router;
