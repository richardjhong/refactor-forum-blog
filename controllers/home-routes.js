const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all projects for homepage
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

// GET one project
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', async (req, res) => {
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
    const noComments = post.comments.length !== 0
    // console.log('noComments boolean: ', noComments)
    req.session.save(() => {
      req.session.noComments = noComments;
    })
    res.render('post', { post, loggedIn: req.session.loggedIn, userName: req.session.userName,  noComments: req.session.noComments});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
// Use the custom middleware before allowing the user to access the painting
// router.get('/project/:id', withAuth, async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });

//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
