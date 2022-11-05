const { Post } = require('../models');

const postdata = [
  {
    title: 'JavaScript Arrow Function',
    content: `Can someone review why my arrow function isn't working? I'm using -> like a pointer in c++ but it isn't working. `,
    date_created: 'June 21, 2021 17:00:00',
    user_id: 1
  },
  {
    title: 'Handlebar: How many curly braces??????',
    content: `Can someone provide a tl:dr for how many curly braces I need to use?`,
    date_created: 'July 15, 2021 17:00:00',
    user_id: 2
  },
  {
    title: 'How do I use an .env file?',
    content: `Like title says: I don't get how to plug in variable names`,
    date_created: 'March 19, 2022 19:00:00',
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
