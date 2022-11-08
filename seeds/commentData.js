const { Comment } = require('../models');

const commentdata = [
  {
    content: `You're using the wrong syntax; put => instead for arrow functions`,
    date_created: 'June 21, 2021 07:00:00',
    user_id: 2,
    post_id: 1
  },
  {
    content: 'I made that mistake the first time too. The comment above is on point.',
    date_created: 'June 21, 2021 17:00:00',
    user_id: 3,
    post_id: 1
  },
  {
    content: `Uh, it's context specific.`,
    date_created: 'July 15, 2021 17:00:00',
    user_id: 3,
    post_id: 2
  },
  {
    content: `Did you install dotenv npm package? If so, then you'd do something like APP_DB="<DATABASE_NAME>".`,
    date_created: 'March 19, 2022 19:00:00',
    user_id: 2,
    post_id: 3
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
