const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateReferralCode = require('../utils/generateReferralCode')

exports.registerUser = async (req, res) => {
  const { email, password, referralCode } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    let referredByUser = null;
    if (referralCode) {
      referredByUser = await User.findOne({ referralCode });
        referredByUser.referralCount++;
        await referredByUser.save();
    }
    console.log(referredByUser,"referredbyUSERrrrrr")



    const hashedPassword = await bcrypt.hash(password, 10);
    const newReferralCode = generateReferralCode();
    const referralLink = `${req.protocol}://${req.get('host')}/register?referralCode=${newReferralCode}`;

    user = new User({
      email,
      password: hashedPassword,
      referralCode: newReferralCode,
      referralLink,
      referredBy: referralCode || null,
    });
    console.log("register user", user)
    await user.save();

    res.status(201).json({ message: 'Registration successful', referralCode: newReferralCode, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  console.log(user,"login user")
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      res.json({
        message: 'Login successful',
        user: {
          email: user.email,
          referralCode: user.referralCode,
          referralLink: user.referralLink,
          referralCount: user.referralCount,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.getReferralStatus = async (req, res) => {
    const { email } = req.params;
    console.log(email,"email")
  
    try {
      const user = await User.findOne({ email });
  console.log("user,",user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        referralCode: user.referralCode,
        referralLink: user.referralLink,
        referralCount: user.referralCount,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
