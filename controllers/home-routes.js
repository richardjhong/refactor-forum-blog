const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'email'],
        },
      ],
    });

    const posts = dbPostData.map((project) =>
      project.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userName: req.session.userName
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a specific post
// Use the custom middleware before allowing the user to access the post
router.get('/post/:id', withAuth, async (req, res) => {
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
    req.session.save(() => {
      req.session.post_id = parseInt(req.params.id)
    })
    res.render('post', { post, loggedIn: req.session.loggedIn, user_id: req.session.user_id,  noComments: noComments, post_id: req.session.post_id, userName: req.session.userName });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a user's specific dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: {
        model: User,
        where: {
          id: req.session.user_id
        }
      }
    })

    const userPosts = userPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {userPosts, loggedIn: req.session.loggedIn, userName: req.session.userName, user_id: req.session.user_id})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
