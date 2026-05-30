const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/user.controller');

router.post('/', registerUser);
router.post('/login', authUser);

module.exports = router;