const crypto = require('crypto');

const generateReferralCode = () => {
  return crypto.randomBytes(4).toString('hex');
};

module.exports = generateReferralCode;
