const { User } = require('../models');

const userData = [
  {
    username: 'richardjhong',
    password: 'password12345'
  },
  {
    username: 'UniqueNewYork',
    password: 'password22345'
  },
  {
    username: 'PhilPalindrome',
    password: 'password33345'
  },
];

const seedUsers = async () => await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
