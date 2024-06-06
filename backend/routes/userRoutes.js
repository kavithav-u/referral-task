const express = require('express');
const { registerUser,loginUser, getReferralStatus } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/referral-status/:email', getReferralStatus); 

module.exports = router;
