var express = require('express');
var router = express.Router();

const User = require('../models/user');
const passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/profile', function(req, res,) {
  if (req.user===undefined) {
    res.render('login', {title: 'FoodSearch - Login'})
  } else {
    User.findById(req.user._id, function(error, user) {
      if (error) {
        res.render('index', {title: 'FoodSearch', errors: error})
      } else {
        var userObj = user;
        res.render('profile', {title: req.user.username + "'s profile", authorized: req.user, user_obj: userObj})
      }
    });
  }
  
});


router.get('/register', (req, res) => {
  if (req.user===undefined) {
    res.render('register', {title: 'Register', authorized: req.user})
  } else {
    res.redirect('/', {title: 'FoodSearch'})
  }
  
});


router.post('/register', (req, res, next) => {
  User.register(new User({
      username: req.body.username
    }),
    req.body.password, (err, user) => {
      if (err) {
        res.render('register', { title: 'FoodSearch - Register', register: req.body, error: err });
      } else {
        passport.authenticate('local')(req, res, () => {
          User.findOne({
            username: req.body.username
          }, (err, person) => {
            if(err){
              res.render('register', { title: 'FoodSearch - Register', register: req.body, error: err });
            } else {
              res.statusCode = 200;
              res.redirect('/users/profile');
            }
            
            
          });
        })
      }
    })
});



router.get('/login', (req, res) => {
  if (req.user===undefined) {
    res.render('login', {title: 'Login',authorized: req.user})
  } else {
    res.redirect('/', {title: 'FoodSearch'})
  } 
})



router.post('/login',[], passport.authenticate('local',{ failureRedirect: '/users/login'}),
 (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, person) => {
    if (res.statusCode === 401){
      res.render("login", { title: 'FoodSearch', errors: errors.array()})
    }else{
      res.statusCode = 200;
      res.redirect('/users/profile')
      
    }
  })
});

router.get('/logout', (req, res, next) => {
  if (req.sessionID) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.redirect('/')
      }
    });
  } 
  else {
    res.redirect('/users/login')
  }
});


router.post('/save',(req, res, next) => {
  var recipe = { title: req.body.title, url: req.body.url, img: req.body.img}
  User.findByIdAndUpdate(
     {_id: req.user._id},
     { $push: { recipes: recipe }}, 
     function (error) {
       if (error) {
         res.status(204).send();
       } else {
         res.status(204).send();
       }
     }
  )
  
});

router.post('/delete', (req, res, next) => {
  var recipe = { title: req.body.title, url: req.body.url, img: req.body.img}
  User.findByIdAndUpdate(
    {_id: req.user._id},
    { $pull: { recipes: recipe}},
    function (error) {
      if (error) {
        res.status(204).send();
      } else {
        res.redirect('/users/profile')
      }
    }
  )
});



module.exports = router;
