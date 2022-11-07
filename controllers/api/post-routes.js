const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific post
// Use the custom middleware before allowing the user to access the post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          order: ['date_created', 'DESC'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });

    const post = dbPostData.get({ plain: true });
    const noComments = post.comments.length === 0

    res.render('post', { post, loggedIn: req.session.loggedIn, user_id: req.session.user_id,  noComments: noComments, post_id: req.params.id, userName: req.session.userName });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
