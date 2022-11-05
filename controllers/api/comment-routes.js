const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {

  console.log('please work: ', req.body)
  try {

    console.log('comment sejrjekrejlkrjk;j;lkerl;jker', req.body)
    const commentData = await Comment.create(req.body);

    req.session.save(() => {
      res.status(200).json(commentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;