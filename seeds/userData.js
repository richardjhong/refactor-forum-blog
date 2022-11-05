const { User } = require('../models');

const userData = [
  {
    username: 'richardjhong',
    password: 'password12345',
    email: 'rhong24@gmail.com'
  },
  {
    username: 'UniqueNewYork',
    password: 'password22345',
    email: 'uniquenewyork@email.com'
  },
  {
    username: 'PhilPalindrome',
    password: 'password33345',
    email: 'philpalindrome@email.com'
  },
];

const seedUsers = async () => await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
